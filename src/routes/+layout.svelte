<script lang="ts">
	import {page} from "$app/state";
    import { dev } from '$app/environment';

    let { children, data } = $props();

    let menuOpen = $state(false);

    const path_pre = $derived(page.url.pathname.split('/')[1]);

    const buttons = $derived.by(() => [
        ['', "Home"],
        ['blog', "Blog"],
        ["projects", "Projects"],
        ["resume", "Resume"],
        ["contact", "Contact"]
    ].map(
            ([url, name]) => ({name, url: "\/" + url, selected: url === path_pre})
        )
    );

    const page_button = $derived(buttons.find((elem) => elem.selected) || {
        name: "Unknown",
        url: "/",
        selected: true,
    })
    const page_name = $derived(page_button.name);

    const title = $derived.by(() => {
        let dev_part = dev ? "GG-DEV" : "Gabriel Garriock";
        let page_part = page_name ? (" - " + page_name) : "";
        return dev_part + page_part;
    });
    
    function toggleMenu() {
        menuOpen = !menuOpen;
    }
</script>

<svelte:head>
    <link rel="stylesheet" href="/app.css">
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


<!-- <div class="page"> -->
<nav>
    <div class="mobile-title">
        <button class="selected"
                onclick={() => window.location.href = page_button.url}>
            {page_button.name}
        </button>
    </div>
    
    <div class="desktop-menu">
        {#each buttons as button}
            <div class="desktop-menu-item">
                <button class={button.selected ? "selected" : "unselected"}
                         onclick={() => window.location.href = button.url}>
                    {button.name}
                </button>
            </div>
        {/each}
    </div>

    <button class="hamburger-menu" onclick={toggleMenu}>
        <span class="hamburger-icon">☰</span>
    </button>

    <div class="mobile-menu" class:open={menuOpen}>
        <button class="close-menu" onclick={toggleMenu}>✕</button>
        {#each buttons as button}
            <div>
                <button class={button.selected ? "selected" : "unselected"}
                         onclick={() => window.location.href = button.url}>
                    {button.name}
                </button>
            </div>
        {/each}
    </div>
 </nav>

<div class="content">
    {@render children?.()}
</div>

<style lang="css">
    .content {
        margin-left: 15%;
        margin-right: 15%;
        width: 70%;
        padding-top: 4.5rem;
    }

    nav {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        text-align: center;
        border-bottom: 2px solid var(--text);
        font-size: 2rem;
        z-index: 100;
        background-color: var(--bg);
    }

    .desktop-menu {
        display: flex;
        width: 100%;

    }

    .desktop-menu-item {
        flex: 1 1 0;
        padding: 0.8rem 0;
    }

    /* Mobile menu styles */
    .hamburger-menu {
        display: none;
        position: absolute;
        right: 1rem;
        top: 0.8rem;
        font-size: 2rem;
        z-index: 101;
    }

    .mobile-title {
        display: none;
        text-align: left;
        padding: 0.8rem 0;
        margin-left: 0.8rem;
    }

    .mobile-menu {
        display: none;
        position: fixed;
        top: 0;
        right: -100%;
        width: 70%;
        height: 100vh;
        background-color: var(--bg);
        z-index: 200;
        flex-direction: column;
        padding-top: 4rem;
        transition: right 0.3s ease;
        border-left: 2px solid var(--accent-white);
    }

    .mobile-menu.open {
        right: 0;
    }

    .mobile-menu div {
        width: 100%;
        text-align: center;
        margin: 0.5rem 0;
    }

    .close-menu {
        position: absolute;
        top: 1rem;
        right: 1rem;
        font-size: 1.5rem;
    }

    @media (max-width: 768px) {
        .content {
            margin-left: 4%;
            margin-right: 4%;
            width: 92%;
        }

        .desktop-menu {
            display: none;
        }

        .hamburger-menu {
            display: block;
        }

        .mobile-title {
            display: block;
            flex: 1;
        }

        .mobile-menu {
            display: flex;
        }
    }
</style>