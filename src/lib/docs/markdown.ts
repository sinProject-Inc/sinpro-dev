import fs from 'fs'
import matter from 'gray-matter'
import { JSDOM } from 'jsdom'
import MarkdownIt from 'markdown-it'
// import mdHighlightjs from 'markdown-it-highlightjs'
import MarkdownItLinkAttributes from 'markdown-it-link-attributes'
import hljs from 'highlight.js'
import { MarkdownCodeElement } from './markdown_code_element'

export type Page = {
	title: string
	path: string
}

export type Section = {
	title: string
	pages: Page[]
}

export type PageSection = {
	level: number
	title: string
	slug: string
}

export class Markdown {
	public static docs_base_dir = './docs'

	public static async read_file(file_path: string): Promise<{
		title: string
		description: string
		content: string
	}> {
		const file_content = await fs.promises.readFile(file_path, 'utf8')
		const { data: metadata, content } = matter(file_content)
		const { title, description } = metadata

		return { title, description, content }
	}

	private static _generate_slug(content: string): string {
		return content
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/(^-|-$)+/g, '')
	}

	private static _generate_link_element(
		document: Document,
		title: string,
		slug: string
	): HTMLAnchorElement {
		const anchor_element = document.createElement('a')

		anchor_element.href = `#${slug}`
		anchor_element.innerHTML = '#'
		anchor_element.classList.add('permalink')
		anchor_element.title = title

		anchor_element.innerHTML =
			'<div><svg width="12" height="12" fill="none" aria-hidden="true"><path d="M3.75 1v10M8.25 1v10M1 3.75h10M1 8.25h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg></div>'

		return anchor_element
	}

	private static _setup_heading(
		document: Document,
		heading: Element,
		title: string,
		slug: string
	): void {
		heading.classList.add('relative')
		heading.classList.add('section')
		heading.classList.add('slide-fade-in')

		heading.id = slug

		const anchor_element = Markdown._generate_link_element(document, title, slug)

		heading.appendChild(anchor_element)
	}

	private static _generate_section(heading: Element, title: string, slug: string): PageSection {
		const level = parseInt(heading.tagName[1] ?? '7')

		return { level, title, slug }
	}

	private static _generate_sections(source_html_content: string): {
		sections: PageSection[]
		html_content: string
	} {
		const jsdom = new JSDOM(source_html_content)
		const document = jsdom.window.document
		const headings = document.querySelectorAll('h2, h3, h4, h5, h6')
		const sections: PageSection[] = []

		headings.forEach((heading) => {
			const { textContent: title } = heading

			if (!title) return

			const slug = Markdown._generate_slug(title)
			const section = Markdown._generate_section(heading, title, slug)

			sections.push(section)
			Markdown._setup_heading(document, heading, title, slug)
		})

		const html_content = document.body.innerHTML

		return { sections, html_content }
	}

	private static _highlighted_code(md: MarkdownIt, lang: string, content: string): string {
		if (lang && hljs.getLanguage(lang)) {
			try {
				return hljs.highlight(content, { language: lang }).value
			} catch (__) {
				// DO NOTHING
			}
		}

		return md.utils.escapeHtml(content)
	}

	private static _code_block_name_plugin(md: MarkdownIt): void {
		// md.set({
		// 	highlight: function (str: string, lang: string) {
		// 		if (lang && hljs.getLanguage(lang)) {
		// 			try {
		// 				return hljs.highlight(str, { language: lang }).value
		// 			} catch (__) {
		// 				// DO NOTHING
		// 			}
		// 		}

		// 		return '' // use external default escaping
		// 	},
		// })

		md.renderer.rules.fence = function (tokens, idx): string {
			const token = tokens[idx]

			if (!token) throw new Error('Invalid token')

			const [lang_temp, filename_temp, title_temp] = (token.info ?? '').split(':')

			const lang = lang_temp ?? ''
			const filename = filename_temp ?? ''
			const title = title_temp ?? ''
			const content = token?.content ?? ''

			const highlighted_code = Markdown._highlighted_code(md, lang, content)

			return new MarkdownCodeElement(lang, filename, title, highlighted_code).generate()
		}
	}

	private static _github_icon = `
			<svg
				xmlns="http://www.w3.org/2000/svg"
					class="icon icon-tabler icon-tabler-brand-github"
					style="width: 24px; height: 24px; stroke: currentColor; fill: none; margin-right: 4px; margin-bottom: 2px;"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path
							d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"
							fill="none"
					/>
				</svg>
			`

	private static _right_arrow = `
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 6" aria-hidden="true"
				class="icon icon-tabler icon-tabler-brand-github-filled"
				style="width: 8px; height: 8px; stroke: currentColor; fill: none; margin-left: 8px; margin-bottom: 6px;"
				width="8"
				height="8">
				<path d="M0 0L3 3L0 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
			</svg>
		`

	private static _github_link_plugin(md: MarkdownIt): void {
		md.renderer.rules.text = function (tokens, idx): string {
			const token = tokens[idx]

			if (!token) throw new Error('Invalid token')

			const text = md.utils.escapeHtml(token.content)

			let string_after_render = text

			if (text.includes('on GitHub &gt;')) {
				const cut_text = text.replace('on GitHub &gt;', '')

				string_after_render = `
					<div style="display: flex; flex-direction: row;">
						<div style="display: flex; align-items: end;">
							${Markdown._github_icon}
							${cut_text}
							${Markdown._right_arrow}
						</div>
					</div>
				`
			}

			return string_after_render
		}
	}

	public static async generate_page_content(file_path: string): Promise<{
		title: string
		description: string
		html_content: string
		sections: PageSection[]
	}> {
		const { title, description, content } = await this.read_file(file_path)

		const md = new MarkdownIt({ html: true, breaks: true, linkify: true, typographer: true })

		md.use(MarkdownItLinkAttributes, {
			matcher(href: string) {
				return href.startsWith('http')
			},
			attrs: {
				target: '_blank',
				rel: 'noopener, noreferrer',
			},
		})

		// md.use(mdHighlightjs)
		md.use(Markdown._code_block_name_plugin)
		md.use(Markdown._github_link_plugin)

		const source_html_content = md.render(content)
		const { sections, html_content } = this._generate_sections(source_html_content)

		return { title, description, html_content, sections }
	}

	public static async get_section_title(sub_dir_path: string): Promise<string> {
		const meta = JSON.parse(await fs.promises.readFile(`${sub_dir_path}/meta.json`, 'utf8'))

		return meta.title
	}
}
