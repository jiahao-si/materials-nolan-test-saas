const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

module.exports = function(options) {
  const {
    context,
    entry,
    output,
    externals,
    modules,
    paths: { libSrcPath, libModulesPath },
  } = options;

  return {
    context,
    entry,
    output,
    externals,
    resolve: {
      modules: [...modules, libSrcPath, libModulesPath],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          options: {
            compact: false,
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    chrome: '58',
                  },
                },
              ],
              '@babel/preset-react',
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              '@babel/plugin-proposal-export-default-from',
              '@babel/plugin-proposal-export-namespace-from',
            ],
          },
        },
        {
          test: /\.(css|scss|sass)$/,
          use: [
            {
              loader: ExtractCssChunks.loader,
              options: {
                hot: true,
                reloadAll: true,
              },
            },
            { loader: 'css-loader' },
            {
              loader: 'sass-loader',
              options: {
                implementation: require('dart-sass'),
              },
            },
          ],
        },
        {
          test: /\.(jpe?g|png|gif|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
          loader: 'base64-inline-loader',
        },
        {
          test: /\.ejs$/,
          use: 'raw-loader',
        },
      ],
    },
    plugins: [
      new ExtractCssChunks({
        filename: 'debug.[name].css',
        orderWarning: true,
      }),
    ],
    optimization: {
      minimize: false,
    },
    mode: 'development',
    devtool: 'source-map',
  };
};
