import config from './webpack.config.js'

var uglify = new uglifyJsPlugin({
    compress: {
        warnings: false
    }
})

config.plugins.push(uglify)
config.unshift('devServer')
config.output.filename = '[name].[hash:6].js'

module.exports = config