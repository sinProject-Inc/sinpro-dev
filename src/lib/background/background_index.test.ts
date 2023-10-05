import { expect, it } from 'vitest'
import { BackgroundIndex } from './background_index'

type NumberSpec = {
	name: string
	index: number
	expected: number
	error_message?: string
}

const number_specs: NumberSpec[] = [
	{ name: 'negative', index: -1, expected: 0, error_message: 'id is not a positive number' },
	{ name: 'zero', index: 0, expected: 0 },
	{ name: 'positive', index: 1, expected: 1 },
]

it.each(number_specs)(
	'new BackgroundIndex($index).index $name -> $expected : $error_message',
	(spec) => {
		const { index, expected, error_message } = spec

		if (error_message) {
			expect(() => new BackgroundIndex(index)).toThrowError(error_message)

			return
		}

		const background_index = new BackgroundIndex(index)

		expect(background_index.index).toBe(expected)
	}
)

type StringSpec = {
	name: string
	index_string?: string
	expected: number
	error_message?: string
}

const string_specs: StringSpec[] = [
	{ name: 'undefined to zero', expected: 0 },
	{ name: 'empty is zero', index_string: '', expected: 0 },
	{
		name: 'not a number',
		index_string: 'abc',
		expected: 0,
		error_message: 'index is not a number',
	},
	{ name: 'positive', index_string: '5', expected: 5 },
]

it.each(string_specs)(
	'BackgroundIndex.from_string($index_string) $name -> $expected : $error_message',
	(spec) => {
		const { index_string, expected, error_message } = spec

		if (error_message) {
			expect(() => BackgroundIndex.from_string(index_string)).toThrowError(error_message)

			return
		}

		const background_index = BackgroundIndex.from_string(index_string)

		expect(background_index.index).toBe(expected)
	}
)
