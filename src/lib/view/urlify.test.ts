import { expect, it } from 'vitest'
import { Urlify } from './urlify'

type EscapeSpec = {
	name: string
	input: string
	expected: string
}

const escape_specs: EscapeSpec[] = [
	{ name: 'empty', input: '', expected: '' },
	{ name: 'text', input: 'text', expected: 'text' },
	{ name: 'special characters', input: '& < > " \'', expected: '&amp; &lt; &gt; &quot; &#039;' },
]

it.each(escape_specs)('Urlify._escape_html($input) -> $expected', (spec) => {
	const { input, expected } = spec
	const urlify = new Urlify(input)

	expect(urlify['_escape_html']()).toBe(expected)
})

type ReplaceSpec = {
	name: string
	input: string
	expected: string
}

const replace_specs: ReplaceSpec[] = [
	{ name: 'empty', input: '', expected: '' },
	{ name: 'text', input: 'text', expected: 'text' },
	{
		name: 'url',
		input: 'https://example.com',
		expected:
			'<a href="https://example.com" target="_blank" rel="noopener noreferrer">https://example.com</a>',
	},
	{
		name: 'url with text',
		input: 'Visit https://example.com',
		expected:
			'Visit <a href="https://example.com" target="_blank" rel="noopener noreferrer">https://example.com</a>',
	},
	{
		name: 'url without protocol',
		input: 'Visit www.example.com',
		expected:
			'Visit <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">www.example.com</a>',
	},
	// {
	// 	name: 'url without "www."',
	// 	input: 'Visit example.com',
	// 	expected:
	// 		'Visit <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">example.com</a>',
	// },
]

it.each(replace_specs)('Urlify.replace($input) -> $expected', (spec) => {
	const { input, expected } = spec
	const urlify = new Urlify(input)

	expect(urlify.replace()).toBe(expected)
})
