<script lang="ts">
	import { App } from '$lib/app/app'
	import Navbar from '$lib/components/navbar.svelte'
	import SocialMetaTags from '$lib/components/social_meta_tags.svelte'
	import VersionFooter from '$lib/components/version_footer.svelte'
</script>

<SocialMetaTags title={App.app_name} description={App.description} />

<Navbar />

<div class="doc-base">
	<div class="flex h-[calc(100vh-var(--header-height))] flex-col items-center justify-center p-8">
		<div class="font-title flex max-w-xl flex-col items-center gap-12">
			<div class="text-3xl">{App.app_name}</div>
			<div class="text-md">
				<a href="/docs">PUSH MENU BUTTON</a>
			</div>
			<div class="text-md">{App.description}</div>
			<div><VersionFooter /></div>
		</div>
	</div>
</div>

<style lang="postcss">
	@font-face {
		font-family: 'title';
		src: url('/fonts/press-start-2p.woff2');
		font-display: swap;
	}

	.font-title {
		font-family: 'title';
	}
</style>
