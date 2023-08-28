<script lang="ts">
	import FacebookIcon from './icons/facebook_icon.svelte'
	import { page } from '$app/stores'
</script>

<a
	href="http://www.facebook.com/share.php?u={$page.url.href}"
	rel="nofollow noopener"
	target="_blank"
	class="border-none"
>
	<div class="h-nav-icon">
		<FacebookIcon />
	</div>
</a>
