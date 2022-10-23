const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  entry:{
    polyfill: 'babel-polyfill',
    app: './js/app.js'
  },

  context: path.resolve(__dirname, 'src'),

  devServer: {
    port:9000,
    host: 'localhost',
    hot: true,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
        test: /\.js$/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',

            options: {
              importLoaders: 1,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              // plugins: () => [precss, autoprefixer],
              postcssOptions: {
                plugins: [require('postcss-preset-env')],
              }
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: './style.css'
    }),
  ],

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[contenthash].js',
  },

  mode: 'development',

}