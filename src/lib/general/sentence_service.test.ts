import { test, expect } from 'vitest'
import { SentenceService } from './sentence_service'

function run_test(input: string, expected_output: string[]): void {
	const service = new SentenceService(input)
	const result = service.split()
	expect(result).toEqual(expected_output)
}

const tests = [
	{
		input: 'Hello there! How are you? Have a nice day.',
		expected_output: ['Hello there!', 'How are you?', 'Have a nice day.'],
	},
	{
		input: 'こんにちは！お元気ですか？良い一日を。',
		expected_output: ['こんにちは！', 'お元気ですか？', '良い一日を。'],
	},
	{
		input: 'Hello there!  \nHow are you?    \n\nHave a nice day.',
		expected_output: ['Hello there!', 'How are you?', 'Have a nice day.'],
	},
]

tests.forEach(({ input, expected_output }) => {
	test(`splits sentence: ${input}`, () => {
		run_test(input, expected_output)
	})
})
