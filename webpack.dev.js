const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const merged = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    // does not work with [contenthash] output names!
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      inject: false,
      template: './site/index.html'
    })
  ],
  output: {
    filename: '[name]/js/[name].js'
  }
})

merged.module.rules.filter(o => Boolean(o.use)).filter(o => o.use[0] === 'css-loader')[0].use.unshift('style-loader')
module.exports = merged
