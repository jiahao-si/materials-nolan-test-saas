const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const getDevConfig = require('./dev');

module.exports = function(options) {
  const devConfig = getDevConfig(options);
  return {
    ...devConfig,
    mode: 'production',
    devtool: 'source-map',
    optimization: {
      minimizer: [new OptimizeCSSAssetsPlugin({})],
    },
  };
};
