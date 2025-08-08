export function typewriter(
    node: Element,
    { speed = 1 }: { speed?: number } = {}
) {
    // --- 1. Build a flat token list from the DOM, splitting text into chars ---
    type Token =
        | { type: 'open'; tagName: string; attrs: string; html: string }
        | { type: 'close'; tagName: string; html: string }
        | { type: 'br'; html: string }
        | { type: 'char'; char: string }
        | { type: 'pause' }
        | { type: 'backspace' };

    const tokens: Token[] = [];

    function pushTextTokens(text: string) {
        // Iterate code points to catch VS16 (U+FE0F) after our control glyphs
        const cps = Array.from(text);
        for (let i = 0; i < cps.length; i++) {
            const ch = cps[i];

            // Pause: U+23F8, optionally followed by U+FE0F
            if (ch === '\u23F8') {
                if (cps[i + 1] === '\uFE0F') i++;
                tokens.push({ type: 'pause' });
                continue;
            }

            // Backspace: U+25C0, optionally followed by U+FE0F
            if (ch === '\u25C0') {
                if (cps[i + 1] === '\uFE0F') i++;
                tokens.push({ type: 'backspace' });
                continue;
            }

            tokens.push({ type: 'char', char: ch });
        }
    }

    function walk(n: Node) {
        if (n.nodeType === Node.TEXT_NODE) {
            pushTextTokens(n.textContent || '');
        } else if (
            n.nodeType === Node.ELEMENT_NODE &&
            (n as Element).tagName === 'BR'
        ) {
            tokens.push({ type: 'br', html: '<br>' });
        } else if (n.nodeType === Node.ELEMENT_NODE) {
            const el = n as Element;
            const tag = el.tagName.toLowerCase();
            // reconstruct attribute string
            const attrs = Array.from(el.attributes)
                .map(a => `${a.name}="${a.value}"`)
                .join(' ');
            const openHtml = `<${tag}${attrs ? ' ' + attrs : ''}>`;
            const closeHtml = `</${tag}>`;

            tokens.push({ type: 'open', tagName: tag, attrs, html: openHtml });
            for (const c of Array.from(el.childNodes)) walk(c);
            tokens.push({ type: 'close', tagName: tag, html: closeHtml });
        }
    }

    Array.from(node.childNodes).forEach(n => walk(n));

    // --- 2. Determine total “units” (chars + <br>s + controls) ---
    const total = tokens.reduce(
        (sum, t) =>
            sum +
            (t.type === 'char' ||
            t.type === 'br' ||
            t.type === 'pause' ||
            t.type === 'backspace'
                ? 1
                : 0),
        0
    );

    const duration = total / (speed * 0.01);

    return {
        duration,
        tick: (t: number) => {
            let unitsToProcess = Math.trunc(total * t);

            const out: string[] = [];
            const openStack: string[] = [];

            // Track where visible pieces (chars or <br>) land in `out`,
            // so backspace can remove them even after more HTML is added.
            const visibleIdx: number[] = [];

            const maybeBreak = () => unitsToProcess <= 0;

            for (const tok of tokens) {
                if (tok.type === 'open') {
                    out.push(tok.html);
                    openStack.push(tok.tagName);
                    continue;
                }

                if (tok.type === 'close') {
                    if (openStack[openStack.length - 1] === tok.tagName) {
                        openStack.pop();
                        out.push(tok.html);
                    }
                    continue;
                }

                if (tok.type === 'br') {
                    if (maybeBreak()) break;
                    out.push(tok.html);
                    visibleIdx.push(out.length - 1);
                    unitsToProcess -= 1;
                    if (maybeBreak()) break;
                    continue;
                }

                if (tok.type === 'pause') {
                    if (maybeBreak()) break;
                    // consume time, no output
                    unitsToProcess -= 1;
                    if (maybeBreak()) break;
                    continue;
                }

                if (tok.type === 'backspace') {
                    if (maybeBreak()) break;
                    // consume time, remove last visible (char or <br>) if any
                    const idx = visibleIdx.pop();
                    if (idx != null) {
                        out.splice(idx, 1);
                        // fix stored indices beyond the removed slot
                        for (let i = 0; i < visibleIdx.length; i++) {
                            if (visibleIdx[i] > idx) visibleIdx[i] -= 1;
                        }
                    }
                    unitsToProcess -= 1;
                    if (maybeBreak()) break;
                    continue;
                }

                // normal character
                if (tok.type === 'char') {
                    if (maybeBreak()) break;
                    const esc = tok.char
                        .replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;');
                    out.push(esc);
                    visibleIdx.push(out.length - 1);
                    unitsToProcess -= 1;
                    if (maybeBreak()) break;
                    continue;
                }
            }

            // close any still-open tags
            while (openStack.length > 0) {
                const tag = openStack.pop()!;
                out.push(`</${tag}>`);
            }

            node.innerHTML = out.join('');
        }
    };
}
