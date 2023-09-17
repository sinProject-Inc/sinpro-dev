import { expect, test } from 'vitest'
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

test.each(specs)('generate_page_content($name)', async (spec) => {
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

test.each(section_specs)('generate_section_content($path) -> $name', async (spec) => {
	const { name, path } = spec
	const result = await Markdown.get_section_title(path)

	expect(result).toBe(name)
})
