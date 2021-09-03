const htm = require('htm')

const h = (type, props, ...children) => ({ type, props, children })
const html = htm.bind(h)

const parse = rawStr =>
	eval('html`' + rawStr.replace(/`/g, "\\`") + '`')

module.exports = { parse }
