export function typewriter(
    node: Element,
    { speed = 1 }: { speed?: number } = {}
) {
    // allow any number of text nodes and <br> elements
    const children = Array.from(node.childNodes);
    const valid = children.length > 0 && children.every(
        (n) =>
            n.nodeType === Node.TEXT_NODE ||
            (n.nodeType === Node.ELEMENT_NODE && (n as Element).tagName === 'BR')
    );
    if (!valid) {
        throw new Error(
            `This transition only works on elements whose children are text nodes or <br> elements`
        );
    }

    // build a flat list of segments: text segments and “br” markers
    const segments: Array<{ type: 'text'; text: string } | { type: 'br' }> =
        children.map((n) =>
            n.nodeType === Node.TEXT_NODE
                ? { type: 'text', text: n.textContent! }
                : { type: 'br' }
        );

    // count total “characters” (treat each <br> as one)
    const total = segments.reduce(
        (sum, seg) => sum + (seg.type === 'text' ? seg.text.length : 1),
        0
    );

    const duration = total / (speed * 0.01);

    return {
        duration,
        tick: (t: number) => {
            // how many “characters” to show
            let remaining = Math.trunc(total * t);

            // rebuild contents
            node.innerHTML = '';
            for (const seg of segments) {
                if (remaining <= 0) break;

                if (seg.type === 'br') {
                    if (remaining >= 1) {
                        node.appendChild(document.createElement('br'));
                        remaining -= 1;
                    }
                } else {
                    const slice = seg.text.slice(0, remaining);
                    node.appendChild(document.createTextNode(slice));
                    remaining -= slice.length;
                }
            }
        }
    };
}
