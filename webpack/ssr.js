const getDevConfig = require('./dev');
const webpack = require('webpack');

module.exports = function(options) {
  const devConfig = getDevConfig(options);
  return {
    ...devConfig,
    mode: 'production',
    devtool: '(none)',
    optimization: {
      minimize: false,
    },
    externals: {
      react: 'react',
      'react-dom': 'react-dom',
    },
    target: 'node',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          options: {
            compact: false,
            presets: ['@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
        {
          test: /\.(jpe?g|png|gif|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
          loader: 'base64-inline-loader',
        },
        {
          test: /\.(css|scss|less)$/,
          use: [
            {
              loader: 'ignore-loader',
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        SSR: true,
      }),
      new webpack.NoEmitOnErrorsPlugin(),
    ],
  };
};
