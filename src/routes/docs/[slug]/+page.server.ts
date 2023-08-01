import { error } from '@sveltejs/kit'
import fs from 'fs'
import type { PageServerLoad } from './$types'
import { Markdown, type PageSection } from '$lib/docs/markdown'

const docs_base_dir = Markdown.docs_base_dir

type LoadedFile = {
	category: string
	file_path: string
	page: {
		title: string
		description: string
		html_content: string
		sections: PageSection[]
	}
}

function find_matching_file(sub_dir_path: string, slug: string): string | undefined {
	return fs.readdirSync(sub_dir_path).find((file) => file.slice(3, -3) === slug)
}

function load_file(sub_dir: string, slug: string): LoadedFile | undefined {
	const sub_dir_path = `${docs_base_dir}/${sub_dir}`

	if (!fs.statSync(sub_dir_path).isDirectory()) return

	const matching_file = find_matching_file(sub_dir_path, slug)

	if (!matching_file) return

	const category = Markdown.get_section_title(sub_dir_path)
	const file_path = `${sub_dir_path}/${matching_file}`
	const page = Markdown.generate_page_content(file_path)

	return { category, file_path, page }
}

export const load: PageServerLoad = async ({ params }) => {
	for (const sub_dir of fs.readdirSync(docs_base_dir)) {
		const result = load_file(sub_dir, params.slug)
		if (result) return result
	}

	throw error(404)
}
