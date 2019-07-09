'use strict'
const baseWebpackConfig = require('./webpack.base.conf')
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const webpackConfig = merge(baseWebpackConfig, {
  entry: {
    'my-fetch': './lib/index.js'
  },
  plugins: [
    // new UglifyJsPlugin({
    //   uglifyOptions: {
    //     compress: {
    //       warnings: false
    //     }
    //   },
    //   parallel: true
    // })
  ]
})

module.exports = webpackConfig