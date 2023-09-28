/* eslint-disable no-console */
import fs from 'fs'
import * as glob from 'glob'
import matter from 'gray-matter'
import prettier from 'prettier'
import removeMd from 'remove-markdown'
import { Markdown } from './markdown'

export type MarkdownData = {
	path: string
	title: string
	description: string
	heading: string
	content: string
}

export class SearchIndex {
	public constructor(private readonly _markdown_dir: string) {}

	private async _load_markdown_files(): Promise<MarkdownData[]> {
		const markdown_file_paths = glob.sync(`${this._markdown_dir}/**/*.md`)

		const markdown_data = markdown_file_paths.flatMap(async (file_path) => {
			const file_content = await fs.promises.readFile(file_path, 'utf8')
			const { data: metadata, content } = matter(file_content)
			const { title, description } = metadata

			const file = file_path.split(/[/\\]/).pop()

			if (!file) throw new Error('File path is invalid')

			const slug = file.slice(3, -3)

			const contents = content.split(/\n## /)
			const contents_with_headings = contents.map((content_part, index) => {
				const heading = index !== 0 ? content_part.split('\n')[0] : ''

				if (!heading) throw new Error('Heading is invalid')

				const content_without_heading =
					index !== 0 ? content_part.slice(heading.length) : content_part
				const slug_heading = heading
					.toLowerCase()
					.replace(/[^a-z0-9]+/g, '-')
					.replace(/(^-|-$)+/g, '')

				return {
					path: index === 0 ? slug : `${slug}#${slug_heading}`,
					title,
					description: description ?? '',
					content: content_without_heading,
					heading,
				}
			})

			const standalone_headings = contents_with_headings.map(({ path, heading }) => ({
				path,
				title,
				description: '',
				heading,
				content: heading,
			}))

			const standalone_title = [
				{
					path: slug,
					title,
					description: '',
					heading: '',
					content: title,
				},
			]

			return [...contents_with_headings, ...standalone_headings, ...standalone_title]
		})

		return (await Promise.all(markdown_data)).flat()
	}

	public async save(): Promise<void> {
		const documents = await this._load_markdown_files()

		const documents_without_markdown = this._remove_markdown(documents)

		const serialized_search_index = JSON.stringify(documents_without_markdown)
		const formatted_search_index = await prettier.format(serialized_search_index, {
			parser: 'json',
		})

		fs.writeFileSync(`./src/lib/assets/search_index.json`, formatted_search_index)
	}

	private _remove_markdown(content: MarkdownData[]): MarkdownData[] {
		return content.map((item) => {
			return {
				...item,
				content: removeMd(item.content),
				heading: removeMd(item.heading),
			}
		})
	}
}

const search_index = new SearchIndex(Markdown.docs_base_dir)

await search_index.save()
