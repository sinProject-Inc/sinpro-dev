<script lang="ts">
	import { base } from '$app/paths'
	import BookIcon from './icons/book_icon.svelte'

	export let name: string
	export let hidden = false

	$: text = name === 'docs' ? 'Docs' : name
</script>

<a href="{base}/{name}" class="flex items-center gap-1" title={text}>
	<div class="h-nav-icon">
		{#if name === 'docs'}
			<BookIcon />
		{/if}
	</div>
	<span class="nav-item-text" class:hidden class:md:contents={hidden}>{text}</span>
</a>

<style lang="postcss">
	a {
		@apply hover:text-secondary dark:hover:text-secondary-dark;
	}
</style>
