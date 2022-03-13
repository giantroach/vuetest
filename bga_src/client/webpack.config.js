const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
    plugins: [new MiniCssExtractPlugin({
      filename: 'vuetest.css',
    })],
  entry: [
    './bga_src/client/vuetest.ts',
    './bga_src/client/vuetest.scss',
  ],
  output: {
    path: path.resolve(__dirname, '../../dist'),
    filename: 'vuetest.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', "sass-loader"],
      },
    ],
  },
};
