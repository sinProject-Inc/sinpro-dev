import { test, expect, Page } from '@playwright/test'

const host = 'http://localhost:5173'
const path = '/chat'
const url = `${host}${path}`

test.beforeEach(async ({ page }) => {
	await page.goto(url)
})

test('has title', async ({ page }) => {
	await expect(page).toHaveTitle('Talk - Chat')
})

test('has page title', async ({ page }) => {
	const title = page.getByRole('link', { name: 'Talk', exact: true })
	await expect(title).toBeVisible()
})

test('change locale', async ({ page }) => {
	await page.getByRole('combobox').selectOption('ja-JP')

	const title = page.getByRole('link', { name: 'トーク', exact: true })
	await expect(title).toBeVisible()
})

test('init focus', async ({ page }) => {
	const name = page.getByPlaceholder('Name')
	await expect(name).toBeFocused()
})

test('on enter name', async ({ page }) => {
	const name = page.getByPlaceholder('Name')

	await name.click()
	await name.press('Enter')
	await expect(name).toBeFocused()
})

test('on enter name after filling', async ({ page }) => {
	const name = page.getByPlaceholder('Name')

	await name.click()
	await name.fill('aaaaa')
	await name.press('Enter')

	const text = page.getByPlaceholder('Enter new text')

	await expect(text).toBeFocused()
})

test('send message', async ({ page }) => {
	const name = page.getByPlaceholder('Name')
	const text = page.getByPlaceholder('Enter new text')

	await expect(name).toBeFocused()

	await name.fill('aaaaa')
	await name.press('Enter')

	await expect(text).toBeFocused()

	await text.fill('abcde')
	await text.press('Enter')

	const chat_name = page.getByTestId('chat_name').first()
	const chat_message = page.getByTestId('chat_message').first()

	await expect(chat_name).toHaveText('aaaaa')
	await expect(chat_message).toHaveText('abcde')
})