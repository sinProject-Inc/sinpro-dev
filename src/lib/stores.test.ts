import { get } from 'svelte/store'
import { expect, test } from 'vitest'
import { is_min_width_768, mobile_menu_open } from './stores'

test('get(mobile_menu_open) -> false', () => {
	expect(get(mobile_menu_open)).toBe(false)
})

test('get(is_min_width_768) -> false', () => {
	expect(get(is_min_width_768)).toBe(false)
})

test('get(mobile_menu_open) -> true', () => {
	mobile_menu_open.set(true)
	expect(get(mobile_menu_open)).toBe(true)
})

test('get(is_min_width_768) -> true', () => {
	is_min_width_768.set(true)
	expect(get(is_min_width_768)).toBe(true)
})
