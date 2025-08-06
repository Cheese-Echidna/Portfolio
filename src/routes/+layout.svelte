<script lang="ts">
	import {page} from "$app/state";

    let { children } = $props();

    let path_pre = page.url.pathname.split('/')[1];

    let buttons = [['', "Home"], ['blog', "Blog"], ["projects", "Projects"], ["resume", "Resume"]].map(
        ([url, name]) => ({name, url: "\/" + url, selected: url === path_pre})
    );
</script>

<svelte:head>
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
        margin-left: 10%;
        margin-right: 10%;
        width: 80%;
        padding-top: 5rem;
    }

	:global(:root) {
		--accent-1: #fd9112;
		--accent-2: #fd666e;
        --bg: #141414;
        --accent-white: #ebebeb;
        --text: var(--accent-white);
        background-color: var(--bg);
        font-family: 'JetBrains Mono', 'Fira Code', monospace;
        font-size: 1.2rem;
        font-feature-settings: "liga" 1;
        color: var(--text);
	}

    :global(button) {
        background-color: var(--bg);
        color: var(--text);
        border: none;
        font-size: inherit;
        font-family: inherit;
        cursor: pointer;
        /*border-radius: 20px;*/
        transition: box-shadow 0.3s ease, color 0.3s ease;

    }

    :global(button:hover) {
        color: var(--accent-1) !important;
    }

    :global(button.selected) {
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
        font-size: 3rem;
        z-index: 100;
        background-color: var(--bg);
        margin-bottom: 2px;
    }

    nav div {
        flex: 1 1 0;
        padding: 0.8rem 0;
    }
</style>