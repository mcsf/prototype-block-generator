const path = require('path')
const fs = require('fs')
const { h: el } = require('preact')
const { render } = require('preact-render-to-string')

const { parse, generate, evaluate } = require('./index')

const props = Object.freeze({
	attributes: {
		content: 'I AM CONTENT',
		level: 'I AM LEVEL',
	}
})

for (const dir of fs.readdirSync('./examples')) {
	const [ input, expected ] = [ 'input','expected' ].map(filename =>
		fs.readFileSync(path.join('examples', dir, filename)).toString().trim()
	)

	// Compute HTM-powered element inputTree.
	const inputTree = parse(input)

	// Generate string representing the body of a Gutenberg save function.
	const generatedCode = generate(inputTree)

	// Evaluate that generated code into a usable Preact saveComponent.
	const saveComponent = evaluate(generatedCode)

	// Serialise dummy data.
	const actual = render(el(saveComponent, props), {}, {pretty: true})

	if (actual === expected) {
		console.log(path.join('examples', dir), 'OK')
	} else {
		console.log(path.join('examples', dir), 'FAIL')
		console.log(actual)
		console.log(expected)
		console.log()
	}
}
