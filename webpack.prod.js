const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob-all')
const path = require('path')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const PURGE_PATHS = {
  packages: path.join(__dirname, 'packages'),
  site: path.join(__dirname, 'site')
}

const merged = merge(common, {
  mode: 'production',
  output: {
    filename: '[name]/js/[name].[contenthash].js'
  },
  // devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hugo Netlify CMS',
      template: './packages/cms/cms.html',
      filename: 'admin/index.html',
      inject: false
    }),
    new MiniCssExtractPlugin({
      filename: '[name]/css/[name].[contenthash].css'
      // chunkFilename: '[id].[contenthash].css'
    }),
    new PurgecssPlugin({
      paths: () => glob.sync(
        Object.values(PURGE_PATHS).map(i => i + '/**/*s'),
        {
          nodir: true, ignore: '**/node_modules/**/*'
        }
      )
    }),
    new CssMinimizerPlugin({})
  ]
})

const rules = [
  {
    test: /\.m?js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        presets: [
          [
            '@babel/preset-env',
            {
              modules: false
            }
          ],
          [
            '@babel/preset-react'
          ]
        ]
      }
    }
  }
]

const mini = {
  loader: MiniCssExtractPlugin.loader,
  options: {
    esModule: true
  }
}

merged.module.rules.filter(o => Boolean(o.use)).filter(o => o.use.includes('postcss-loader'))[0].use.unshift(mini)
merged.module.rules = rules.concat(merged.module.rules)
module.exports = merged
