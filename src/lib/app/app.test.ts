import { expect, test } from 'vitest'
import { App } from './app'

test('get_page_title', async () => {
	expect(App.get_page_title('Home')).toBe('Home - sinpro.dev')
})

test('get_docs_title', async () => {
	expect(App.get_docs_title('Home')).toBe('Home - sinpro.dev')
})
