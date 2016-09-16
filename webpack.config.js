var path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    uglifyJsPlugin = webpack.optimize.UglifyJsPlugin
    // HtmlWebpackPlugin = require('html-webpack-plugin')

var ROOT_PATH = __dirname,
    APP_PATH = path.resolve(ROOT_PATH, 'src'),
    BUILD_PATH = path.resolve(ROOT_PATH, 'dist')

module.exports = {
  entry: {
    app: path.resolve(APP_PATH, 'app.js'),
    login: path.resolve(APP_PATH, 'login.js'),
    vendor: ['jquery', 'vue']
  },
  output: {
    path: '/dist/',
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename:'[id].chunk.js'
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
    proxy: {
        "/manager": {
            target: 'http://localhost:3000'
        }
    }
  },
  plugins: [
    new ExtractTextPlugin ('app.css'),
    new webpack.optimize.CommonsChunkPlugin('vendor',  'vendor.js'),
    // new uglifyJsPlugin({
    //     compress: {
    //         warnings: false
    //     }
    // }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        chunks: ['index', 'login'],
        minChunks: 2,
    }),
    // new HtmlWebpackPlugin({
    //     title: 'hilshire\'s blog',
    //     filename: path.resolve(ROOT_PATH, 'app.html'),
    //     chunks: [path.resolve(ROOT_PATH, 'app.html'),]
    // }),
    // new HtmlWebpackPlugin({
    //     title: 'manager',
    //     filename: path.resolve(ROOT_PATH, 'manager.html')
    // }),
    // new HtmlWebpackPlugin({
    //     title: 'login',
    //     filename: path.resolve(ROOT_PATH, 'login.html'),
    //     chunks: [name]
    // })
  ],
}
