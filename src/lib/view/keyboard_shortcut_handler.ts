type KeyEventHandlerParams = {
	alt?: boolean
	shift?: boolean
	control?: boolean
	code?: string
}

export class KeyboardShortcutHandler {
	private _event_handler: (event: KeyboardEvent) => void
	private _params: KeyEventHandlerParams
	private _callback: () => void

	public constructor(params: KeyEventHandlerParams, callback: () => void) {
		this._params = params
		this._callback = callback

		this._event_handler = this._create_event_handler()

		this._set_event_handler()
	}

	private _create_event_handler(): (event: KeyboardEvent) => void {
		const handler = (event: KeyboardEvent): void => {
			const should_process_event = this._should_process_event(event)

			if (!should_process_event) return

			event.preventDefault()

			this._callback()
		}

		return handler
	}

	private _should_process_event(event: KeyboardEvent): boolean {
		const { alt = false, shift = false, control = false, code = null } = this._params
		const is_control_pressed = event.ctrlKey || event.metaKey

		return (
			alt === event.altKey &&
			shift === event.shiftKey &&
			control === is_control_pressed &&
			code === event.code
		)
	}

	private _set_event_handler(): void {
		this.remove_event_handler()

		window.addEventListener('keydown', this._event_handler)
	}

	public remove_event_handler(): void {
		window.removeEventListener('keydown', this._event_handler)
	}
}
