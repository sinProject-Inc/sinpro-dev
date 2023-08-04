<script>
	import { is_min_width_768 } from '$lib/stores'
	import AnimationSwitcher from './animation_switcher.svelte'
	import GithubLink from '$lib/components/github_link.svelte'
	import ThemeSwitcher from '$lib/components/theme_switcher.svelte'
	import TwitterLink from '$lib/components/twitter_link.svelte'
	import VolumeSwitcher from './volume_switcher.svelte'
</script>

<VolumeSwitcher />
{#if $is_min_width_768}
	<AnimationSwitcher />
{/if}

<ThemeSwitcher />
<TwitterLink />
<GithubLink />
