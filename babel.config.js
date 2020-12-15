const { BUILD_STANDALONE = 'true' } = process.env

module.exports = {
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        corejs: BUILD_STANDALONE === 'true' ? 3.6 : undefined,
        useBuiltIns: BUILD_STANDALONE === 'true' ? 'usage' : false,
      },
    ],
  ],
  plugins: ['babel-plugin-styled-components'],
}
