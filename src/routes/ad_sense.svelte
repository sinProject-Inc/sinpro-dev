<script lang="ts">
	import { afterNavigate } from '$app/navigation'

	afterNavigate(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const ads_by_google = (window as any)['adsbygoogle']

		if (!ads_by_google?.loaded) return

		ads_by_google.push({})
	})
</script>

<svelte:head>
	<script
		async
		src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4064604490139558"
		crossorigin="anonymous"
	></script>
</svelte:head>
