import { expect, test } from 'vitest'
import { FormattedDate } from './formatted_date'

test('FormattedDate.japan', async () => {
	expect(FormattedDate.japan(new Date('2023-08-07T09:36:02'))).toBe('2023-08-07 09:36:02')
})
