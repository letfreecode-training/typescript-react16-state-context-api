const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.css/,
        loader: ['style-loader', 'css-loader']
      },
      {
        test: /.(png|gif|jpg|eot|ttf|svg|woff|woff2)$/,
        loader: 'file-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    compress: true,
    port: 9000,
    historyApiFallback: true
  }
};
