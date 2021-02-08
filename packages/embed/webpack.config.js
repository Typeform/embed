const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const npmConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'build'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: 'ts-loader' }],
  },
}

const browserConfig = {
  entry: './src/index.ts',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'embed-next.js',
    library: 'tf',
    libraryTarget: 'window',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [new HtmlWebpackPlugin()],
  externalsType: 'window',
}

module.exports = [npmConfig, browserConfig]
