import { expect, test } from 'vitest'
import { FormattedDate } from './formatted_date'

type Spec = {
	input: string
	expected: string
}

const specs: Spec[] = [
	{ input: '2023-08-07T09:36:02', expected: '2023-08-07 09:36:02' },
	{ input: '2023-08-07T09:36:02.123', expected: '2023-08-07 09:36:02' },
	{ input: '2023-08-08T09:36:02.123456', expected: '2023-08-08 09:36:02' },

	// Invalid date
	{ input: 'Invalid Date', expected: 'Invalid Date' },

	// UTC time
	{ input: '2023-08-07T09:36:02Z', expected: '2023-08-07 18:36:02' },

	// Time zone included
	{ input: '2023-08-07T09:36:02+03:00', expected: '2023-08-07 15:36:02' },

	// Earliest possible date
	{ input: '0001-01-01T00:00:00', expected: '1-01-01 00:00:00' },

	// Latest possible date
	{ input: '9999-12-31T23:59:59', expected: '9999-12-31 23:59:59' },

	// Empty string input
	{ input: '', expected: 'Invalid Date' },

	// Invalid date format
	{ input: '2023-13-07T09:36:02', expected: 'Invalid Date' },

	// Missing date part
	{ input: 'T09:36:02', expected: 'Invalid Date' },

	// Missing time part
	{ input: '2023-08-07T', expected: 'Invalid Date' },

	// Missing milliseconds part
	{ input: '2023-08-07T09:36:02.', expected: 'Invalid Date' },
]

test.each(specs)('FormattedDate.japan($input) -> $expected', (spec) => {
	const { input, expected } = spec

	expect(FormattedDate.japan(new Date(input))).toBe(expected)
})
