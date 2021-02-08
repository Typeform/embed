const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  entry: {
    popup: './src/factories/create-popup/create-popup.ts',
    widget: './src/factories/create-widget/create-widget.ts',
  },
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
    filename: 'tf.[name].js',
    library: ['tf', '[name]'],
    libraryTarget: 'window',
    path: path.resolve(__dirname, 'dist/webpack'),
  },
  plugins: [new HtmlWebpackPlugin()],
  externalsType: 'window',
}
