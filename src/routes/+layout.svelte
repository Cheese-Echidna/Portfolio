<script lang="ts">
	let { children } = $props();
</script>

<svelte:head>
</svelte:head>

<nav>
    Portfolio
    <a href="/blog">Blog</a>
</nav>

{@render children?.()}

<style lang="css">
	:global(:root) {
		--primary: #fd9112;
		--accent: #fd666e;
	}
</style>