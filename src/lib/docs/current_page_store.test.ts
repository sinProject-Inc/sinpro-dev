import { get, type Writable } from 'svelte/store'
import { expect, test } from 'vitest'
import { current_page_category, current_page_title } from './current_page_store'

type Test<T> = {
	name: string
	store: Writable<T>
	initial_value: T
	test_value: T
}

function test_store<T>({ name, store, initial_value, test_value }: Test<T>): void {
	test(`${name} should be set correctly`, () => {
		expect(get(store)).toBe(initial_value)

		store.set(test_value)
		expect(get(store)).toBe(test_value)
	})
}

const tests: Test<string>[] = [
	{ name: 'title', store: current_page_title, initial_value: '', test_value: 'Home' },
	{ name: 'category', store: current_page_category, initial_value: '', test_value: 'dev' },
]

tests.forEach(test_store)
