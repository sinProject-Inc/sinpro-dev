import { test, expect } from 'vitest'
import { SentenceService } from './sentence_service'

test('splits sentences correctly with English punctuation', () => {
	const service = new SentenceService('Hello there! How are you? Have a nice day.')
	const result = service.split()
	expect(result).toEqual(['Hello there!', 'How are you?', 'Have a nice day.'])
})

test('splits sentences correctly with Japanese punctuation', () => {
	const service = new SentenceService('こんにちは！お元気ですか？良い一日を。')
	const result = service.split()
	expect(result).toEqual(['こんにちは！', 'お元気ですか？', '良い一日を。'])
})

test('ignores multiple spaces and line breaks', () => {
	const service = new SentenceService('Hello there!  \nHow are you?    \n\nHave a nice day.')
	const result = service.split()
	expect(result).toEqual(['Hello there!', 'How are you?', 'Have a nice day.'])
})
