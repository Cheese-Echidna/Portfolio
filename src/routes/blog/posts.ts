export const posts = [
    {
        "title": "Blog Post No. 1",
        "summary": "A test blog post, designed just to make sure this site is working.",
        "date": 1754460955898,
        "author": "Gabriel Garriock",
        "slug": "first"
    }
]

export interface Post {
    title: string;
    summary: string;
    date: number;
    author: string;
    slug: string;
}