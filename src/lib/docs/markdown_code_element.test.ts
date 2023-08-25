import { expect, test } from 'vitest'
import { MarkdownCodeElement } from './markdown_code_element'

type Params = [string, string, string, string]

const normal_params: Params = ['javascript', 'path/to/file.js', 'Test Title', 'console.log("test")']
const no_path_params: Params = ['javascript', '', 'Test Title', 'console.log("test")']
const talk_file_params: Params = ['ts', '[talk]vite.config.js', '', 'console.log("test")']
const bash_params: Params = ['bash', '', '', 'console.log("test")']
const unknown_params: Params = ['', '', '', 'console.log("test")']

function generate_html(params: Params): string {
	return new MarkdownCodeElement(...params).generate()
}

function expect_to_contain(
	html: string,
	expected_items: string[],
	not_expected_items: string[] = []
): void {
	expected_items.forEach((expected) => expect(html).toContain(expected))
	not_expected_items.forEach((not_expected) => expect(html).not.toContain(not_expected))
}

test('MarkdownCodeElement generates correct title element', async () => {
	expect_to_contain(generate_html(normal_params), ['Test Title', 'path/to/file.js'])
})

test('MarkdownCodeElement generates correct code content', async () => {
	expect_to_contain(generate_html(normal_params), ['console.log("test")'])
})

test('MarkdownCodeElement handles missing filename', async () => {
	expect_to_contain(generate_html(no_path_params), ['Test Title'], ['path/to/file.js'])
})

test('talk link', async () => {
	expect_to_contain(generate_html(talk_file_params), [
		'[talk]vite.config.js',
		'https://github.com/sinProject-Inc/talk/blob/main/vite.config.js',
	])
})

test('talk link', async () => {
	expect(generate_html(bash_params)).toContain('Bash')
})

test('unknown language', async () => {
	expect(generate_html(unknown_params)).toContain('UNKNOWN')
})
