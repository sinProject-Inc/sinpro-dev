import { get, type Writable } from 'svelte/store'
import { expect, test } from 'vitest'
import { current_page_category, current_page_title } from './current_page_store'

type Spec<T> = {
	name: string
	store: Writable<T>
	initial: T
	expected: T
}

const specs: Spec<string>[] = [
	{ name: 'title', store: current_page_title, initial: '', expected: 'Home' },
	{ name: 'category', store: current_page_category, initial: '', expected: 'dev' },
]

test.each(specs)('get($name) -> $expected', (spec) => {
	const { store, initial, expected } = spec

	expect(get(store)).toBe(initial)

	store.set(expected)
	expect(get(store)).toBe(expected)
})
