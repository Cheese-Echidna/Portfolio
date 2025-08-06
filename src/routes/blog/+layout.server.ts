import { posts, type Post } from './posts';

export function load(params) : {posts: Post[], current_post: Post | undefined} {
    let slug = params.url.pathname.split('/').at(2);
    return {
        posts,
        current_post: posts.find(post => post.slug === slug),
    };
}