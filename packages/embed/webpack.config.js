const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
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
    path: path.resolve(__dirname, 'dist/webpack'),
  },
  plugins: [new HtmlWebpackPlugin()],
  externalsType: 'window',
}
