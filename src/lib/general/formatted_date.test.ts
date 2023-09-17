import { expect, test } from 'vitest'
import { FormattedDate } from './formatted_date'

type Spec = {
	input: string
	expected: string
}

const specs: Spec[] = [
	// UTC times are specified
	{ input: '2023-08-07T09:36:02Z', expected: '2023-08-07 18:36:02' },
	{ input: '2023-08-07T09:36:02.123Z', expected: '2023-08-07 18:36:02' },
	{ input: '2023-08-08T09:36:02.123456Z', expected: '2023-08-08 18:36:02' },

	// Invalid date
	{ input: 'Invalid Date', expected: 'Invalid Date' },

	// Time zone included
	{ input: '2023-08-07T09:36:02+03:00', expected: '2023-08-07 15:36:02' },

	// Earliest possible date
	{ input: '1888-01-01T00:00:00Z', expected: '1888-01-01 09:00:00' },

	// Latest possible date
	{ input: '9999-12-31T23:59:59Z', expected: '10000-01-01 08:59:59' },

	// Empty string input
	{ input: '', expected: 'Invalid Date' },

	// Invalid date format
	{ input: '2023-13-07T09:36:02Z', expected: 'Invalid Date' },

	// Missing date part
	{ input: 'T09:36:02Z', expected: 'Invalid Date' },

	// Missing time part
	{ input: '2023-08-07TZ', expected: 'Invalid Date' },

	// Missing milliseconds part
	{ input: '2023-08-07T09:36:02.Z', expected: 'Invalid Date' },
]

test.each(specs)('FormattedDate.japan($input) -> $expected', (spec) => {
	const { input, expected } = spec

	expect(FormattedDate.japan(new Date(input))).toBe(expected)
})
