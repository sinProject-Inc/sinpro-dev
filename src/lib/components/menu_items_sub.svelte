<script>
	import { is_min_width_768 } from '$lib/stores'
	import AnimationSwitcher from './animation_switcher.svelte'
	import GithubIcon from './icons/github_icon.svelte'
	import VolumeSwitcher from './volume_switcher.svelte'
</script>

<VolumeSwitcher />
{#if $is_min_width_768}
	<AnimationSwitcher />
{/if}

<a
	href="https://github.com/sinProject-Inc/sinpro-dev"
	target="_blank"
	class="flex items-center gap-1"
	title="GitHub"
>
	<div class="h-nav-icon"><GithubIcon /></div>
</a>

<style lang="postcss">
	a {
		@apply hover:text-secondary dark:hover:text-secondary-dark;
	}
</style>
