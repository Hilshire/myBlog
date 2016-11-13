var path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    uglifyJsPlugin = webpack.optimize.UglifyJsPlugin

var APP_PATH = path.resolve(__dirname, 'src'),
    BUILD_PATH = path.resolve(__dirname, 'dist'),
    PUBLIC_PATH = '/dist',
    MODULE_PATH = path.resolve(__dirname, 'node_modules'),

    VUE_PATH = path.resolve(MODULE_PATH, 'vue/dist/vue.min.js'),
    VUE_ROUTER_PATH = path.resolve(MODULE_PATH, 'vue-router/dist/vue-router.min.js'),
    JQUERY_PATH = path.resolve(MODULE_PATH, 'jquery/dist/jquery.min.js'),
    MATERIALIZE_PATH = path.resolve(MODULE_PATH, 'materialize-css/dist/js/materialize.min.js')

var PROXY = 'http://localhost:3000/'
  
module.exports = {
    entry: {
        app: path.resolve(APP_PATH, 'app.js'),
        login: path.resolve(APP_PATH, 'login.js'),
        manager: path.resolve(APP_PATH, 'manager.js'),
        vendor: ['jquery', 'vue']
    },
    output: {
        path: BUILD_PATH,
        publicPath: PUBLIC_PATH,
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
                test: /\.(woff|woff2|ttf|svg|eot)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loaders: ["url-loader?limit=1000&name=fonts/[name]_[hash].[ext]"]
            }
        ]
    },
    babel: {
        presets: 'es2015',
        plugins: ['transform-runtime']
    },
    resolve : {
        extensions: ['', '.vue', '.js'],
        alias: {
            'vue': VUE_PATH,
            'vue-router': VUE_ROUTER_PATH,
            'jquery': JQUERY_PATH,
            'materialize.min.js': MATERIALIZE_PATH
        }
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        proxy: {
            "**": {
                target: PROXY
            }
        }
    },
    plugins: [
        new ExtractTextPlugin ('app.css'),
        new webpack.optimize.CommonsChunkPlugin('vendor',  'vendor.js'),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "root.jQuery": "jquery",
        }),
    ]
}
