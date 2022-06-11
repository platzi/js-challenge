const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public'),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '/public')
    },
    port: 9000,
  }
}