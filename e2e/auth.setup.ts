import { expect, test as setup } from '@playwright/test'
import { sleep } from '../src/lib/general/system.js'
import { get_pin_code_from_mail } from './lib/get_pin_code_from_mail.js'
import { auth_file_path } from './lib/setup.js'
import { promises as fs } from 'fs'

setup('sign in', async ({ page }) => {
	setup.setTimeout(20 * 1000)

	try {
		await fs.access(auth_file_path, fs.constants.F_OK)
		return
	} catch {
		// DO NEXT
	}

	await page.goto('/sign-in')

	const gmail_user = process.env.GMAIL_USER ?? ''

	expect(gmail_user).toEqual('iam.o.sin@gmail.com')

	await page.getByPlaceholder('Enter email').fill(gmail_user)
	await page.getByRole('button', { name: 'Continue' }).click()
	await page.waitForURL(/\/pin-code/)

	await expect(page).toHaveTitle('Talk - PIN code')

	await sleep(process.env.CI ? 5000 : 1000)

	const pin_code = await get_pin_code_from_mail()

	expect(pin_code).toMatch(/^\d{6}$/)

	await page.getByPlaceholder('PIN code').fill(pin_code)
	await page.getByRole('button', { name: 'Submit' }).click()
	await page.waitForURL(/\/$/)

	await expect(page).toHaveTitle('Talk')

	await page.context().storageState({ path: auth_file_path })
})
