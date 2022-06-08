const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const rulesForJs = {
    test: /\.js$/i,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
        }
    }
};
const rulesForCss = {
    test: /\.css$/i,
    use: [MiniCssExtractPlugin.loader, 'css-loader']
};
const rules = [rulesForJs,rulesForCss];

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    resolve: {
        extensions: ['.js'],
    },
    module: { rules },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css'
        })
    ],
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            '...'
        ]
    }
}