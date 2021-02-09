const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const AssetsPlugin = require('assets-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const ESLintPlugin = require('eslint-webpack-plugin')
const path = require('path')
require('dotenv').config()

module.exports = {
  entry: {
    cms: path.join(__dirname, 'packages/cms/js/cms.js'),
    theme: path.join(__dirname, 'site/themes', process.env.THEME, 'src/js/main.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist/lib'),
    publicPath: process.env.PUBLIC_PATH
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
      filename: 'webpack_assets.json',
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
      cacheLocation: path.join(__dirname, 'node_modules/.cache/eslint/'),
      emitWarning: true,
      fix: true
    })
  ],
  optimization: {
    // v5 sets usedExports to true by default
    usedExports: true,
    moduleIds: 'deterministic',
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
  }
}

if (process.env.THEME === 'ananke') {
  module.exports.entry.app = module.exports.entry.theme
  delete module.exports.entry.theme
}
