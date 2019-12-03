const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: './bundle.js'
  },
  mode: 'production',
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  module: {
    rules:
      [
        {
          test: /\.css$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].css',
                context: './',
                outputPath: '/bulma/css',
                publicPath: '/dist'
              }
            },
            {
              loader: 'extract-loader'
            },
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            },
          ]
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                  name: '[name].less',
                  context: './',
                  outputPath: '/bulma/less',
                  publicPath: '/dist'
              }
          }
          ],
        },
      ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),
  ],
};