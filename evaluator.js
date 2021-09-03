const { h: el } = require('preact')
const wp = require('./fixtures/wp')

const evaluate = codeStr => eval(codeStr)

module.exports = { evaluate }
