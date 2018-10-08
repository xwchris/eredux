const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const path = require('path');

module.exports = {
  mode,
  devtool: mode === 'production' ? '' : 'cheap-module-source-map',
  entry: './src/index',
  output: {
    filename: 'eredux.js',
    path: path.resolve(__dirname, './dist'),
    library: 'ERedux',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        use: 'babel-loader'
      }
    ]
  }
}
