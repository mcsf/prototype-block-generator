const el = require('preact').h

module.exports = {
	blockEditor: {
		PlainText: (props) =>
			el('textarea', {},
				'I am a fake PlainText component with the following props:',
				el('ul', {}, ...Object.entries(props).map(([k, v]) =>
					el('li', {}, k, ': ', v)))
			),
		RichText: (props) =>
			el('textarea', {},
				'I am a fake RichText component with the following props:',
				el('ul', {}, ...Object.entries(props).map(([k, v]) =>
					el('li', {}, k, ': ', v)))
			)
	},
}
