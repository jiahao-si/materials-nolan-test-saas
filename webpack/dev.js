const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function(options) {
  const {
    context,
    entry,
    output,
    externals,
    modules,
    paths: { libSrcPath, libModulesPath, containerPath },
    templateData,
  } = options;

  return {
    context,
    entry,
    output,
    externals,
    resolve: {
      extensions: ['.js', '.jsx', '.tsx', '.json', '.scss', '.css'],
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
                    ios: '9',
                    android: '4.2',
                  },
                },
              ],
              '@babel/preset-react',
            ],
            plugins: [
              '@babel/plugin-transform-async-to-generator',
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
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: false,
                importLoaders: 2,
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                implementation: require('dart-sass'),
                outputStyle: 'expanded',
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.(jpe?g|png|gif|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
          loader: 'base64-inline-loader',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(containerPath, './index.html.ejs'),
        filename: 'index.ejs',
        cache: false,
        templateParameters: templateData,
      }),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.HashedModuleIdsPlugin({
        hashFunction: 'sha256',
        hashDigest: 'hex',
        hashDigestLength: 20,
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[id].[contenthash].css',
      }),
      new webpack.EnvironmentPlugin({
        SSR: false,
        WEBPACK_ENV: 'production',
      }),
    ],
    mode: 'development',
    devtool: 'source-map',
    optimization: {
      minimize: false,
    },
  };
};
