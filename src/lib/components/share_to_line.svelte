<script>
	import LineIcon from './icons/line_icon.svelte'
	import { page } from '$app/stores'
	import { current_page_title } from '$lib/docs/current_page_store'

	const url = 'https://sinpro.dev' + $page.url.pathname
</script>

<a
	href="http://line.me/R/msg/text/?{url}%0a{$current_page_title}"
	target="_blank"
	rel="nofollow noopener"
	class="border-none"
>
	<div class="h-nav-icon">
		<LineIcon />
	</div>
</a>
