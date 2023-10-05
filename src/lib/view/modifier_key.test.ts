import { expect, it, vi } from 'vitest'
import { CommandOrControlShortcut } from './modifier_key'
import { OSInfo } from './os_info'

type SymbolSpec = {
	name: string
	is_mac: boolean
	expected: string
}

const symbol_specs: SymbolSpec[] = [
	{ name: 'Mac', is_mac: true, expected: '⌘' },
	{ name: 'Windows', is_mac: false, expected: 'Ctrl' },
]

it.each(symbol_specs)(
	'CommandOrControlShortcut._modifier_key_symbol $name -> $expected',
	(spec) => {
		const { is_mac, expected } = spec

		vi.spyOn(OSInfo, 'is_mac_or_ios').mockReturnValue(is_mac)

		const shortcut = new CommandOrControlShortcut()
		const value = Object.getOwnPropertyDescriptor(shortcut, '_modifier_key_symbol')?.value

		expect(value).toBe(expected)
	}
)

type GenerateSpec = {
	name: string
	is_mac: boolean
	key: string
	expected: string
}

const generate_specs: GenerateSpec[] = [
	{ name: 'Mac', is_mac: true, key: 'a', expected: '⌘A' },
	{ name: 'Windows', is_mac: false, key: 'a', expected: 'Ctrl A' },
	{ name: 'Mac alphanumeric', is_mac: true, key: '1', expected: '⌘1' },
	{ name: 'Windows alphanumeric', is_mac: false, key: '1', expected: 'Ctrl 1' },
]

it.each(generate_specs)('CommandOrControlShortcut.generate() $name -> $expected', (spec) => {
	const { is_mac, key, expected } = spec

	vi.spyOn(OSInfo, 'is_mac_or_ios').mockReturnValue(is_mac)

	const value = CommandOrControlShortcut.generate(key, true)

	expect(value).toBe(expected)
})
