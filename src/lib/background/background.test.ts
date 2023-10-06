import { expect, it } from 'vitest'
import { Background } from './background'
import { BackgroundIndex } from './background_index'

it('Positive Testing', () => {
	const background = Background.from_local_storage()

	expect(background.background_index.index).toBe(0)
	expect(background.background_url).toBe('/src/lib/assets/beach-30.avif')

	const second_background = background.transition_background()
	second_background.transition_background()

	const third_background = Background.from_local_storage()

	expect(third_background.background_index.index).toBe(2)
	expect(third_background.background_url).toBe('/src/lib/assets/cloudy-30.avif')
})

it('Negative Testing', () => {
	const background = new Background(new BackgroundIndex(100))

	expect(background['_background_url']).toBe('/src/lib/assets/beach-30.avif')
})

it('last to first', () => {
	const last_index = Background['_background_urls'].length - 1
	const last_background = new Background(new BackgroundIndex(last_index))

	const first_background = last_background.transition_background()

	expect(first_background.background_index.index).toBe(0)
})
