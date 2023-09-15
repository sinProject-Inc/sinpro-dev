import { expect, test } from 'vitest'
import { App } from './app'

type Spec = {
	name: string
	func: (value: string) => string
	input: string
	expected: string
}

const specs: Spec[] = [
	{ name: 'page', func: App.get_page_title, input: 'Home', expected: 'Home - sinpro.dev' },
	{ name: 'docs', func: App.get_docs_title, input: 'Home', expected: 'Home - sinpro.dev' },
]

test.each(specs)('App.get_{$name}_title($input) -> $expected', (spec) => {
	const { func, input, expected } = spec

	expect(func(input)).toBe(expected)
})
