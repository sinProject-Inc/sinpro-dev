import { test, expect } from 'vitest'
import { ClientAddress } from './client_address'

type Spec = {
	name: string
	request: unknown
	get_client_address: () => string
	expected: string
}

const specs: Spec[] = [
	{
		name: 'x-forwarded-for header exists',
		request: {
			headers: {
				get: (name: string): string | undefined =>
					name === 'x-forwarded-for' ? '123.456.789.101' : undefined,
			},
		},
		get_client_address: () => '127.0.0.1',
		expected: '123.456.789.101',
	},
	{
		name: 'x-forwarded-for header does not exist',
		request: {
			headers: {
				get: () => null,
			},
		},
		get_client_address: () => '127.0.0.1',
		expected: '127.0.0.1',
	},
]

test.each(specs)('ClientAddress() $name -> $expected', (spec) => {
	const { request, get_client_address, expected } = spec
	const client_address = new ClientAddress(request as Request, get_client_address)

	expect(client_address.value).toBe(expected)
})
