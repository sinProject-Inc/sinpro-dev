import { expect, it } from 'vitest'
import { MarkdownCodeElement } from './markdown_code_element'

type Spec = {
	name: string
	language: string
	path: string
	title: string
	content: string
	expected: string[]
}

const specs: Spec[] = [
	{
		name: 'normal',
		language: 'javascript',
		path: 'path/to/file.js',
		title: 'Test Title',
		content: 'console.log("test")',
		expected: ['Test Title', 'path/to/file.js', 'console.log("test")'],
	},
	{
		name: 'no path',
		language: 'javascript',
		path: '',
		title: 'Test Title',
		content: 'console.log("test")',
		expected: ['Test Title', 'console.log("test")'],
	},
	{
		name: 'talk file',
		language: 'ts',
		path: '[talk]vite.config.js',
		title: '',
		content: 'console.log("test")',
		expected: [
			'https://github.com/sinProject-Inc/talk/blob/main/vite.config.js',
			'console.log("test")',
		],
	},
	{
		name: 'bash',
		language: 'bash',
		path: '',
		title: '',
		content: 'console.log("test")',
		expected: ['Bash', 'console.log("test")'],
	},
	{
		name: 'unknown',
		language: '',
		path: '',
		title: '',
		content: 'console.log("test")',
		expected: ['UNKNOWN', 'console.log("test")'],
	},
]

it.each(specs)(
	'name: $name, language: $language, path: $path, title: $title, content: $content -> $expected',
	(spec) => {
		const { language, path, title, content, expected } = spec
		const generated_html = new MarkdownCodeElement(language, path, title, content).generate()

		expected.forEach((expected_item) => expect(generated_html).toContain(expected_item))
	}
)
