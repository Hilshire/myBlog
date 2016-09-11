var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// var ROOT_PATH = __dirname,
//     APP_PATH = path.resolve(ROOT_PATH, 'src'),
//     BUILD_PATH = path.resolve(ROOT_PATH, 'dist')

module.exports = {
  entry: {
    // main: path.resolve(APP_PATH, 'main.js')
    main: './src/main.js'
  },
  output: {
    // path: BUILD_PATH,
    path: './dist/',
    filename: 'bundle.js'
  },
  devtool: 'eval-source-map',
  module: {
    loaders: [
      {test: /\.js$/, exclude:/node_modules|dist/, loader:'babel'},
      {test: /\.vue$/, loader:'vue'},
      {test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css")},
      {test: /\.scss$/, loader: 'style!css!sass'},
      {test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192'},
      {
         test: /\.(woff2|woff|ttf|eot|svg|otf)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
         loaders: ["url-loader?limit=1000&name=fonts/[name]_[hash].[ext]"]
      }    
    ]
  },
  babel: {
    presets: 'es2015',
    plugins: ['transform-runtime']
  },
  resolve : {
    extensions: ['', '.vue', '.js']
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
  },
  plugins : [
    new ExtractTextPlugin ('app.css')
  ]
}