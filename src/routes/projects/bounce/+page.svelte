<script lang="ts">
    import init, {start} from "./floob_wasm";
    import Nannou from "$lib/components/Nannou.svelte";
</script>

<p>
    This bouncing ball simulation is written in Rust with Nannou and compiled to WASM.
    <br>
    Controls: Scroll to change size, left click and drag to launch, right click to remove.
    <br>
    You can find the source <a href="https://github.com/Cheese-Echidna/floob">here</a>.
</p>

<Nannou {init} {start}/>