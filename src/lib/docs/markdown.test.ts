import hljs from 'highlight.js'
import MarkdownIt from 'markdown-it'
import { describe, expect, it } from 'vitest'
import { Markdown } from './markdown'

type Spec = {
	name: string
	path: string
	description: string
	content?: string
}

const specs: Spec[] = [
	{
		name: 'About',
		path: './docs/10-company-information/20-about.md',
		description:
			'sinProject Inc. is an software development company in Osaka, Japan. We primarily use SvelteKit and TypeScript, but also work with other programming languages and frameworks.',
		content:
			'<a href="https://twitter.com/iam_o_sin" target="_blank" rel="noopener, noreferrer">Twitter</a>',
	},
	{
		name: 'Events',
		path: './docs/10-company-information/40-events.md',
		description: 'Here are some of the events organized by sinProject.',
		content: 'Types of projects that can be showcased include:',
	},
]

it.each(specs)('generate_page_content($name)', async (spec) => {
	const { name, path, description, content } = spec
	const result = await Markdown.generate_page_content(path)

	expect(result.title).toBe(name)
	expect(result.description).toBe(description)
	expect(result.html_content).toContain(content)
})

type SectionSpec = {
	name: string
	path: string
}

const section_specs: SectionSpec[] = [
	{
		name: 'Company Information',
		path: './docs/10-company-information',
	},
	{
		name: 'Dev Environment',
		path: './docs/20-dev-environment',
	},
]

it.each(section_specs)('generate_section_content($path) -> $name', async (spec) => {
	const { name, path } = spec
	const result = await Markdown.get_section_title(path)

	expect(result).toBe(name)
})

it('_highlighted_code', () => {
	const md = new MarkdownIt()
	const lang = 'ts'
	const code = 'const a = 1'
	const highlighted = Markdown['_highlighted_code'](md, lang, code)

	expect(highlighted).toBe(hljs.highlight(code, { language: lang }).value)
})

it('_highlighted_code error', () => {
	const md = new MarkdownIt()
	const lang = 'tss'
	const code = 'const a = 1'
	const highlighted = Markdown['_highlighted_code'](md, lang, code)

	expect(highlighted).toBe(code)
})

type GitHubLinkPluginSpec = {
	name: string
	text: string
	expected: string
}

const github_link_plugin_specs: GitHubLinkPluginSpec[] = [
	{
		name: 'GitHub',
		text: 'View this file on GitHub &gt; aaa',
		expected: 'View this file  aaa',
	},
	{
		name: 'Some random text',
		text: 'Some random text',
		expected: 'Some random text',
	},
	{
		name: 'invalid token',
		text: '',
		expected: '',
	},
]

it.each(github_link_plugin_specs)('Markdown._github_link_plugin $name', (spec) => {
	const { name, text, expected } = spec
	const md = new MarkdownIt()

	md.use(Markdown['_github_link_plugin'])

	if (name === 'invalid token') {
		// @ts-expect-error 2740
		expect(() => md.renderer.rules.text({}, {}, 0)).toThrowError('Invalid token')

		return
	}

	const result = md.render(text)

	expect(result).toContain(expected)
})

type FenceSpec = {
	name: string
	info: string
	expected_lang: string
	expected_filename: string
	expected_title: string
}

const fence_specs: FenceSpec[] = [
	{
		name: 'lang',
		info: 'js',
		expected_lang: 'js',
		expected_filename: '',
		expected_title: '',
	},
	{
		name: 'lang:filename',
		info: 'js:testFile.ts',
		expected_lang: 'js',
		expected_filename: 'testFile.ts',
		expected_title: '',
	},
	{
		name: 'lang:filename:title',
		info: 'js:testFile.ts:Test Title',
		expected_lang: 'js',
		expected_filename: 'testFile.ts',
		expected_title: 'Test Title',
	},
	{
		name: 'invalid token',
		info: '',
		expected_lang: '',
		expected_filename: '',
		expected_title: '',
	},
	{
		name: 'invalid info',
		info: '',
		expected_lang: '',
		expected_filename: '',
		expected_title: '',
	},
]

it.each(fence_specs)('Markdown._code_block_name_plugin $name', (spec) => {
	const { name, info, expected_lang, expected_filename, expected_title } = spec
	const md = new MarkdownIt()

	md.use(Markdown['_code_block_name_plugin'])

	const fence = md.renderer.rules.fence

	if (!fence) throw new Error('fence rule is not defined')

	if (name === 'invalid token') {
		// @ts-expect-error 2740
		expect(() => fence({}, 1)).toThrowError('Invalid token')

		return
	}

	if (name === 'invalid info') {
		const token = { content: '' }

		// @ts-expect-error 2740
		const result = fence([token], 0)

		expect(result).toContain('UNKNOWN')

		return
	}

	const token = { info, content: '' }

	// @ts-expect-error 2740
	const result = fence([token], 0)

	expect(result).toContain(`<code class="hljs ${expected_lang}">`)

	if (expected_filename) {
		expect(result).toContain(
			`href="https://github.com/sinProject-Inc/sinpro-dev/blob/main/${expected_filename}"`
		)
	}

	expect(result).toContain(expected_title)
})

it('should set level to 7 when tagName is not defined', () => {
	const heading = { tagName: '' } as Element
	const title = 'Test Title'
	const slug = 'test-slug'

	const result = Markdown['_generate_section'](heading, title, slug)

	expect(result).to.deep.equal({
		level: 7,
		title,
		slug,
	})
})

describe('', () => {
	// ... previous test case

	it('should ignore headings without a title', () => {
		const source_html_content = `
      <h2>Title 1</h2>
      <h3></h3>
      <h4>Title 3</h4>
      <h5></h5>
      <h6>Title 5</h6>
    `

		const expected_sections = [
			{ level: 2, title: 'Title 1', slug: 'title-1' },
			{ level: 4, title: 'Title 3', slug: 'title-3' },
			{ level: 6, title: 'Title 5', slug: 'title-5' },
		]

		const result = Markdown['_generate_sections'](source_html_content)

		expect(result.sections).toEqual(expected_sections)
	})
})
