var gulp = require('gulp'),
    webpack = require('webpack-stream'),
    name = require('vinyl-named'),
    connect = require('gulp-connect'),
    // ExtractTextPlugin = require('extract-text-webpack-plugin'),
    path = require('path'),
    babel = require('gulp-babel'),
    es2015 = require('babel-preset-es2015')

gulp.task('bundle', function() {
    return gulp.src(['src/app.js', 'scr/login.js'])
        .pipe(babel())
        .pipe(name())
        .pipe(webpack(getConfig()))
        .pipe(gulp.dest('dist/'))
})

gulp.task('webserver', function() {
    connect.server({
        livereload: true,
        root: './'
    })
})

gulp.task('default', ['bundle'])

function getConfig() {
    var ROOT_PATH = __dirname,
        APP_PATH = path.resolve(ROOT_PATH, 'src'),
        BUILD_PATH = path.resolve(ROOT_PATH, 'dist')

    var config = {
         entry: {
            app: path.resolve(APP_PATH, 'app.js'),
            login: path.resolve(APP_PATH, 'login.js'),
            vendor: ['jquery', 'vue']
        },
        output: {
            path: BUILD_PATH,
            filename: '[name].js',
            chunkFilename:'[id].chunk.js'
        },       
        devtool: 'source-map',
        resolve: {
            extensions: ['', 'js', 'vue']
        },
        module: {
            loaders: [
                // {test: /\.js$/, exclude:/node_modules|dist/, loader:'babel'},
                {test: /\.vue$/, loader:'vue'},
                // {test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css")},
                {test: /\.scss$/, loader: 'style!css!sass'},
                {test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192'},
                {
                    test: /\.(woff2|woff|ttf|eot|svg|otf)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loaders: ["url-loader?limit=1000&name=fonts/[name]_[hash].[ext]"]
                }
            ]
        },
        // babel: {
        //     presets: 'es2015',
        //     plugins: ['transform-runtime']
        // },
        resolve : {
            extensions: ['', '.vue', '.js']
        },
    }
}