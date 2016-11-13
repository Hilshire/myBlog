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

module.exports = config