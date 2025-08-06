import { posts, type Post } from './posts';

export function load(params) : {posts: Post[], current_pos: Post | undefined} {
    let slug = params.url.pathname.split('/').at(2);
    console.log(slug);
    return {
        posts,
        current_pos: posts.find(post => post.slug === slug),
    };
}