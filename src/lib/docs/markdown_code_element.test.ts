import { expect, test } from 'vitest'
import { MarkdownCodeElement } from './markdown_code_element'

test('MarkdownCodeElement generates correct title element', async () => {
	const markdown_element = new MarkdownCodeElement(
		'javascript',
		'path/to/file.js',
		'Test Title',
		'console.log("test")'
	)

	const generated_element = markdown_element.generate()

	expect(generated_element).toContain('Test Title')
	expect(generated_element).toContain('path/to/file.js')
})

test('MarkdownCodeElement generates correct code content', async () => {
	const markdown_element = new MarkdownCodeElement(
		'javascript',
		'path/to/file.js',
		'Test Title',
		'console.log("test")'
	)

	const generated_element = markdown_element.generate()

	expect(generated_element).toContain('console.log("test")')
})

test('MarkdownCodeElement handles missing filename', async () => {
	const markdown_element = new MarkdownCodeElement(
		'javascript',
		'',
		'Test Title',
		'console.log("test")'
	)

	const generated_element = markdown_element.generate()

	expect(generated_element).toContain('Test Title')
	expect(generated_element).not.toContain('path/to/file.js')
})

test('talk link', async () => {
	const markdown_element = new MarkdownCodeElement(
		'ts',
		'[talk]vite.config.js',
		'',
		'console.log("test")'
	)

	const generated_element = markdown_element.generate()

	expect(generated_element).toContain('[talk]vite.config.js')
	expect(generated_element).toContain(
		'https://github.com/sinProject-Inc/talk/blob/main/vite.config.js'
	)
})

test('talk link', async () => {
	const markdown_element = new MarkdownCodeElement('bash', '', '', 'console.log("test")')

	const generated_element = markdown_element.generate()

	expect(generated_element).toContain('Bash')
})

test('unknown language', async () => {
	const markdown_element = new MarkdownCodeElement('', '', '', 'console.log("test")')

	const generated_element = markdown_element.generate()

	expect(generated_element).toContain('UNKNOWN')
})
