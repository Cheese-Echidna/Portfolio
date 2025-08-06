<script lang="ts">
	let { children } = $props();
</script>

<svelte:head>
</svelte:head>

<nav>
    Gabriel
    <a href="/">Home</a>
    <a href="/blog">Blog</a>
    <a href="/projects">Projects</a>
</nav>

<div class="content">
    {@render children?.()}
</div>

<style lang="css">
    .content {
        margin-left: 10%;
        margin-right: 10%;
        width:80%;
        position: fixed;
    }

	:global(:root) {
		--primary: #fd9112;
		--accent: #fd666e;
	}
</style>