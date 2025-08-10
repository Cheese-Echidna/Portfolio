<script lang="ts">
    import init, {start} from "./wallpaper_wasm";
    import Nannou from "$lib/components/Nannou.svelte";

</script>

<p>
    This project is for a wallpaper and screensaver for me.
    <br />
    You can find the source <a href="https://github.com/Cheese-Echidna/SemiCircles">here</a>.
</p>

<Nannou {init} {start} />