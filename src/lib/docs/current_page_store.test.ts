import { get } from 'svelte/store'
import { expect, test } from 'vitest'
import { current_page_category, current_page_title } from './current_page_store'

test('current_page_title', () => {
	expect(get(current_page_title)).toBe('')

	current_page_title.set('Home')
	expect(get(current_page_title)).toBe('Home')
})

test('current_page_category', () => {
	expect(get(current_page_category)).toBe('')

	current_page_category.set('dev')
	expect(get(current_page_category)).toBe('dev')
})
