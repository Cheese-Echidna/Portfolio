export function typewriter(
    node: Element,
    { speed = 1 }: { speed?: number } = {}
) {
    // --- 1. Build a flat token list from the DOM, splitting text into chars ---
    type Token =
        | { type: 'open'; tagName: string; attrs: string; html: string }
        | { type: 'close'; tagName: string; html: string }
        | { type: 'br'; html: string }
        | { type: 'char'; char: string };

    const tokens: Token[] = [];

    function walk(n: Node) {
        if (n.nodeType === Node.TEXT_NODE) {
            const text = n.textContent || '';
            for (const ch of text) {
                tokens.push({ type: 'char', char: ch });
            }
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

    // --- 2. Determine total “units” (chars + <br>s) ---
    const total = tokens.reduce(
        (sum, t) => sum + (t.type === 'char' || t.type === 'br' ? 1 : 0),
        0
    );

    const duration = total / (speed * 0.01);

    return {
        duration,
        tick: (t: number) => {
            let remaining = Math.trunc(total * t);

            const out: string[] = [];
            const openStack: string[] = [];

            for (const tok of tokens) {
                if (tok.type === 'open') {
                    out.push(tok.html);
                    openStack.push(tok.tagName);
                } else if (tok.type === 'close') {
                    // only close if we have it open
                    if (openStack[openStack.length - 1] === tok.tagName) {
                        openStack.pop();
                        out.push(tok.html);
                    }
                } else if (tok.type === 'br') {
                    if (remaining > 0) {
                        out.push(tok.html);
                        remaining -= 1;
                    } else {
                        break;
                    }
                } else if (tok.type === 'char') {
                    if (remaining > 0) {
                        // escape HTML chars
                        const esc = tok.char
                            .replace(/&/g, '&amp;')
                            .replace(/</g, '&lt;')
                            .replace(/>/g, '&gt;');
                        out.push(esc);
                        remaining -= 1;
                    } else {
                        break;
                    }
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
