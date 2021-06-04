const path = require('path');

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  mode: 'development',
  watchOptions: {
    aggregateTimeout: 200,
    ignored: ['**/dist/*.js', '**/node_modules'],
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
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    port: 4200,
    contentBase: path.join(__dirname, './dist'),
    index: 'index.html',
    watchContentBase: true,
    hot: true
  }
};
