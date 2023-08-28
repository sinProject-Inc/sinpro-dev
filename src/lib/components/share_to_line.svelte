<script lang="ts">
	import { App } from '$lib/app/app'
	import LineIcon from './icons/line_icon.svelte'
	import { page } from '$app/stores'
	import { current_page_title } from '$lib/docs/current_page_store'
</script>

<a
	href="http://line.me/R/msg/text/?{App.get_docs_title($current_page_title)}%0D%0A{$page.url.href}"
	target="_blank"
	rel="nofollow noopener"
	class="border-none"
>
	<div class="h-nav-icon">
		<LineIcon />
	</div>
</a>
