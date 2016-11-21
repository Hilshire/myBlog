var config = require('./webpack.config.js')
var webpack = require('webpack'),
    uglifyJsPlugin = webpack.optimize.UglifyJsPlugin,
    ExtractTextPlugin = require('extract-text-webpack-plugin')

var uglify = new uglifyJsPlugin({
    compress: {
        warnings: false
    }
})

config.plugins.push(uglify)
delete config.devServer
config.output.filename = '[name].js'
config.plugins = [
    new ExtractTextPlugin ('app.css'),
    new webpack.optimize.CommonsChunkPlugin('vendor',  'vendor.js'),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        "root.jQuery": "jquery",
    }),
]

module.exports = config