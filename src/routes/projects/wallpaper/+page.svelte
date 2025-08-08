<script lang="ts">
    import {dateFilename} from "$lib/datetime";

    let container: HTMLElement | undefined = $state();
    import init, {start} from "/wasm/wallpaper/wallpaper_wasm.js?url";

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
    Please note that it will not work fully on iOS.
    <br />
    You can find the source <a href="https://github.com/Cheese-Echidna/SemiCircles">here</a>.
</p>

<span class="wallpaper" bind:this={container} style="display:none;"></span>
