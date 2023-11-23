const path = require('path')

const sass = require('sass')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'
const isProd = mode === 'production'

const cssUrl = process.env.CSS_URL ?? (isProd ? 'https://embed.typeform.com/next/css/' : './lib/css/')

const baseConfig = {
  mode,
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: 'ts-loader' }],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'src/css/*.scss',
          to: 'css/[name].css',
          transform: (content, path) => {
            const result = sass.compile(path, {
              style: isProd ? 'compressed' : 'expanded',
            })

            return result.css.toString()
          },
        },
      ],
    }),
    new webpack.DefinePlugin({
      'process.env': {
        CSS_URL: JSON.stringify(cssUrl),
      },
    }),
  ],
}

const npmConfig = {
  ...baseConfig,
  entry: './src/index.ts',
  devtool: isProd ? false : 'inline-source-map',
  output: {
    filename: 'index.js',
    library: 'embed',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'build'),
    globalObject: 'this',
  },
}

const browserConfig = {
  ...baseConfig,
  entry: './src/browser.ts',
  output: {
    filename: 'embed.js',
    library: 'tf',
    libraryTarget: 'window',
    path: path.resolve(__dirname, 'build'),
  },
  externalsType: 'window',
}

module.exports = [npmConfig, browserConfig]
