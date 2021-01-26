const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const AssetsPlugin = require('assets-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const ESLintPlugin = require('eslint-webpack-plugin')
const path = require('path')
require('dotenv').config()

module.exports = {
  entry: {
    cms: path.join(__dirname, 'packages/cms/js/cms.js'),
    site: './site/src/index.js',
    theme: path.join(__dirname, 'site/themes', process.env.THEME, 'src/js/main.js')
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          'css-loader'
        ],
        sideEffects: true
      }
    ]
  },
  plugins: [
    new AssetsPlugin({
      filename: 'webpack.json',
      path: path.join(__dirname, 'site/data'),
      prettyPrint: true
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        'dist/**/*.js',
        'dist/**/*.css',
        'site/data/webpack.json'
      ]
    }),
    new Dotenv({
      defaults: true
    }),
    new ESLintPlugin({
      cache: true,
      emitWarning: true,
      fix: true
    })
  ],
  optimization: {
    // v5 sets usedExports to true by default
    usedExports: true,
    // moduleIds: 'deterministic', // webpack v5
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
        style: {
          test: /\.(sa|sc|c)ss$/,
          chunks: 'all',
          name: 'styles'
        }
      }
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist/lib'),
    publicPath: process.env.PUBLIC_PATH
  }
}