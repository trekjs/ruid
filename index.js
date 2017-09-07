/*!
 * ruid
 * Copyright(c) 2017 Fangdun Cai
 * MIT Licensed
 */

'use strict'

const { randomBytes } = require('crypto')

const PLUS = /\+/g
const SLASH = /\//g
const EQUAL = new RegExp('=', 'g')

module.exports = ruid

// https://www.npmjs.com/package/uid-safe
// https://github.com/zeit/uid-promise
function ruid(len = 24, time = true, encoding = 'base64') {
  return new Promise((resolve, reject) => {
    randomBytes(len, (err, buf) => {
      if (err) return reject(err)
      resolve(escape(buf.toString(encoding)) + (time ? now().toString(36) : ''))
    })
  })
}

// https://www.npmjs.com/package/uniqid
function now() {
  const time = Date.now()
  const last = now.last || time
  now.last = time > last ? time : last + 1
  return now.last
}

// https://en.wikipedia.org/wiki/Base64#RFC_4648
// https://github.com/joaquimserafim/base64-url/blob/master/index.js#L11
function escape(str) {
  return str
    .replace(PLUS, '-')
    .replace(SLASH, '_')
    .replace(EQUAL, '')
}
