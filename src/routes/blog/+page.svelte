<script>
    import {formatDateTime} from "$lib/datetime.js";

    let {data} = $props();
</script>

<h1>Blog Posts</h1>
<ul>
    {#each data.posts as post}
        <li>
            <button onclick={() => window.location.href = `/blog/${post.slug}`}>
                {post.title} - {formatDateTime(post.date)} - {post.summary}
            </button>
        </li>
    {/each}
</ul>
<style>
    button {
        text-align: left;
    }
</style>