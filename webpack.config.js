import { DefinePlugin } from 'webpack'

const LiveReloadPlugin = require('webpack-livereload-plugin')

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: __dirname,
    filename: './public/bundle.js',
  },
  devtool: 'source-map',
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  plugins: isDev ? [new LiveReloadPlugin({
    appendScriptTag: true,
  })] : [new DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'API_URL': JSON.stringify(process.env.API_URL)
    }
  })],
}
