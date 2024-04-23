const path = require('path');

module.exports = {
  entry: './interface/interface-local.js',
  output: {
    filename: 'interface-local.js',
    path: path.resolve(__dirname, 'interface-build'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
        // test: /\.css$/,
        // exclude: /node_modules/,
        // use: ['css-loader'],
      },
    ],
  },
};