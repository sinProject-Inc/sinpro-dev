import { expect, it, vi } from 'vitest'
import { KeyboardShortcutHandler } from './keyboard_shortcut_handler'

it('KeyboardShortcutHandler', async () => {
	const mock_callback = vi.fn()

	const keyboard_event = new KeyboardEvent('keydown', { code: 'KeyK', ctrlKey: false })
	const keyboard_event_ctrl = new KeyboardEvent('keydown', { code: 'KeyK', ctrlKey: true })
	const keyboard_event_alt = new KeyboardEvent('keydown', { code: 'KeyK', altKey: true })
	const keyboard_event_shift = new KeyboardEvent('keydown', { code: 'KeyK', shiftKey: true })
	const keyboard_event_key_a = new KeyboardEvent('keydown', { code: 'KeyA', ctrlKey: true })

	new KeyboardShortcutHandler({ code: 'KeyK', control: true }, mock_callback)

	window.dispatchEvent(keyboard_event)
	window.dispatchEvent(keyboard_event_alt)
	window.dispatchEvent(keyboard_event_shift)
	window.dispatchEvent(keyboard_event_key_a)
	await new Promise((resolve) => setTimeout(resolve, 0))
	expect(mock_callback).not.toHaveBeenCalled()

	window.dispatchEvent(keyboard_event_ctrl)
	await new Promise((resolve) => setTimeout(resolve, 0))
	expect(mock_callback).toHaveBeenCalled()
})
