const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const path = require('path');

module.exports = {
  mode,
  devtool: mode === 'production' ? '' : 'cheap-module-source-map',
  entry: './src/index',
  output: {
    filename: 'ereact.min.js',
    path: path.resolve(__dirname, './public'),
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
