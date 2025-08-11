<script lang="ts">
    import { on } from 'svelte/events';

    let w: number | undefined = $state();
    let h: number | undefined = $state();

    let container: HTMLElement | undefined = $state();
    let {init, start} = $props();

    function removeAll() {
        for (let canvas of document.getElementsByTagName('canvas')) {
            canvas.remove()
        }
    }

    $effect(() => {
        if (!container || !w || !h) return;
        removeAll();
        init().then(() => {
            if (!w || !h) return;
            start(w - 5, h - 200);
            console.log("Started");
        });
        return removeAll;
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

<span bind:this={container} style="display:none;"></span>

<style lang="css">
    :global(canvas) {
        /*width: 100% !important;*/
        /*height: auto !important;*/
        /*max-width: 100% !important;*/
        /*max-height: 80vh !important;*/
        /*aspect-ratio: calc(9/16);*/
        display: block;
    }
</style>