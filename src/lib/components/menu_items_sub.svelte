<script>
	import { is_min_width_768 } from '$lib/stores'
	import AnimationSwitcher from './animation_switcher.svelte'
	import GithubLink from './github_link.svelte'
	import ThemeSwitcher from './theme_switcher.svelte'
	import TwitterLink from './twitter_link.svelte'
	import VolumeSwitcher from './volume_switcher.svelte'
</script>

<VolumeSwitcher />
{#if $is_min_width_768}
	<AnimationSwitcher />
{/if}

<ThemeSwitcher />
<TwitterLink />
<GithubLink />
