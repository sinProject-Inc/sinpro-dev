import { expect, it } from 'vitest'
import { OS, OSInfo } from './os_info'

type OSInfoSpec = {
	name: string
	user_agent: string
	expected: OS
}

const os_info_specs: OSInfoSpec[] = [
	{ name: 'empty', user_agent: '', expected: OS.unknown },
	{ name: 'android', user_agent: 'android', expected: OS.android },
	{ name: 'ios', user_agent: 'iPad', expected: OS.ios },
	{ name: 'windows', user_agent: 'Windows', expected: OS.windows },
	{ name: 'mac_os', user_agent: 'Macintosh', expected: OS.mac_os },
	{ name: 'linux', user_agent: 'Linux', expected: OS.linux },
	{ name: 'windows_phone', user_agent: 'windows phone', expected: OS.windows_phone },
	{ name: 'unknown', user_agent: 'unknown', expected: OS.unknown },
	{
		name: 'contains android',
		user_agent:
			'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Mobile Safari/537.36',
		expected: OS.android,
	},
	{
		name: 'contains ios',
		user_agent:
			'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1',
		expected: OS.ios,
	},
	{
		name: 'contains windows',
		user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
		expected: OS.windows,
	},
	{
		name: 'contains mac_os',
		user_agent:
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0',
		expected: OS.mac_os,
	},
	{
		name: 'contains linux',
		user_agent: 'Mozilla/5.0 (X11; Linux x86_64; rv:89.0) Gecko/20100101 Firefox/89.0',
		expected: OS.linux,
	},
	{
		name: 'contains windows_phone',
		user_agent:
			'Mozilla/5.0 (Windows Phone 10.0 Microsoft; Lumia 950) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Mobile Safari/537.36 Edge/40.15254.603',
		expected: OS.windows_phone,
	},
	{
		name: 'contains unknown',
		user_agent: 'Mozilla/5.0 (Unknown; rv:89.0) Gecko/20100101 Firefox/89.0',
		expected: OS.unknown,
	},
]

it.each(os_info_specs)('OSInfo.get_os($user_agent) -> $expected', (spec) => {
	const { user_agent, expected } = spec

	Object.defineProperty(window.navigator, 'userAgent', { value: user_agent, configurable: true })

	expect(OSInfo.get_os()).toBe(expected)
})

type IsMacOrIOSSpec = {
	name: string
	user_agent: string
	expected: boolean
}

const is_mac_or_ios_specs: IsMacOrIOSSpec[] = [
	{ name: 'empty', user_agent: '', expected: false },
	{ name: 'android', user_agent: 'android', expected: false },
	{ name: 'iPad', user_agent: 'iPad', expected: true },
	{ name: 'iPhone', user_agent: 'iPhone', expected: true },
	{ name: 'Macintosh', user_agent: 'Macintosh', expected: true },
	{ name: 'mac os X', user_agent: 'Mac OS X', expected: true },
]

it.each(is_mac_or_ios_specs)('OSInfo.is_mac_or_ios($user_agent) -> $expected', (spec) => {
	const { user_agent, expected } = spec

	Object.defineProperty(window.navigator, 'userAgent', { value: user_agent, configurable: true })

	expect(OSInfo.is_mac_or_ios()).toBe(expected)
})
