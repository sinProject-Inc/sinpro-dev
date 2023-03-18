// TODO: node env に変更する
import { LocaleCode } from '$lib/locale/locale_code'
import { TranslationServiceClient } from '@google-cloud/translate'
import * as dotenv from 'dotenv'
import { TranslationText } from './translation_text'

export class TranslateWithGoogleAdvanced {
	private readonly _translation_text: TranslationText
	private readonly _target_locale_code: LocaleCode

	public constructor(text: string | undefined, target_locale_code: string | undefined) {
		this._translation_text = new TranslationText(text)
		this._target_locale_code = new LocaleCode(target_locale_code)
	}

	public async execute(): Promise<string> {
		try {
			const translation_client = new TranslationServiceClient()

			dotenv.config()
			const google_product_id = process.env.GOOGLE_PROJECT_ID

			if (!google_product_id) {
				console.error('GOOGLE_PRODUCT_ID is not set')
				return ''
			}

			const request = {
				parent: `projects/${google_product_id}/locations/global`,
				contents: [this._translation_text.text],
				mimeType: 'text/plain',
				// sourceLanguageCode: 'XX',
				targetLanguageCode: this._target_locale_code.code,
			}

			const [response] = await translation_client.translateText(request)
			if (!response.translations) return ''

			const translated_text_string = response.translations[0].translatedText

			if (!translated_text_string) return ''

			return translated_text_string
		} catch (error) {
			console.error(error)
			return ''
		}
	}
}
