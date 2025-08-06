export const posts = [
    {
        "title": "Blog Post No. 1",
        "summary": "A test blog post.",
        "date": 1754460955898,
        "author": "Gabriel Garriock",
        "slug": "first"
    },
    {
        "title": "Papero",
        "summary": "The first, the one, the only.",
        "date": 1754471613183,
        "author": "Gabriel Garriock",
        "slug": "papero"
    }
]

export interface Post {
    title: string;
    summary: string;
    date: number;
    author: string;
    slug: string;
}