// webpack.config.js

module.exports = {
    entry: './src/index.js',
    output: {
      path: __dirname + '/dist',
      filename: 'bundle.js',
    },
    devtool: 'eval-source-map',
  };
  
  