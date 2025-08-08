<script lang="ts">
    import {typewriter} from "$lib/transitions";
    import {onMount} from "svelte";

    // Set to false for typewriter effect
    let visible = $state(false);

    onMount(() => {visible = true;});

    let pause = '⏸️';
    let del = '◀️';
</script>

<div class="hello">
    {#if visible}
        <h1 in:typewriter={{ speed: 2 }}>
            Hi,
            <br>
            I'm <span class="name">Gabriel</span>.
            <br>
            Welcome to
            <br>
            my website.{pause.repeat(10)}{del}{pause.repeat(10)}!
        </h1>
    {/if}
</div>

<style lang="css">
    .hello {
        padding-top: 6rem;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        align-items: flex-start;
        padding-left: 2rem;
        padding-right: 2rem;
    }

    .name {
        color: var(--accent-1);
        /*text-decoration: underline;*/
    }

    .name:hover {
        text-shadow: 0 0 0.5rem var(--accent-1);
    }

    @media (max-width: 768px) {
        .hello {
            padding-top: 12rem;
            padding-left: 0.5rem;
            padding-right: 0.5rem;
        }
    }

    h1 {
        text-align: left;
        font-size: min(15vw, 22vh);
        /*font-size: 20vh;*/
        margin: 0;
        line-height: 0.9;
        width: 100%;
    }
</style>