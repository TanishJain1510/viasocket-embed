const path = require('path');

module.exports = {
  entry: './chatbot/chatbot-prod.js',
  output: {
    filename: 'chatbot-prod.js',
    path: path.resolve(__dirname, 'chatbot-build'),
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