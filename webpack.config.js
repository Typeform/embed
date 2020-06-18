const path = require('path')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const {
  NODE_ENV = 'production',
  BUILD_STANDALONE = 'true'
} = process.env

module.exports = getWebpackConfig()

// Config implementation
function getWebpackConfig () {
  const buildMode = NODE_ENV
  const includeDeps = BUILD_STANDALONE === 'true'

  return {
    // Build mode, development or production
    mode: buildMode,
    // Sourcemaps generation mode
    devtool: 'source-map',

    // Entry points configuration
    // Specifies what source files (values) are use to generate output files (keys)
    entry: {
      // npm library version
      lib: './src/lib.js',
      // legacy CDN version
      embed: './src/embed.js',

      // LEGACY
      //
      // ===> TODO: check whether these are even needed <====
      //
      // The entrypoints of the embed are assigned to s3 AWS
      // Since we upload directly to s3 the bundleded files, all the users have the link
      // https://s3-eu-west-1.amazonaws.com/share.typeform.com/ and we can't change that for historical reasons.
      widget: './src/embed.js',
      share: './src/embed.js'
    },

    // Output configuration
    output: {
      // Sets the output folder
      path: path.resolve(__dirname, 'build'),
      // Pattern to compose the output filename
      filename: getAssetName(includeDeps),
      // UMD supports both NPM package format and
      // global variable format, when used from a CDN
      libraryTarget: 'umd',
      // Sets the name of a global variable that will contain the entrypoint
      // when used from a CDN
      library: 'typeformEmbed'
    },

    // Different file loaders configurations
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.(gif|png)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 25000
            }
          }
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        }
      ]
    },

    // Exclude stuff from bundle
    externals: !includeDeps ? {
      react: 'react',
      'react-dom': 'react-dom'
    } : undefined,

    // Replace react with preact for smaller package size
    resolve: {
      alias: {
        react: 'preact/compat',
        'react-dom': 'preact/compat'
      }
    },

    // Optimization settings
    optimization: {
      minimizer: [new UglifyJsPlugin({ sourceMap: true })]
    },

    // Remove unnecessary output
    stats: {
      all: false,
      assets: true,
      errors: true
    }
  }
}

function getAssetName (includeDeps) {
  const result = [
    '[name]',
    includeDeps ? '' : 'pure',
    'js'
  ]
    .filter((x) => x)
    .join('.')

  return result
}
