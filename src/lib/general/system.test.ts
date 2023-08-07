import { expect, test } from 'vitest'
import { sleep } from './system'

test('delays for the correct amount of time', async () => {
	const start_time = Date.now()
	await sleep(1000)
	const end_time = Date.now()

	expect(end_time - start_time).toBeCloseTo(1000, -2)
})
