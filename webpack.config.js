const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin') // installed via npm

const copyFiles = [
  { from: 'src/index.html' },
  { from: 'static/images/*', to: './images/[name].[ext]' }
]

module.exports = {
  mode: 'development',
  entry: './src/js/app.js',
  devtool: 'source-map',
  plugins: [
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({ filename: 'styles/style.bundle.css' }),
    new CopyWebpackPlugin(copyFiles, { logLevel: 'debug' })
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        include: [path.resolve(__dirname, 'src/js')],
        loader: 'babel-loader'
      },
      {
        test: /.js$/,
        include: [path.resolve(__dirname, 'src/js')],
        loader: 'eslint-loader'
      },
      {
        test: /.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /.(gif|png|jpg)$/,
        include: [path.resolve(__dirname, 'src/images')],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 30720,
              name: '[name].[ext]',
              outputPath: './images/'
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [new TerserPlugin()],
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },
      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: true
    }
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    contentBasePublicPath: '/',
    index: 'index.html',
    // サーバー起動時にブラウザを開く
    open: true,
    // エラーや警告をブラウザに表示する
    overlay: true
  }
}
