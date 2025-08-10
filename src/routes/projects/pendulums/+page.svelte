<script lang="ts">
    import init, {start} from "./pen";
    import Nannou from "$lib/components/Nannou.svelte";
</script>

<p>
    Have some fun with the settings on this one. You may need to reload if you resize the page.
    <br>
    I recommend you crank up the number of pendulums and then hit "Reset" to restart the simulation.
</p>

<Nannou {init} {start}/>