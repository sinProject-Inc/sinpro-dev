import { get, type Writable } from 'svelte/store'
import { expect, test } from 'vitest'
import { current_page_category, current_page_title } from './current_page_store'

function test_store<T>(store: Writable<T>, initial_value: T, test_value: T): void {
	expect(get(store)).toBe(initial_value)

	store.set(test_value)
	expect(get(store)).toBe(test_value)
}

const tests = [
	{ name: 'title', store: current_page_title, initial_value: '', test_value: 'Home' },
	{ name: 'category', store: current_page_category, initial_value: '', test_value: 'dev' },
]

tests.forEach(({ name, store, initial_value, test_value }) => {
	test(`${name}`, () => {
		test_store(store, initial_value, test_value)
	})
})
