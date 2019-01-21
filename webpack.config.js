/* global require process module __dirname */

let path = require("path");
const webpack = require ("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const devMode = process.env.NODE_ENV !== 'production'
let config = {
  entry: {
    build: path.resolve ("src", "index.js"),
  },
  output: {
    pathinfo: true,
    filename: "[name].js",
    path: path.resolve ("build", "development"),
    publicPath: "/",
    sourceMapFilename: "[name].source.map",
  },

  devServer: {
    overlay: true,
    open: false,
    hot: true,
    hotOnly: true,
    compress: true,
    watchContentBase: true,
    contentBase: path.join(__dirname, 'build'),
    index: "index.pug",
    publicPath: "/",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },

      { 
        test: /\.pug$/,
        exclude: /node_modules/,
        loader: 'pug-loader',
          options: {
            pretty: true,
          },
      },

      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
                      // sourceMap: true,
                    }
          },   
          'postcss-loader',
          {
            loader: "sass-loader",
            options: {
                      sourceMap: true,
                    }
          },   
        ],
      },

      // {
      //   test: /\.(jpg|jpeg|gif|png)$/,
      //   exclude: /node_modules/,
      //   loader:'url-loader?limit=1024&name=images/[name].[ext]'
      // },
      // {
      //   test: /\.(woff|woff2|eot|ttf|svg)$/,
      //   exclude: /node_modules/,
      //   loader: 'url-loader?limit=1024&name=fonts/[name].[ext]'
      // },

      {
        test: /\.(gif|png|jpe?g|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'images/[name][hash].[ext]'
          }
        },  {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
              quality: 70
            }
          }
        }, 
        ],
      },

      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name][hash].[ext]'
          }
        },
      }

    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.pug",
      template: path.resolve("src", "index.pug"),
      inject: true,
      hash: true,
      minify: true,
      xhtml: true,
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    new webpack.HotModuleReplacementPlugin (),
  ]
};

module.exports = () => {
  return config;
};
