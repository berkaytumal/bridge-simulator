const path = require('path');

const mode = 'development';

module.exports = {
  mode: "development",
  entry: {
    main: './src/script.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './script.js',
  }
};
