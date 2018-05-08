const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HandlebarsPlugin = require("handlebars-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlCriticalPlugin = require("html-critical-webpack-plugin");

module.exports = {
  entry: {
    index: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: ["source-map-loader"],
        enforce: "pre"
      }, {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader"})
      }, {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: {
          loader: 'base64-inline-loader'
        }
      }, {
        test: /\.(svg)$/,
        use: {
          loader: 'svg-url-loader',
          options: {
            encoding: 'none'
          }
        }
      }, {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            sourceMap: true
          }
        }
      }
    ]
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
      // globbed path to partials, where folder/filename is unique
      partials: [
        path.join(process.cwd(), "src", "*", "*.hbs"),
        path.join(process.cwd(), "src", "partials", "*", "*.hbs")
      ]
    }),
    new ExtractTextPlugin('[name].css', {
      publicPath: '/',
      allChunks: true
    }),
    new CopyWebpackPlugin([
      // {output}/file.txt
      {
        from: 'src/images',
        to: 'src/images'
      }, 
      // {
      //   from: 'src/fonts',
      //   to: 'src/fonts'
      // }, 
      // {
      //   from: 'src/scss',
      //   to: 'styles'
      // }
    ])
  ]
};
