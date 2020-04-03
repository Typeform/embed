const path = require('path')

const webpack = require('webpack')

module.exports = {
  entry: {
    api: './src/api.js'
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: '[name].js',
    publicPath: '/',
    library: ['typeformEmbed'],
    libraryTarget: 'commonjs2'
  },
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat'
    }
  },
  devServer: {
    quiet: false,
    noInfo: false,
    contentBase: './demo',
    disableHostCheck: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    publicPath: '/',
    stats: {
      colors: true
    }
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.(gif|png)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 25000
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      preact: 'preact'
    })
  ]
}
