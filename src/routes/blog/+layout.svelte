<script>
    import {formatDateTime} from "$lib/datetime.js";

    let {data, children} = $props();
    console.log(data.current_pos)
</script>

{#if data.current_pos}
    <h1>{data.current_pos.title}</h1>
<!--    <p>By: {data.current_pos.author}</p>-->
    <p>{formatDateTime(data.current_pos.date)}</p>
{/if}

{@render children?.()}