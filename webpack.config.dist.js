const path = require('path')

const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: {
    // The entrypoints of the embed are assigned to s3 AWS
    // Since we upload directly to s3 the bundleded files, all the users have the link
    // https://s3-eu-west-1.amazonaws.com/share.typeform.com/ and we can't change that for historical reasons.
    widget: './src/embed.js',
    embed: './src/embed.js',
    share: './src/embed.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
    library: ['typeformEmbed'],
    libraryTarget: 'var'
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
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new UglifyJsPlugin()
  ]
}
