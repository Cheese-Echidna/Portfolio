<script>
    import {formatDateTime} from "$lib/datetime.js";

    let {data, children} = $props();
    // console.log(data.current_pos)
</script>

{#if data.current_post}
    <h1>{data.current_post.title}</h1>
    <p>{formatDateTime(data.current_post.date)}</p>
    <hr>
{/if}


{@render children?.()}

<style lang="css">
    :global(img) {
        max-width: 70%;
        max-height: 50vh;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }


</style>