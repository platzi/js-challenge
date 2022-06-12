// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
    entry: 'src/index.js',
    output: {
      path: path.resolve(__dirname + './dist'),
      filename: 'bundle.js',
    },
    devtool: 'eval-source-map',
    plugins: [
        new HtmlWebpackPlugin({
          template: 'public/index.html'
        })
      ]
  };
  
  