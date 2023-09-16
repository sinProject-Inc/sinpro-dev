import { test, expect } from 'vitest'
import { SentenceService } from './sentence_service'

type Spec = {
	name: string
	input: string
	expected: string[]
}

const specs: Spec[] = [
	{
		name: 'English',
		input: 'Hello there! How are you? Have a nice day.',
		expected: ['Hello there!', 'How are you?', 'Have a nice day.'],
	},
	{
		name: 'Japanese',
		input: 'こんにちは！お元気ですか？良い一日を。',
		expected: ['こんにちは！', 'お元気ですか？', '良い一日を。'],
	},
	{
		name: 'English multiple lines',
		input: 'Hello there!  \nHow are you?    \n\nHave a nice day.',
		expected: ['Hello there!', 'How are you?', 'Have a nice day.'],
	},
]

test.each(specs)('split($name) -> $expected', (spec) => {
	const { input, expected } = spec

	const service = new SentenceService(input)
	const result = service.split()

	expect(result).toEqual(expected)
})
