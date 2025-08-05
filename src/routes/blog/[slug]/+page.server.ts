import { error } from '@sveltejs/kit';
import { loadPosts } from "../+page.server"

export function load({ params }) {
    const posts = loadPosts();
    const post = posts.posts.find((post) => post.slug === params.slug);

    if (!post) error(404);

    return {
        post
    };
}
