const {resolve, join} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {};

config.entry = {
    app: './src/js/app.js'
}

config.devServer = {
    port: 9000,
    compress: true,
    contentBase: join(__dirname, 'dist')
}

config.output = {
    path: resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
}

config.module = {
    rules: [
        {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader','sass-loader']
            })
        },
        {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
        }
    ]
}

config.plugins = [
    new CleanWebpackPlugin(),
    new ExtractTextPlugin('main.css'),
    new HtmlWebpackPlugin({
        template: './src/index.html',
    }),
]

module.exports = config;
