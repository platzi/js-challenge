import path from "path";

export default {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve('./', 'public'),
  },
};