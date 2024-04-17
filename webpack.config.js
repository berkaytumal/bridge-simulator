const path = require('path');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');

const development = true;

module.exports = {
  mode: development ? "development" : "production",
  entry: {
    script: './src/script.js',
    bridgemock: './src/bridgemock.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './[name].js',
  },
  plugins: [
    new WebpackShellPluginNext({
      onBuildStart: 'echo "===> Starting packing with WEBPACK 5"',
      onAfterDone: 'node sri.js'
    })
  ]
};
