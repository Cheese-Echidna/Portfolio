<script>
    let {data} = $props();
</script>

<h1>Blog Posts</h1>

{#each data.posts as post}
    <a href="/blog/{post.slug}">{post.title}</a>
{/each}