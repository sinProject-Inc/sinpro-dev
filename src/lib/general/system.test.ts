import { expect, it } from 'vitest'
import { sleep } from './system'

type Spec = {
	milliseconds: number
}

const specs: Spec[] = [{ milliseconds: 10 }, { milliseconds: 100 }, { milliseconds: 500 }]

it.each(specs)('sleep($milliseconds)', async (spec) => {
	const { milliseconds } = spec

	const start_time = Date.now()

	await sleep(milliseconds)

	const end_time = Date.now()

	expect(end_time - start_time).toBeCloseTo(milliseconds, -2)
})
