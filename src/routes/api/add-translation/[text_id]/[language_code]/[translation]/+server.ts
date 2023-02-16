import { Repository } from '$lib/app/repository'
import { SpeechLanguageCode } from '$lib/speech/speech_language_code'
import { SpeechText } from '$lib/speech/speech_text'
import { TextId } from '$lib/text/text_id'
import { json, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ url, params }) => {
	console.info(url.href)

	try {
		const text_id = TextId.from_string(params.text_id)
		const translation_speech_text = new SpeechText(params.translation)
		const speech_language_code = SpeechLanguageCode.create(params.language_code)
		const result = await Repository.translation.add(
			text_id,
			speech_language_code,
			translation_speech_text
		)

		return json(result)
	} catch (e) {
		console.error(e)
		return new Response((e as Error).message, { status: 400 })
	}
}
