// +layout.server.ts (or +page.server.ts)
import {
    VERCEL_GIT_COMMIT_SHA,
    VERCEL_GIT_REPO_OWNER,
    VERCEL_GIT_REPO_SLUG
} from '$env/static/private';

export const load = () => {
    const sha = VERCEL_GIT_COMMIT_SHA || '';
    const short = sha.slice(0, 7);
    const url =
        sha && VERCEL_GIT_REPO_OWNER && VERCEL_GIT_REPO_SLUG
            ? `https://github.com/${VERCEL_GIT_REPO_OWNER}/${VERCEL_GIT_REPO_SLUG}/commit/${sha}`
            : null;

    return { commit: { sha, short, url } };
};
