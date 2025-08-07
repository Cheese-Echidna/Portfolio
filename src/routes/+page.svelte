<script lang="ts">
    import {typewriter} from "$lib/transitions";
    import {onMount} from "svelte";

    let showScrollIndicator = $state(true);
    let visible = $state(false);

    function checkScroll() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;

        showScrollIndicator = documentHeight > windowHeight && 
            scrollTop < (documentHeight - windowHeight - 20);
    }

    $effect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', checkScroll);
            window.addEventListener('resize', checkScroll);
            checkScroll();

            return () => {
                window.removeEventListener('scroll', checkScroll);
                window.removeEventListener('resize', checkScroll);
            };
        }
    });

    onMount(() => {visible = true;});
</script>

<div class="name">
    {#if visible}
        <h1 in:typewriter={{ speed: 2 }}>
            Hi,
            <br>
            I'm Gabriel.
            <br>
            Welcome to my website.
        </h1>
    {/if}
</div>

<!--{#if showScrollIndicator}-->
<!--    <div class="scroll-indicator">V</div>-->
<!--{/if}-->

<style lang="css">
    .scroll-indicator {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        color: var(--text);
        font-size: 1.2rem;
        opacity: 0.6;
        animation: bounce 1s infinite;
        pointer-events: none;
    }

    @keyframes bounce {
        0%, 100% {
            transform: translateX(-50%) translateY(0);
        }
        50% {
            transform: translateX(-50%) translateY(-5px);
        }
    }

    .name {
        position: absolute;
        top: 0;
        left: 0;
        /*width: 100%;*/
        height: 100vh;
        display: flex;
        align-items: center;
        padding-left: 2rem;
        padding-right: 2rem;
    }

    h1 {
        text-align: left;
        font-size: clamp(4rem, 15vw, 12rem);
        margin: 0;
        line-height: 0.9;
        width: 100%;
    }
</style>