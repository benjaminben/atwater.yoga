const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    create: './js/create/create.js',
    admin: './js/admin/admin.js',
    board: './js/board/board.js',
    client: './js/client/client.js',
    sass: './js/sass.js'
  },
  output: {
    path: path.resolve(__dirname, './public/js'),
    filename: '[name].bundle.js',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: 'commons.js',
      minChunks: 2,
    }),
    new ExtractTextPlugin({
      filename: '../css/src.bundle.css',
      allChunks: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015'] }
        }]
      },
      {
        test: /\.(sass|scss)$/,
        include: path.resolve(__dirname, './src/styles'),
        loader: ExtractTextPlugin.extract('css-loader!postcss-loader!sass-loader'),
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ]
  }
  // devServer: {
  //   contentBase: path.resolve(__dirname, './public/js'),
  // },
}
