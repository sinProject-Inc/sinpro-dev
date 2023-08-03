// import { base } from '$app/paths'
import { logger } from '$lib/app/logger'
import { ClientAddress } from '$lib/network/client_address'
// import { ClientHostName } from '$lib/network/client_hostname'
import type { Handle, HandleServerError } from '@sveltejs/kit'

// NOTE: https://kit.svelte.jp/docs/errors
// eslint-disable-next-line @typescript-eslint/naming-convention
export const handleError: HandleServerError = ({ error, event }) => {
	const client_address = new ClientAddress(event.request, event.getClientAddress).value

	const { code } = error as { code?: string }
	const { message } = error as { message?: string }

	if (message?.startsWith('Not found')) {
		logger.warn(`${client_address} [SERVER] 404: ${message}`)
	} else {
		logger.error(`${client_address} [SERVER] Unhandled Error:`, error, { event })
	}

	// eslint-disable-next-line no-console
	// console.error('[server] Unhandled Error:', error)

	return {
		code: code ?? 'UNKNOWN',
		message: 'Whoops!',
	}
}

export const handle: Handle = async ({ event, resolve }) => {
	const client_address = new ClientAddress(event.request, event.getClientAddress).value

	const theme = ''

	logger.info(`${client_address} [${event.request.method}] ${event.url}`)

	// 	if (event.url.pathname !== `${base}/api/log`) {
	// 	logger.info(`${client_address} [${event.request.method}] ${event.url}`)
	// } else {
	// 	logger.info(`${client_address} [${event.request.method}] ${event.url}`)
	// }

	const response = await resolve(event, {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		transformPageChunk: ({ html }) =>
			html.replace('data-theme=""', `data-theme="${theme}" class="${theme}"`),
	})

	return response
}
