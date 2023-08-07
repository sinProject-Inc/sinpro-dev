import { test, expect } from 'vitest'
import { ClientAddress } from './client_address'

test('ClientAddress should return x-forwarded-for header if it exists', () => {
	const mock_request = {
		headers: {
			get: (name: string) => {
				if (name === 'x-forwarded-for') return '123.456.789.101'
				return null
			},
		},
	} as unknown as Request

	const client_address = new ClientAddress(mock_request, () => '192.168.0.1')
	const result = client_address.value

	expect(result).toBe('123.456.789.101')
})

test('ClientAddress should call _get_client_address function if x-forwarded-for header does not exist', () => {
	const mock_request = {
		headers: {
			get: () => null,
		},
	} as unknown as Request

	const client_address = new ClientAddress(mock_request, () => '192.168.0.1')
	const result = client_address.value

	expect(result).toBe('192.168.0.1')
})
