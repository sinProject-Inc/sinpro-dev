<script context="module" lang="ts">
	export enum AdsId {
		display_1,
		display_2,
		display_3,
		multiplex_1,
	}
</script>

<script lang="ts">
	import { page } from '$app/stores'
	import { onMount } from 'svelte'

	export let id: AdsId

	onMount(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const ads_by_google = (window as any).adsbygoogle

		if (!ads_by_google) return

		ads_by_google.push({})
	})
</script>

<div class="my-8" id={$page.url.href}>
	{#if id === AdsId.display_1}
		<!-- sinpro.display.1 -->
		<ins
			class="adsbygoogle"
			style="display:block"
			data-ad-client="ca-pub-4064604490139558"
			data-ad-slot="4911345747"
			data-ad-format="auto"
			data-full-width-responsive="true"
		></ins>
	{:else if id == AdsId.display_2}
		<!-- sinpro.display.2 -->
		<ins
			class="adsbygoogle"
			style="display:block"
			data-ad-client="ca-pub-4064604490139558"
			data-ad-slot="4371443207"
			data-ad-format="auto"
			data-full-width-responsive="true"
		></ins>
	{:else if id == AdsId.display_3}
		<!-- sinpro.display.3 -->
		<ins
			class="adsbygoogle"
			style="display:block"
			data-ad-client="ca-pub-4064604490139558"
			data-ad-slot="7186142950"
			data-ad-format="auto"
			data-full-width-responsive="true"
		></ins>
	{:else if id == AdsId.multiplex_1}
		<!-- sinpro.multiplex.1 -->
		<ins
			class="adsbygoogle"
			style="display:block"
			data-ad-format="autorelaxed"
			data-ad-client="ca-pub-4064604490139558"
			data-ad-slot="7807043765"
		></ins>
	{/if}
</div>
