(function () {
    const vars = window.SITE_TEMPLATE_VARS || {};

    // Replace {Key} scalar tokens
    const replaceTokens = (input) => {
        if (typeof input !== "string" || !input.includes("{")) return input;
        return input.replace(/\{([A-Za-z0-9_]+)\}/g, (match, key) => {
            const val = vars[key];
            return Object.prototype.hasOwnProperty.call(vars, key) && !Array.isArray(val)
                ? String(val) : match;
        });
    };

    // Replace {{key}} item tokens
    const replaceItemTokens = (input, item) => {
        if (typeof input !== "string" || !input.includes("{")) return input;
        return input.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
            return Object.prototype.hasOwnProperty.call(item, key) ? String(item[key]) : "";
        });
    };

    // Walk any node type: TEXT, ELEMENT, or DOCUMENT_FRAGMENT
    const walkNodes = (node, replaceFn) => {
        if (node.nodeType === Node.TEXT_NODE) {
            node.nodeValue = replaceFn(node.nodeValue);
            return;
        }
        // Allow both Element (1) and DocumentFragment (11)
        if (node.nodeType === Node.ELEMENT_NODE) {
            for (const attr of Array.from(node.attributes || [])) {
                const next = replaceFn(attr.value);
                if (next !== attr.value) node.setAttribute(attr.name, next);
            }
        } else if (node.nodeType !== 11 /* DOCUMENT_FRAGMENT_NODE */) {
            return; // skip comments, CDATA, etc.
        }
        for (const child of Array.from(node.childNodes)) walkNodes(child, replaceFn);
    };

    // Render data-each containers from array vars
    const renderArrays = () => {
        document.querySelectorAll('[data-each]').forEach(container => {
            const key = container.dataset.each;
            const items = vars[key];
            if (!Array.isArray(items)) return;
            const tmpl = container.querySelector('template');
            if (!tmpl) return;
            items.forEach(item => {
                const clone = tmpl.content.cloneNode(true); // DocumentFragment
                walkNodes(clone, (s) => replaceItemTokens(s, item));
                container.appendChild(clone);
            });
        });
    };

    document.addEventListener("DOMContentLoaded", () => {
        walkNodes(document.body, replaceTokens);
        document.title = replaceTokens(document.title);
        renderArrays();
    });
})();
