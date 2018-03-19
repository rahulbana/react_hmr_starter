import webpack from 'webpack';
const path = require('path')
const root = process.cwd()

const config = {
  entry: {
    app: path.join(root, './client/app.js')
  },
  output: {
    path: path.join(root, '/public/'),
    publicPath: '/',
    filename: 'app.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify("production")
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
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
