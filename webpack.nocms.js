const dev = require('./webpack.dev')

delete dev.entry.cms
module.exports = dev
