import { expect, it } from 'vitest'
import { OS, OSInfo } from './os_info'

type OSInfoSpec = {
	name: string
	user_agent: string
	expected_os: OS
	expected_is_mac_or_ios: boolean
}

const os_info_specs: OSInfoSpec[] = [
	{ name: 'empty', user_agent: '', expected_os: OS.unknown, expected_is_mac_or_ios: false },
	{
		name: 'android',
		user_agent: 'android',
		expected_os: OS.android,
		expected_is_mac_or_ios: false,
	},
	{ name: 'ios', user_agent: 'iPad', expected_os: OS.ios, expected_is_mac_or_ios: true },
	{
		name: 'windows',
		user_agent: 'Windows',
		expected_os: OS.windows,
		expected_is_mac_or_ios: false,
	},
	{
		name: 'mac_os',
		user_agent: 'Macintosh',
		expected_os: OS.mac_os,
		expected_is_mac_or_ios: true,
	},
	{ name: 'linux', user_agent: 'Linux', expected_os: OS.linux, expected_is_mac_or_ios: false },
	{
		name: 'windows_phone',
		user_agent: 'windows phone',
		expected_os: OS.windows_phone,
		expected_is_mac_or_ios: false,
	},
	{
		name: 'unknown',
		user_agent: 'unknown',
		expected_os: OS.unknown,
		expected_is_mac_or_ios: false,
	},
	{
		name: 'contains android',
		user_agent:
			'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Mobile Safari/537.36',
		expected_os: OS.android,
		expected_is_mac_or_ios: false,
	},
	{
		name: 'contains ios',
		user_agent:
			'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1',
		expected_os: OS.ios,
		expected_is_mac_or_ios: true,
	},
	{
		name: 'contains windows',
		user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
		expected_os: OS.windows,
		expected_is_mac_or_ios: false,
	},
	{
		name: 'contains mac_os',
		user_agent:
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0',
		expected_os: OS.mac_os,
		expected_is_mac_or_ios: true,
	},
	{
		name: 'contains linux',
		user_agent: 'Mozilla/5.0 (X11; Linux x86_64; rv:89.0) Gecko/20100101 Firefox/89.0',
		expected_os: OS.linux,
		expected_is_mac_or_ios: false,
	},
	{
		name: 'contains windows_phone',
		user_agent:
			'Mozilla/5.0 (Windows Phone 10.0 Microsoft; Lumia 950) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Mobile Safari/537.36 Edge/40.15254.603',
		expected_os: OS.windows_phone,
		expected_is_mac_or_ios: false,
	},
	{
		name: 'contains unknown',
		user_agent: 'Mozilla/5.0 (Unknown; rv:89.0) Gecko/20100101 Firefox/89.0',
		expected_os: OS.unknown,
		expected_is_mac_or_ios: false,
	},
]

it.each(os_info_specs)('OSInfo.get_os($user_agent) -> $expected', (spec) => {
	const { user_agent, expected_os, expected_is_mac_or_ios } = spec

	Object.defineProperty(window.navigator, 'userAgent', { value: user_agent, configurable: true })

	expect(OSInfo.get_os()).toBe(expected_os)
	expect(OSInfo.is_mac_or_ios()).toBe(expected_is_mac_or_ios)
})
