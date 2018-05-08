const WebpackShellPlugin = require('webpack-shell-plugin');
const webpack = require('webpack');

const HandlebarsPlugin = require("handlebars-webpack-plugin");
const KssWebpackPlugin = require('kss-webpack-plugin');

var KssConfig = {
  source: './src/scss/',
  destination: './styleguide',
  js: '../templates/bundle.js',
};

module.exports = {
  devtool: 'source-maps',
  entry: ['./src/index.js'],
  output: {
    filename: 'templates/bundle.js'
  },
  watch: true,
  devServer: {
    port: process.env.PORT || 8080,
    historyApiFallback: true,
    inline: true,
    host: "0.0.0.0"
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
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
          loader: 'file-loader',
          options: {
            name: '../src/images/[name].[ext]'
          }
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
    new KssWebpackPlugin(KssConfig),
    new HandlebarsPlugin({
      // path to hbs entry file(s)
      entry: path.join(process.cwd(), "src", "*.hbs"),
      // output path and filename(s)
      // if ommited, the input filepath stripped of its extension will be used
      output: path.join(process.cwd(), "templates", "[name].html"),
      // data passed to main hbs template: `main-template(data)`
      //data: require("./app/data/project.json"),
      // or add it as filepath to rebuild data on change using webpack-dev-server
      //data: path.join(__dirname, "app/data/project.json"),

      // globbed path to partials, where folder/filename is unique
      partials: [
        path.join(process.cwd(), "src", "*", "*.hbs"),
        path.join(process.cwd(), "src", "partials", "*", "*.hbs")
      ],

      // register custom helpers. May be either a function or a glob-pattern
      // helpers: {
      //     nameOfHbsHelper: Function.prototype,
      //     projectHelpers: path.join(process.cwd(), "app", "helpers", "*.helper.js")
      // },

      // hooks
      // onBeforeSetup: function (Handlebars) {},
      // onBeforeAddPartials: function (Handlebars, partialsMap) {},
      // onBeforeCompile: function (Handlebars, templateContent) {},
      // onBeforeRender: function (Handlebars, data) {},
      // onBeforeSave: function (Handlebars, resultHtml, filename) {},
      // onDone: function (Handlebars, filename) {}
  })
  ]
};
