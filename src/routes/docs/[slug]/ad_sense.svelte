<script context="module" lang="ts">
	export enum AdsId {
		display_1 = '4911345747',
		display_2 = '4371443207',
		display_3 = '7186142950',
		multiplex_1 = '7807043765',
	}
</script>

<script lang="ts">
	import { afterNavigate } from '$app/navigation'

	let ad_container: HTMLDivElement

	export let id: AdsId

	function create_ad_template(): HTMLModElement {
		const ad_slot = document.createElement('ins')

		ad_slot.className = 'adsbygoogle'
		ad_slot.style.display = 'block'
		ad_slot.dataset.adClient = 'ca-pub-4064604490139558'

		return ad_slot
	}

	function create_ad(): HTMLModElement {
		const ad_element = create_ad_template()

		ad_element.dataset.adSlot = id

		switch (id) {
			case AdsId.display_1:
			case AdsId.display_2:
			case AdsId.display_3:
				ad_element.dataset.adFormat = 'auto'
				ad_element.dataset.fullWidthResponsive = 'true'
				break

			case AdsId.multiplex_1:
				ad_element.dataset.adFormat = 'autorelaxed'
				break
		}

		return ad_element
	}

	function append_ad(): void {
		const ad_element = create_ad()

		ad_container.appendChild(ad_element)
	}

	function remove_child(): void {
		const first_child = ad_container.firstChild

		if (!first_child) return

		ad_container.removeChild(first_child)
	}

	function push_ad(): void {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const ads_by_google = (window as any).adsbygoogle

		if (!ads_by_google) return

		setTimeout(() => {
			ads_by_google.push({})
		})
	}

	function load_ad(): void {
		remove_child()
		append_ad()
		push_ad()
	}

	afterNavigate(() => {
		load_ad()
	})
</script>

<div class="my-8" bind:this={ad_container} />
