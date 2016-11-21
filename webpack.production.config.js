var config = require('./webpack.config.js')
var webpack = require('webpack')
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin

var uglify = new uglifyJsPlugin({
    compress: {
        warnings: false
    }
})

config.plugins.push(uglify)
delete config.devServer
config.output.filename = '[name].[hash:6].js'
config.plugins = [
    new ExtractTextPlugin ('app.[hash:6].css'),
    new webpack.optimize.CommonsChunkPlugin('vendor',  'vendor.[hash:6].js'),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        "root.jQuery": "jquery",
    }),
]

module.exports = config