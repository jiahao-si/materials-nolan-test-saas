const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MpPlugin = require('mp-webpack-plugin');
const mpConfig = require('./mp.config');

module.exports = function (options) {
  const {
    context,
    entry,
    output,
    modules,
    paths: { libSrcPath, libModulesPath },
    isOptimize,
    miniprogramConfig,
  } = options;

  return {
    mode: 'production',
    context,
    entry,
    output: {
      path: output, // 放到小程序代码目录中的 common 目录下
      filename: '[name].js', // 必需字段，不能修改
      library: 'createApp', // 必需字段，不能修改
      libraryExport: 'default', // 必需字段，不能修改
      libraryTarget: 'window', // 必需字段，不能修改
    },
    target: 'web', // 必需字段，不能修改
    optimization: {
      runtimeChunk: false, // 必需字段，不能修改
      splitChunks: { // 代码分隔配置，不建议修改
        chunks: 'all',
        minSize: 1000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 100,
        maxInitialRequests: 100,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
          },
          styles: {
            name: true,
            test: /\.css$/,
            chunks: 'all',
            enforce: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
      // 是否压缩业务代码，开发者工具可能无法完美支持业务代码使用到的 es 特性，建议自己做代码压缩
      minimizer: isOptimize ? [
        // 压缩CSS
        new OptimizeCSSAssetsPlugin({
          assetNameRegExp: /\.(css|wxss)$/g,
          cssProcessor: require('cssnano'), // eslint-disable-line
          cssProcessorPluginOptions: {
            preset: ['default', {
              discardComments: {
                removeAll: true,
              },
              minifySelectors: false, // 因为 wxss 编译器不支持 .some>:first-child 这样格式的代码，所以暂时禁掉这个
            }],
          },
          canPrint: false,
        }),
        // 压缩 js
        new TerserPlugin({
          test: /\.js(\?.*)?$/i,
          parallel: true,
        }),
      ] : [],
    },
    module: {
      rules: [
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
                implementation: require('dart-sass'), // eslint-disable-line
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
        {
          test: /\.(ts|js)x?$/,
          use: [
            'thread-loader',
            {
              loader: 'babel-loader?cacheDirectory',
              options: {
                configFile: false,
                presets: [
                  '@babel/preset-react',
                ],
                plugins: [
                  '@babel/plugin-proposal-class-properties',
                ],
              },
            },
          ],
          include: [
            context,
          ],
          sideEffects: false,
        },
      ],
    },
    resolve: {
      extensions: ['*', '.tsx', '.ts', '.jsx', '.js', '.vue', '.json'],
      modules: [
        libSrcPath,
        libModulesPath,
        ...modules,
      ],
      symlinks: false,
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.isMiniprogram': true, // 注入环境变量，用于业务代码判断
      }),
      new MiniCssExtractPlugin({
        filename: '[name].wxss',
      }),
      new MpPlugin(Object.assign(mpConfig, miniprogramConfig)),
    ],
  };
};
