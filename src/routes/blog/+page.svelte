<script>
    import {formatDateTime} from "$lib/datetime.js";

    let {data} = $props();
</script>

<h1>Blog Posts</h1>

{#each data.posts as post}
    <button onclick={() => window.location.href = `/blog/${post.slug}`}>
        {post.title} - {formatDateTime(post.date)} - {post.summary}
    </button>
{/each}
