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
        <h1 class="hero-title" in:typewriter={{ speed: 1.6, cursor: 'bar' }}>
            <span class="line">Hi, I'm <span class="name">Gabriel</span>.</span>
            <span class="line">Welcome to my</span>
            <span class="line">website!</span>
        </h1>
    {/if}
</div>

<style lang="css">
    .hero-title {
        margin: 0;
        line-height: 0.88;
        letter-spacing: -0.015em;
        font-stretch: 105%;
        /* Bigger overall; scales down on smaller screens */
        font-size: clamp(2.75rem, 12vw, 10.5rem);
    }

    /* Tweak for very small phones so it never blows past the viewport */
    @media (max-width: 420px) {
        .hero-title { font-size: clamp(2rem, 10.5vw, 7.5rem); }
    }

    .line {
        display: block;
        white-space: nowrap;     /* no wrapping within a line while it types */
    }

    /* Avoid accidental horizontal scroll if someone squeezes the window */
    .hello { overflow-x: clip; }

    .name {
        position: relative;
        display: inline-block;
        background: linear-gradient(90deg, var(--accent-1), var(--accent-2));
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    }

    .name::after {
        content: "";
        position: absolute;
        left: 0; right: 0;
        bottom: -0.07em;
        height: 0.18em;
        background: linear-gradient(90deg, var(--accent-1), var(--accent-2));
        transform: scaleX(0);        /* hidden */
        transform-origin: left;
        opacity: 0;                  /* hidden */
        border-radius: 2px;
        transition:
                transform 620ms cubic-bezier(.2,.9,.2,1),
                opacity 100ms ease-out;
    }
    .name:hover::after,
    .name:focus-visible::after {
        transform: scaleX(1);
        opacity: 1;
    }


    h1 {
        margin: 0;
        max-width: 18ch;                      /* keeps lines punchy */
        line-height: 0.9;
        letter-spacing: -0.02em;
        font-stretch: 105%;
        text-wrap: balance;                   /* nicer auto line breaks when supported */
        font-size: clamp(2.25rem, 9vw, 7.5rem);
    }

    :global(.content) {
        margin-left: 5% !important;
        margin-right: 5% !important;
        width: 90% !important;
        padding-top: 6rem !important;
    }

</style>