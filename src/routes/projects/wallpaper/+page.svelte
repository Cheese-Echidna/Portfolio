<script lang="ts">
    import {dateFilename} from "$lib/datetime";

    let container: HTMLElement | undefined = $state();
    import init, {start} from "./wallpaper_wasm";

    $effect(async () => {
        if (!container) return;
        await init();
        start(1920, 1080);
        // container.appendChild(canvas);
        console.log("Appended");
    });
</script>

<p>
    This project is for a wallpaper and screensaver for me.
    <br />
    You can find the source <a href="https://github.com/Cheese-Echidna/SemiCircles">here</a>.
</p>

<span bind:this={container} style="display:none;"></span>

<style lang="css">
    :global(canvas) {
        width: 100% !important;
        height: auto !important;
        /*max-width: 100% !important;*/
        max-height: 80vh !important;
        display: block;
        /*aspect-ratio: calc(9/16);*/
    }

    @media (min-width: 769px) {
        :global(canvas) {
            margin-left: 15% !important;
            margin-right: 15% !important;
            width: 70% !important;
        }
    }
</style>