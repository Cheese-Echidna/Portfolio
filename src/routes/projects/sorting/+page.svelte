<script lang="ts">
    import init, {start} from "./sort";
    import Nannou from "$lib/components/Nannou.svelte";
</script>

<p>
    (Unfortunately I couldn't get the sounds to work)
</p>

<Nannou {init} {start} num_lines_text={1}/>