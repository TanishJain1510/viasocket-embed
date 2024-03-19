const path = require('path');

module.exports = {
  entry: './embed-build/test-webcomponent.js',
  output: {
    filename: 'test-embedcomponent.js',
    path: path.resolve(__dirname, 'embed-build'),
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