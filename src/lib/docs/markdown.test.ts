import { expect, test } from 'vitest'
import { Markdown } from './markdown'

test('read_file', async () => {
	const result = await Markdown.read_file('./docs/10-company-information/20-about.md')

	expect(result.title).toBe('About')

	expect(result.description).toBe(
		'sinProject Inc. is an software development company in Osaka, Japan. We primarily use SvelteKit and TypeScript, but also work with other programming languages and frameworks.'
	)

	expect(result.content).toContain('sinYa Iwasaki')
})

test('generate_page_content', async () => {
	const result = await Markdown.generate_page_content('./docs/10-company-information/20-about.md')

	expect(result.title).toBe('About')

	expect(result.description).toBe(
		'sinProject Inc. is an software development company in Osaka, Japan. We primarily use SvelteKit and TypeScript, but also work with other programming languages and frameworks.'
	)

	expect(result.html_content).toContain(
		'<a href="https://twitter.com/iam_o_sin" target="_blank" rel="noopener, noreferrer">Twitter</a>'
	)

	expect(result.sections[2].title).toBe('sinYa Iwasaki')
})

test('get_section_title', async () => {
	const result = await Markdown.get_section_title('./docs/10-company-information')

	expect(result).toBe('Company Information')
})

test('markdown title', async () => {
	const result = await Markdown.generate_page_content('./src/lib/docs/markdown.test.md')

	expect(result.title).toBe('Test')
})
