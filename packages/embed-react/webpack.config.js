const path = require('path')

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'
const isProd = mode === 'production'

const npmConfig = {
  mode,
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  externals: {
    react: 'react',
    'react-dom': 'reactDOM',
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: 'raw-loader', exclude: /node_modules/ },
    ],
  },
  plugins: [],
  // entry: ['react', './src/index.tsx'],
  entry: './src/index.tsx',
  devtool: isProd ? false : 'inline-source-map',
  output: {
    filename: 'index.js',
    library: 'embed-react',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'build'),
    globalObject: 'this',
  },
}

module.exports = [npmConfig]
