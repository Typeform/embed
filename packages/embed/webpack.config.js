const path = require('path')

const sass = require('node-sass')
const CopyPlugin = require('copy-webpack-plugin')

const baseConfig = {
  mode: 'development',
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
          from: 'src/**/*.scss',
          to: 'css/[name].css',
          transform: (content, path) => {
            const result = sass.renderSync({
              file: path,
            })

            return result.css.toString()
          },
        },
      ],
    }),
  ],
}

const npmConfig = {
  ...baseConfig,
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  output: {
    filename: 'index.js',
    library: 'embed-next',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'build'),
  },
}

const browserConfig = {
  ...baseConfig,
  entry: './src/browser.ts',
  output: {
    filename: 'embed-next.js',
    library: 'tf',
    libraryTarget: 'window',
    path: path.resolve(__dirname, 'build'),
  },
  externalsType: 'window',
}

// module.exports = [npmConfig, browserConfig]

module.exports = [npmConfig]
