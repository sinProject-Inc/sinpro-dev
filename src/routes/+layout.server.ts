import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async () => {
	const background_period_duration = 60 * 1000
	const background_transition_duration = 3 * 1000

	return {
		background_period_duration,
		background_transition_duration,
	}
}
