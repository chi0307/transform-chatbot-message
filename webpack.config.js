const path = require('path');

module.exports = {
  mode: 'production',
  target: 'node',
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.min.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
};
