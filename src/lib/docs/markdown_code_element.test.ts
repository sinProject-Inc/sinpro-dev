import { expect, test } from 'vitest'
import { MarkdownCodeElement } from './markdown_code_element'

type Params = [string, string, string, string]

const normal_params: Params = ['javascript', 'path/to/file.js', 'Test Title', 'console.log("test")']
const no_path_params: Params = ['javascript', '', 'Test Title', 'console.log("test")']
const talk_file_params: Params = ['ts', '[talk]vite.config.js', '', 'console.log("test")']
const bash_params: Params = ['bash', '', '', 'console.log("test")']
const unknown_params: Params = ['', '', '', 'console.log("test")']

test('MarkdownCodeElement generates correct title element', async () => {
	const html = new MarkdownCodeElement(...normal_params).generate()

	expect(html).toContain('Test Title')
	expect(html).toContain('path/to/file.js')
})

test('MarkdownCodeElement generates correct code content', async () => {
	const html = new MarkdownCodeElement(...normal_params).generate()

	expect(html).toContain('console.log("test")')
})

test('MarkdownCodeElement handles missing filename', async () => {
	const html = new MarkdownCodeElement(...no_path_params).generate()

	expect(html).toContain('Test Title')
	expect(html).not.toContain('path/to/file.js')
})

test('talk link', async () => {
	const html = new MarkdownCodeElement(...talk_file_params).generate()

	expect(html).toContain('[talk]vite.config.js')
	expect(html).toContain('https://github.com/sinProject-Inc/talk/blob/main/vite.config.js')
})

test('talk link', async () => {
	const html = new MarkdownCodeElement(...bash_params).generate()

	expect(html).toContain('Bash')
})

test('unknown language', async () => {
	const html = new MarkdownCodeElement(...unknown_params).generate()

	expect(html).toContain('UNKNOWN')
})
