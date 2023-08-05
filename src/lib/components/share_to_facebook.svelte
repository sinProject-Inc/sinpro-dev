<script>
	import FacebookIcon from './icons/facebook_icon.svelte'
	import { page } from '$app/stores'

	const url = 'https://sinpro.dev' + $page.url.pathname
</script>

<a
	href="http://www.facebook.com/share.php?u={url}"
	rel="nofollow noopener"
	target="_blank"
	class="border-none"
>
	<div class="h-nav-icon">
		<FacebookIcon />
	</div>
</a>
