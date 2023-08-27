<script>
	import { App } from '$lib/app/app'
	import XIcon from './icons/x_icon.svelte'
	import { page } from '$app/stores'
	import { current_page_title } from '$lib/docs/current_page_store'
</script>

<a
	href="https://x.com/share?text={App.get_docs_title($current_page_title)}%0D%0A{$page.url.href}"
	rel="nofollow noopener"
	target="_blank"
	class="border-none"
>
	<div class="h-nav-icon">
		<XIcon />
	</div>
</a>
