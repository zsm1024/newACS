'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://devgateway.gwmfc.com/"'
  //BASE_API: '"http://192.168.2.127:10002"'
  // BASE_API: '"http://192.168.2.98:5003"',
})
