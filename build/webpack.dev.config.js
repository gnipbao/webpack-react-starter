const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const commonWebpackConfig = require('./webpack.common.config');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const AutoDllPlugin = require('autodll-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// auxiliary plugins
const SizePlugin = require('size-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();

const basePath = path.resolve(__dirname, '../');
const distPath = path.resolve(__dirname, '../dist');

const devConfig = smp.wrap(
  merge(commonWebpackConfig, {
    mode: 'development', // "production" | "development" | "none"
    // Chosen mode tells webpack to use its built-in optimizations accordingly.

    output: {
      // options related to how webpack emits results
      path: distPath, // string, // string

      filename: '[name].[hash].js', // string
    },

    module: {},``

    devtool: 'source-map', // enum
    // enhance debugging by adding meta info for the browser devtools
    // source-map most detailed at the expense of build speed.
    // cheap-source-map

    devServer: {
      contentBase: distPath, // boolean | string | array, static file location
      hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
      open: true,
      port: 9000,
      compress: true,
    },

    plugins: [
      new CleanWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new SizePlugin(),
      new HtmlWebpackPlugin({
        inject: true,
        template: '../public/index.html',
      }),
      //   new AutoDllPlugin({
      //     debug: true,
      //     inject: true,
      //     filename: '[name]_[hash].js',
      //     path: '../dll',
      //     entry: {
      //       vendor: ['gsap'],
      //     },
      //   }),
    ],
    // list of additional plugins

    /* Advanced configuration  */
  })
);

module.exports = devConfig;
