<script>
    // Svelte 5: run on the client after mount
    $effect(async () => {
        // Option A: import the JS glue from /static
        const init = (await import('/wasm/wallpaper/wallpaper_wasm.js?url')).default;

        // Most wasm-bindgen glue can find the .wasm automatically if it sits next to the .js.
        // If your build expects the .wasm URL explicitly, pass it in:
        // const wasmUrl = asset('wasm/wallpaper_wasm_bg.wasm'); // resolves correctly with base/assets
        // await init(wasmUrl);

        await init();
        console.log('WASM module initialized!');
    });
</script>