import webpack from 'webpack';
const path = require('path')
const env = 'development'
const root = process.cwd()

const config = {
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(root, './client/app.js')
  ],
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: path.join(root, '/public/'),
    publicPath: '/',
    filename: 'app.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: { presets: ["react-app"] },
        exclude: /node_modules/
      }
    ],
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify("development")
    }),
  ],
  resolve: {
    extensions: ['jsx', '.json', '.js'],
    modules: [
      path.resolve(root, './client'),
      'node_modules',
    ]
  }
}

module.exports = config
