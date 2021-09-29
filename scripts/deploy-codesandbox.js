const { execSync } = require('child_process')
const process = require('process')
const fs = require('fs')
const path = require('path')

const fse = require('fs-extra')
const replaceInFiles = require('replace-in-files')

const tmpDir = path.resolve('.tmp')
const packagesDir = 'packages'
const demoHtmlDir = 'demo-html'
const demoNextDir = 'demo-nextjs'
const originDemoHtmlDir = path.resolve(packagesDir, demoHtmlDir)
const destDemoHtmlDir = path.resolve(tmpDir, demoHtmlDir)
const destDemoHtmlPublicDir = path.join(destDemoHtmlDir, 'public')
const originDemoNextDir = path.resolve(packagesDir, demoNextDir)
const destDemoNextDir = path.resolve(tmpDir, demoNextDir)

const exec = (cmd) => execSync(cmd, { stdio: 'inherit' })

const removeUnusedFiles = (dir) => {
  const files = ['package.json', 'node_modules', 'README.md', 'CHANGELOG.md', 'yarn.lock', '.next', 'public/lib']
  files.forEach((file) => fse.removeSync(path.join(dir, file)))
}

const buildDemoHtml = async (dir) => {
  fs.readdirSync(dir)
    .filter((file) => fs.statSync(path.join(dir, file)).isDirectory())
    .forEach((dirName) => {
      const innerDir = path.join(dir, dirName)
      fse.copySync(innerDir, dir)
      fse.removeSync(innerDir)
    })

  const newDir = path.resolve(dir, '..')
  fse.copySync(dir, newDir)
  fse.removeSync(dir)

  const filesGlob = './**/*.html'

  await replaceInFiles({
    files: filesGlob,
    from: /\.+\/lib\/embed-next\.js/,
    to: '//embed.typeform.com/next/embed.js',
  })

  await replaceInFiles({
    files: filesGlob,
    from: /\.+\/lib\/css\//,
    to: '//embed.typeform.com/next/css/',
  })

  fs.readdirSync(newDir).forEach((fileName) => {
    const dirName = path.parse(fileName).name
    const finalDir = path.join(newDir, dirName)
    const oldDir = path.join(newDir, fileName)
    const fileFinalDir = path.join(newDir, dirName, fileName)

    fse.ensureDirSync(finalDir)
    fse.moveSync(oldDir, fileFinalDir)
    fs.renameSync(fileFinalDir, path.join(finalDir, 'index.html'))

    const json = {
      name: dirName,
      version: '1.0.0',
      main: 'index.html',
      scripts: {
        start: 'parcel index.html --open',
        build: 'parcel build index.html',
      },
      dependencies: { 'parcel-bundler': '^1.6.1' },
      devDependencies: {
        '@babel/core': '7.2.0',
      },
      resolutions: {
        '@babel/preset-env': '7.13.8',
      },
    }

    fse.writeJsonSync(path.join(finalDir, 'package.json'), json)
  })
}

const buildDemoNext = async (dir) => {
  const pagesDir = path.join(dir, 'pages')
  const pagesToIgnore = ['_app.js', 'vanilla.js']

  const json = {
    name: 'nextjs',
    version: '1.0.0',
    scripts: {
      dev: 'next',
      build: 'next build',
      start: 'next start',
    },
    dependencies: {
      'next': '11.1.1',
      'react': '^16.8.0',
      'react-dom': '^16.8.0',
      '@typeform/embed': '^1.10.0',
      '@typeform/embed-react': '^1.0.3',
      'prop-types': '^15.7.2',
    },
    license: 'MIT',
    description: 'NextJS',
  }

  fs.readdirSync(pagesDir)
    .filter((page) => !pagesToIgnore.includes(page))
    .forEach((filename) => {
      const overwrittenFilename = filename === 'index.js' ? 'widget.js' : filename
      const dirName = path.parse(overwrittenFilename).name
      const finalDir = path.join(dir, dirName)
      fse.ensureDirSync(finalDir)
      fse.copySync(path.join(dir, 'components'), path.join(finalDir, 'components'))
      fse.copySync(path.join(dir, 'pages', filename), path.join(finalDir, 'pages', 'index.js'))
      fse.copySync(path.join(dir, 'styles'), path.join(finalDir, 'styles'))
      fse.writeJsonSync(path.join(finalDir, 'package.json'), json)
    })

  const filesGlob = './**/index.js'

  await replaceInFiles({
    files: filesGlob,
    from: '{ id }',
    to: `{ id = 'moe6aa' }`,
  })

  fse.removeSync(path.join(dir, 'components'))
  fse.removeSync(path.join(dir, 'pages'))
  fse.removeSync(path.join(dir, 'styles'))
  fse.removeSync(path.join(dir, 'public'))
}

async function main() {
  fse.removeSync(tmpDir)
  fse.ensureDirSync(tmpDir)
  fse.copySync(originDemoHtmlDir, destDemoHtmlDir)
  fse.copySync(originDemoNextDir, destDemoNextDir)

  process.chdir(tmpDir)

  removeUnusedFiles(destDemoHtmlDir)
  removeUnusedFiles(destDemoNextDir)

  await buildDemoHtml(destDemoHtmlPublicDir)

  await buildDemoNext(destDemoNextDir)

  exec('git init')
  exec('git add .')
  exec('git commit -m codesandbox')
  exec(`git remote add origin git@github.com:scarciofolomarco/codesandbox-demo.git`)
  exec('git push origin master --force')
}

main()
