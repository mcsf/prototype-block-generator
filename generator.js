const API = {
	"wp.rich": "wp.blockEditor.RichText",
	"wp.plain": "wp.blockEditor.PlainText",
}

const toSaveFunction = ({ type, props, children }) => `
	(({ attributes }) => ${toCode({ type, props, children })})`

const toCode = ({ type, props, children }) =>
	`el(${toComponent(type)}, ${toAttrs(Object(props))}, ${
		children.map(
			c => typeof c === 'string' ? toText(c) : toCode(c)
		).join(', ')
	})`

const toComponent = type =>
	API.hasOwnProperty(type) ? API[type] : `"${type}"`

const toAttrs = obj => [
	'{',
	Object.entries(mapValues(toAttr, obj))
		.map(([k, v]) => `"${k}": ${v}`).join(', '),
	'}',
].join('')

// Escapes attributes while interpolating fragments in the "{data}" format.
const toAttr = val =>
	JSON.stringify(val.replace(/{([A-z0-9_]+)}/g, '${attributes.$1}'))
		.replace(/`/g, "\\`")
		.replace(/^"/, "`")
		.replace(/"$/, "`")

// Escapes text fragments while interpolating fragments in the "{{data}}" format.
const toText = val =>
	JSON.stringify(val.replace(/{{([A-z0-9_]+)}}/g, '${attributes.$1}'))
	.replace(/`/g, "\\`")
	.replace(/^"/, "`")
	.replace(/"$/, "`")

// Similar to lodash.mapValues(obj, f).
const mapValues = (f, obj) =>
	Object.keys(obj).reduce((acc, k) => {
		acc[k] = f(obj[k])
		return acc
	}, {})

module.exports = { generate: toSaveFunction }
