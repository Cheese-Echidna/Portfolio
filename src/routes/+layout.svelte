<script lang="ts">
	import {page} from "$app/state";

    let { children } = $props();

    const path_pre = page.url.pathname.split('/')[1];

    const buttons = [['', "Home"], ['blog', "Blog"], ["projects", "Projects"], ["resume", "Resume"]].map(
        ([url, name]) => ({name, url: "\/" + url, selected: url === path_pre})
    );

    const page_name = buttons.find((elem) => elem.selected)?.name;
    const title = "Gabriel Garriock" + (page_name ? (" - " + page_name) : "");
</script>

<svelte:head>
    <link rel="stylesheet" href="/prism/prism.css">
    <script src="/prism/prism.js"></script>
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css"
        integrity="sha384-5TcZemv2l/9On385z///+d7MSYlvIEw9FuZTIdZ14vJLqWphw7e7ZPuOiCHJcFCP"
        crossorigin="anonymous"
    />
    <link
        rel="stylesheet"
        href=" https://cdn.jsdelivr.net/npm/temml@0.11.6/dist/Temml-Local.min.css "
    />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet">
    <title>{title}</title>
</svelte:head>

<nav>
    {#each buttons as button}
        <div>
            <button class={button.selected ? "selected" : "unselected"}
                     onclick={() => window.location.href = button.url}>
                {button.name}
            </button>
        </div>
    {/each}
</nav>

<div class="content">
    {@render children?.()}
</div>

<style lang="css">
    .content {
        margin-left: 15%;
        margin-right: 15%;
        width: 70%;
        padding-top: 5rem;
    }

	:global(:root) {
		--accent-1: #fd9112;
		--accent-2: #fd666e;
        --bg: #141414;
        --accent-white: #ebebeb;
        --text: var(--accent-white);
        background-color: var(--bg);
        font-family: Nunito, sans-serif;
        font-size: 1.2rem;
        color: var(--text);
	}

    :global(h1, h2) {
        font-family: 'Space Grotesk', sans-serif;
    }

    :global(code) {
        font-family: 'JetBrains Mono', 'Fira Code', monospace;
        font-feature-settings: "liga" 1;
    }

    :global(button) {
        background-color: var(--bg);
        color: var(--text);
        border: none;
        font-size: inherit;
        font-family: inherit;
        cursor: pointer;
        border-radius: 5px;
        transition: box-shadow 0.3s ease, color 0.3s ease;

    }

    :global(button:hover, button.selected, a) {
        color: var(--accent-1);
    }

    nav {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        display: flex;
        text-align: center;
        border-bottom: 2px solid var(--accent-white);
        font-size: 2rem;
        z-index: 100;
        background-color: var(--bg);
        margin-bottom: 2px;
    }

    nav div {
        flex: 1 1 0;
        padding: 0.8rem 0;
    }
</style>