import { base } from '$app/paths'
import { redirect } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load: PageLoad = async () => {
	throw redirect(307, `${base}/docs/portfolio`)
}
