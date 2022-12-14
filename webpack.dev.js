const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const merged = merge(common, {
  mode: 'development',
  output: {
    filename: '[name]/js/[name].js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    // does not work with [contenthash] output names!
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hugo Netlify CMS',
      template: './packages/cms/cms.html',
      filename: 'admin/index.html',
      inject: false
    })
  ]
})

merged.module.rules.filter(o => Boolean(o.use)).filter(o => o.use[1] === 'postcss-loader')[0].use.unshift('style-loader')
module.exports = merged
