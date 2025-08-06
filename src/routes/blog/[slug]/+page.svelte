<script lang="ts">
    import { page } from '$app/state';
    import {marked} from "marked";

    let {data} = $props();
    let slug = page.url.pathname.split('/')[2];
    let post = data.posts.find((x) => x.slug === slug);

    function mark(txt: string): any {
        return marked(txt, {async: false}).replaceAll(/(src|href)="[^\/"][^":]+"/g, (str) => {
            let n = str.replace("=\"", `=\"/blog_posts/${slug}/`);
            console.log(str, "->", n)
            return n;
        });
    }
</script>

{#if !post}
    Error 404 - Post not found.
{:else}
    <h1>{post.title}</h1>
    <h3>{post.author} - {post.date}</h3>
    {@html mark(post.content)}
{/if}