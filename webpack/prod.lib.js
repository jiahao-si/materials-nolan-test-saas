const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const getDevConfig = require('./dev.lib');

module.exports = function(options) {
  const { libName } = options;
  const devConfig = getDevConfig(options);

  return {
    ...devConfig,
    plugins: [
      new ExtractCssChunks({
        filename: `${libName}.[name].[hash].css`,
        orderWarning: true,
      }),
      new ManifestPlugin(),
    ],
    optimization: {
      minimize: true,
    },
    mode: 'production',
  };
}
