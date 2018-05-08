const webpack = require('webpack');
const path = require('path');
const HandlebarsPlugin = require("handlebars-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'source-maps',
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  watch: true,
  devServer: {
    port: process.env.PORT || 8080,
    historyApiFallback: true,
    inline: true,
    host: "0.0.0.0"
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: ["source-map-loader"],
        enforce: "pre"
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: {
          loader: 'base64-inline-loader'
        }
      },
      {
        test: /\.(svg)$/,
        use: {
            loader: 'svg-url-loader',
            options: {
              encoding: 'none'
            }
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: {
            loader: 'file-loader',
            options: {
              sourceMap: true
            }
        }
      }
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery',
        jquery: 'jquery',
        "window.jQuery": "jquery"
    }),
    new HandlebarsPlugin({
      // path to hbs entry file(s)
      entry: path.join(process.cwd(), "src", "*.hbs"),
      // output path and filename(s)
      // if ommited, the input filepath stripped of its extension will be used
      output: path.join(process.cwd(), "dist", "[name].html"),
      // data passed to main hbs template: `main-template(data)`
      //data: require("./app/data/project.json"),
      // or add it as filepath to rebuild data on change using webpack-dev-server
      //data: path.join(__dirname, "app/data/project.json"),

      // globbed path to partials, where folder/filename is unique
      partials: [
        path.join(process.cwd(), "src", "*", "*.hbs"),
        path.join(process.cwd(), "src", "partials", "*", "*.hbs")
      ],

  }), new CopyWebpackPlugin([
    // {output}/file.txt
    // { from: 'src/images' , to: 'images'},
    // { from: 'data', to: 'data' }
  ])
  ]
};
