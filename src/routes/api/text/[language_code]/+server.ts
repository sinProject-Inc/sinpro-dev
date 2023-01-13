import { Database } from '$lib/database'
import { SpeechLanguageCode } from '$lib/value/value_object/string_value_object/speech_language_code'
import { json, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ url, params }): Promise<Response> => {
	console.info(url.href)

	try {
		const speech_language_code = SpeechLanguageCode.create(params.language_code)

		const texts = await Database.get_texts(speech_language_code)
		const response = json(texts)

		return response
	} catch (error) {
		console.error(error)
		return json({ error: (error as Error).message })
	}
}
