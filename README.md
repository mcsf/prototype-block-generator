## Background

* [Blocky](https://github.com/youknowriad/blocky)
* [WPTavern: Block development as a templating system?](https://wptavern.com/a-world-where-some-block-development-is-merely-a-templating-system-with-no-build-process)

## Try it

```sh
npm i
npm test
```

## Architecture

* `parser` uses [HTM](https://www.npmjs.com/package/htm) to parse JSX-like input into a workable element tree. However, since HTM operates on template strings and we need `parse` to work on plain strings, we also dangerously use `eval` to "hydrate" these templates.

* `generator` operates on `parser`'s element tree to generate Gutenberg code as a plain string.

* `evaluator` turns string-based generated code into a usable Preact component. This isn't strictly needed for a simple JSON-to-JS code generator, but is useful for testing the generator. This piece also relies on `eval`. It assumes that the only environmental requirements to evaluate generated block code are Preact and WP primitives, so it requires those modules before calling `eval`.

## Caveats

* `eval` is recklessly used. Consider switching to a sandboxed alternative (e.g. safeEval).
* Poorly tested, naively approached.
* _feel free to expand_
