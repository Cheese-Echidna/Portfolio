<script lang="ts">
    import {dateFilename} from "$lib/datetime";
    import { on } from 'svelte/events';

    let w: number | undefined = $state();
    let h: number | undefined = $state();

    let container: HTMLElement | undefined = $state();
    import init, {start} from "./floob_wasm";

    $effect(async () => {
        if (!container || !w || !h) return;
        for (let canvas of document.getElementsByTagName('canvas')) {
            canvas.remove()
        }
        await init();
        start(w - 35, h - 200);
        // container.appendChild(canvas);
        console.log("Started");
    });

    $effect(() => {
        const off1 = on(document, 'contextmenu', (e) => {
            if (e.target instanceof HTMLCanvasElement) e.preventDefault();
        }, { capture: true });

        const off2 = on(document, 'pointerdown', (e) => {
            if (e.target instanceof HTMLCanvasElement && e.button === 2) e.preventDefault();
        }, { capture: true });

        const off3 = on(document, 'pointermove', (e) => {
            if (e.target instanceof HTMLCanvasElement && (e.buttons & 2)) e.preventDefault();
        }, { capture: true });

        return () => { off1(); off2(); off3(); };
    });
</script>

<svelte:window bind:innerWidth={w} bind:innerHeight={h} />

<p>
    This bouncing ball simulation is written in Rust with Nannou and compiled to WASM.
    <br>
    Controls: Scroll to change size, left click and drag to launch, right click to remove
    <br>
    You can find the source <a href="https://github.com/Cheese-Echidna/floob">here</a>.
</p>

<span bind:this={container} style="display:none;"></span>
