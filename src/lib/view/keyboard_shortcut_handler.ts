type KeyEventHandlerParams = {
	alt?: boolean
	shift?: boolean
	control?: boolean
	code?: string
}

type KeyboardEventHandler = (event: KeyboardEvent) => void

export class KeyboardShortcutHandler {
	public static should_process_event(params: KeyEventHandlerParams, event: KeyboardEvent): boolean {
		const { alt = false, shift = false, control = false, code = null } = params
		const is_control_pressed = event.ctrlKey || event.metaKey

		return (
			alt === event.altKey &&
			shift === event.shiftKey &&
			control === is_control_pressed &&
			code === event.code
		)
	}

	public static remove(handler: KeyboardEventHandler): void {
		window.removeEventListener('keydown', handler)
	}

	public static add(handler: KeyboardEventHandler): void {
		KeyboardShortcutHandler.remove(handler)

		window.addEventListener('keydown', handler)
	}

	public static create(params: KeyEventHandlerParams, callback: () => void): void {
		const handler = (event: KeyboardEvent): void => {
			const should_process_event = this.should_process_event(params, event)

			if (!should_process_event) return

			event.preventDefault()
			callback()
		}

		KeyboardShortcutHandler.add(handler)
	}
}
