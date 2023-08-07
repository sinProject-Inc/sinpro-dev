import { test, expect, Page } from '@playwright/test'

const docs_base = './docs'

async function to_have_title(page: Page, title: string): Promise<void> {
	await expect(page).toHaveTitle(`${title} - sinpro.dev`)
}

test.beforeEach(async ({ page }) => {
	await page.goto(docs_base, { waitUntil: 'load' })
	await to_have_title(page, 'Portfolio')
})

test('access a page', async ({ page }) => {
	await page.goto(`${docs_base}/about`, { waitUntil: 'load' })
	await to_have_title(page, 'About')
})

test('open search modale with keyboard shortcut', async ({ page }) => {
	await page.waitForTimeout(500)

	await page.keyboard.press('Control+KeyK')

	const search_modale = page.getByTestId('search-modale')

	await expect(search_modale).toBeVisible()
})

test('close search modale with keyboard shortcut', async ({ page }) => {
	await page.waitForTimeout(500)

	await page.keyboard.press('Control+KeyK')

	const search_modale = page.getByTestId('search-modale')

	await expect(search_modale).toBeVisible()

	await page.keyboard.press('Control+KeyK')

	await expect(search_modale).not.toBeVisible()
})

test('open search modale with navbar button', async ({ page }) => {
	page.setViewportSize({ width: 480, height: 600 })

	await page.waitForTimeout(500)

	const search_button = page.getByTestId('navbar-search-button')
	await search_button.click()

	const search_modale = page.getByTestId('search-modale')

	await expect(search_modale).toBeVisible()
})

test('copy code', async ({ page }) => {
	await page.goto(`${docs_base}/vscode-workspace-settings`, { waitUntil: 'load' })
	await page.getByTestId('copy-code').first().click()

	expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('"editor.tabSize": 2')
})
