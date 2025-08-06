import {readdirSync, readFileSync} from 'fs';
import {join} from 'path';

interface Post {
    title: string;
    date: string;
    author: string;
    content: string;
    slug: string;
}

export function _loadPosts() {
    const postsDirectory = join(process.cwd(), '/static/blog_posts/');
    const posts: Post[] = [];

    try {
        const directories = readdirSync(postsDirectory);

        for (const dir of directories) {
            const contentPath = join(postsDirectory, dir, 'content.md');
            try {
                const content = readFileSync(contentPath, 'utf-8');
                const lines = content.split('\n');

                const components = ["Title", "Date", "Author"];

                const results = components.map((component, index) => {
                    const parts = lines[index].split("=");
                    console.assert(parts.length == 2);
                    console.assert(parts[0] == component);
                    const result = parts[1];
                    if (!result) {
                        throw new Error(`Could not find component \`${component}\``);
                    }
                    return result;
                });

                posts.push({
                    title: results[0],
                    date: results[1],
                    author: results[2],
                    content: lines.slice(3).join('\n'),
                    slug: dir,
                })

            } catch (error) {
                console.error(`Error reading ${contentPath}:`, error);
            }
        }
    } catch (error) {
        console.error('Error reading posts directory:', error);
    }

    // console.log(posts);

    return {
        posts
    };
}

export const load = _loadPosts;