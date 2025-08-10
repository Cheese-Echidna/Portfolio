<script lang="ts">
    import init, {start} from "./geo";
    import Nannou from "$lib/components/Nannou.svelte";
</script>

<p>
    Use the number keys (1-9) to switch rendering modes
</p>

<Nannou {init} {start}/>