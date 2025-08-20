export const posts = [
    // {
    //     "title": "Raytracing in Rust",
    //     "summary": "CPU ray(path) tracing in Rust.",
    //     "date": 1754954643332,
    //     "author": "Gabriel Garriock",
    //     "slug": "ray"
    // },
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