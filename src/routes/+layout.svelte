<script lang="ts">
	let { children } = $props();
</script>

<svelte:head>
</svelte:head>

<nav>
    <div>Gabriel</div>
    <div><a href="/">Home</a></div>
    <div><a href="/blog">Blog</a></div>
    <div><a href="/projects">Projects</a></div>
    <div><a href="/resume">Resume</a></div>
</nav>

<div class="content">
    {@render children?.()}
</div>

<style lang="css">
    .content {
        margin-left: 10%;
        margin-right: 10%;
        width:80%;
    }

	:global(:root) {
		--accent-1: #fd9112;
		--accent-2: #fd666e;
        --bg: #141414;
        --accent-white: #ebebeb;
        --text: var(--accent-white);
	}

    nav {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        display: flex;
        text-align: center;
    }

    nav div {
        flex: 1 1 0;
    }
</style>