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
  // devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Netlify CMS',
      template: './packages/cms/cms.html',
      filename: 'admin/index.html',
      inject: false
    }),
    new HtmlWebpackPlugin({
      title: 'Production',
      inject: false,
      template: './site/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name]/css/[name].[contenthash].css'
      // chunkFilename: '[id].[contenthash].css'
    }),
    new PurgecssPlugin({
      paths: () => glob.sync(
        [`${PURGE_PATHS.packages}/**/*`, `${PURGE_PATHS.site}/**/*`],
        {
          nodir: true, ignore: '**/node_modules/**/*'
        }
      )
    }),
    new CssMinimizerPlugin({})
  ],
  output: {
    filename: '[name]/js/[name].[contenthash].js'
  }
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

merged.module.rules.filter(o => Boolean(o.use)).filter(o => o.use.includes('css-loader'))[0].use.unshift(mini)
merged.module.rules = rules.concat(merged.module.rules)
module.exports = merged
