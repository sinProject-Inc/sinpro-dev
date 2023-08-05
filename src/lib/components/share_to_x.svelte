<script>
	import XIcon from './icons/x_icon.svelte'
	import { page } from '$app/stores'
	import { current_page_title } from '$lib/docs/current_page_store'

	const url = 'https://sinpro.dev' + $page.url.pathname
</script>

<a
	href="https://twitter.com/share?url={url}&text={$current_page_title}"
	rel="nofollow noopener"
	target="_blank"
	class="border-none"
>
	<div class="h-nav-icon">
		<XIcon />
	</div>
</a>
