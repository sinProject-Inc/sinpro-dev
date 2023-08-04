import { base } from '$app/paths'
import { Markdown, type Page, type Section } from '$lib/docs/markdown'
import fs from 'fs'
import type { LayoutServerLoad } from './$types'

const docs_base_dir = Markdown.docs_base_dir
const pattern = /^\d\d-/

async function get_page(file_path: string): Promise<Page> {
	const page = await Markdown.read_file(file_path)
	const file = file_path.split('/').pop()
	const slug = file?.slice(3, -3)

	return {
		title: page.title,
		path: `${base}/docs/${slug}`,
	}
}

async function get_pages(sub_dir_path: string): Promise<Page[]> {
	const pages: Page[] = []

	for (const file of fs.readdirSync(sub_dir_path)) {
		if (!pattern.test(file)) continue

		const file_path = `${sub_dir_path}/${file}`
		const page = await get_page(file_path)

		pages.push(page)
	}

	return pages
}

async function get_section(sub_dir_path: string): Promise<Section> {
	const title = await Markdown.get_section_title(sub_dir_path)
	const pages = await get_pages(sub_dir_path)

	return {
		title,
		pages,
	}
}

export const load: LayoutServerLoad = async () => {
	const sections: Section[] = []

	for (const sub_dir of fs.readdirSync(docs_base_dir)) {
		const sub_dir_path = `${docs_base_dir}/${sub_dir}`

		if (!fs.statSync(sub_dir_path).isDirectory()) continue
		if (!pattern.test(sub_dir)) return

		const section = await get_section(sub_dir_path)

		sections.push(section)
	}

	return { sections }
}
