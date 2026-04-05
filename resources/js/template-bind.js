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

    const parseDateValue = (value) => {
        if (!value) return 0;
        const ts = new Date(value).getTime();
        return Number.isNaN(ts) ? 0 : ts;
    };

    const parseTimelineParts = (timeline) => {
        if (!timeline || typeof timeline !== "string") return { start: 0, end: 0 };

        const parts = timeline.split("-").map((p) => p.trim()).filter(Boolean);
        const startRaw = parts[0] || "";
        const endRaw = parts[1] || "";

        const start = parseDateValue(startRaw);
        const end = /ongoing/i.test(endRaw) ? Number.MAX_SAFE_INTEGER : parseDateValue(endRaw);

        return { start, end };
    };

    const getProjectStatusRank = (status) => {
        const s = String(status || "").toLowerCase();
        if (s.includes("progress") || s.includes("active")) return 0;
        if (s.includes("completed")) return 1;
        if (s.includes("discontinued")) return 2;
        return 1;
    };

    const normalizeBlogs = (items) => {
        return [...items]
            .map((item) => {
                const tags = Array.isArray(item.tags)
                    ? item.tags.join(" • ")
                    : (item.tags || "");

                const extraMeta = [item.event, item.mode, item.location, item.file_type]
                    .filter(Boolean)
                    .join(" • ");

                return {
                    ...item,
                    tags,
                    extra_meta: extraMeta,
                };
            })
            .sort((a, b) => parseDateValue(b.date) - parseDateValue(a.date));
    };

    const normalizeNews = (items) => {
        return [...items].sort((a, b) => parseDateValue(b.date) - parseDateValue(a.date));
    };

    const normalizeProjects = (items) => {
        return [...items].sort((a, b) => {
            const rankA = getProjectStatusRank(a.status);
            const rankB = getProjectStatusRank(b.status);
            if (rankA !== rankB) return rankA - rankB;

            const ta = parseTimelineParts(a.timeline);
            const tb = parseTimelineParts(b.timeline);

            // Active/In Progress -> sort by start date desc
            if (rankA === 0) return tb.start - ta.start;

            // Completed/Discontinued -> sort by end date desc
            return tb.end - ta.end;
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
            const sourceItems = vars[key];
            if (!Array.isArray(sourceItems)) return;
            const tmpl = container.querySelector('template');
            if (!tmpl) return;

            let items = sourceItems;
            if (key === "blogs") items = normalizeBlogs(sourceItems);
            if (key === "news") items = normalizeNews(sourceItems);
            if (key === "projects") items = normalizeProjects(sourceItems);

            items.forEach(item => {
                const clone = tmpl.content.cloneNode(true); // DocumentFragment
                walkNodes(clone, (s) => replaceItemTokens(s, item));
                container.appendChild(clone);
            });
        });
    };

    // Works whether this script is loaded statically or dynamically via site-bootstrap.js.
    var _domReady = function (fn) {
        if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', fn); }
        else { fn(); }
    };
    _domReady(() => {
        // Pre-resolve cross-references in scalar vars before the DOM walk.
        // This allows one var's value to reference another, e.g.:
        //   About_Collaboration: "... contact me at {Email}."
        // Without this, {Email} would remain unresolved because the DOM walker
        // is single-pass and won't revisit a text node after it has been replaced.
        Object.keys(vars).forEach((key) => {
            if (typeof vars[key] === 'string') vars[key] = replaceTokens(vars[key]);
        });

        walkNodes(document.body, replaceTokens);
        document.title = replaceTokens(document.title);
        renderArrays();

        document.querySelectorAll('.project-list .project-item').forEach(projectEl => {
            const title = projectEl.querySelector('h3')?.textContent?.trim() || 'Project';
            const projectLinkEl = projectEl.querySelector('.project-link');
            const presentationLinkEl = projectEl.querySelector('.project-presentation-link');
            const linksWrapEl = projectEl.querySelector('.project-links');

            if (projectLinkEl) {
                const href = (projectLinkEl.getAttribute('href') || '').trim();
                if (!href) projectLinkEl.style.display = 'none';
            }

            if (presentationLinkEl) {
                const href = (presentationLinkEl.getAttribute('href') || '').trim();
                if (!href) {
                    presentationLinkEl.style.display = 'none';
                } else if (/\.pdf(\?|$)/i.test(href)) {
                    const viewerHref = `pdf-viewer.html?file=${encodeURIComponent(href)}&title=${encodeURIComponent(title)}&file_type=pptx`;
                    presentationLinkEl.setAttribute('href', viewerHref);
                    presentationLinkEl.setAttribute('target', '_self');
                    presentationLinkEl.removeAttribute('rel');
                }
            }

            if (linksWrapEl) {
                const visibleLinks = Array.from(linksWrapEl.querySelectorAll('a')).filter(link => link.style.display !== 'none');
                if (visibleLinks.length === 0) linksWrapEl.style.display = 'none';
            }
        });

        // Route PDF links in Talks & Blogs to in-site viewer
        document.querySelectorAll('.blog-list a.item-link').forEach(linkEl => {
            const href = linkEl.getAttribute('href') || "";
            if (!/\.pdf(\?|$)/i.test(href)) return;

            const itemTitle = linkEl.closest('.blog-item')?.querySelector('h3')?.textContent?.trim() || "Document";
            const itemFileType = (linkEl.getAttribute('data-file-type') || "").trim().toLowerCase();
            const itemDate = (linkEl.getAttribute('data-date') || "").trim();
            const itemEvent = (linkEl.getAttribute('data-event') || "").trim();
            const itemMode = (linkEl.getAttribute('data-mode') || "").trim();
            const itemLocation = (linkEl.getAttribute('data-location') || "").trim();
            const itemAuthor = (linkEl.getAttribute('data-author') || "").trim();
            const itemStatus = (linkEl.getAttribute('data-status') || "").trim();

            const viewerHref = `pdf-viewer.html?file=${encodeURIComponent(href)}`
                + `&title=${encodeURIComponent(itemTitle)}`
                + `&file_type=${encodeURIComponent(itemFileType)}`
                + `&date=${encodeURIComponent(itemDate)}`
                + `&event=${encodeURIComponent(itemEvent)}`
                + `&mode=${encodeURIComponent(itemMode)}`
                + `&location=${encodeURIComponent(itemLocation)}`
                + `&author=${encodeURIComponent(itemAuthor)}`
                + `&status=${encodeURIComponent(itemStatus)}`;
            linkEl.setAttribute('href', viewerHref);
            linkEl.setAttribute('target', '_self');
            linkEl.removeAttribute('rel');
            linkEl.textContent = "Open document →";
        });

        document.querySelectorAll('.news-list .news-item').forEach(newsEl => {
            const title = newsEl.querySelector('h3')?.textContent?.trim() || 'News update';
            const linkEl = newsEl.querySelector('.news-headline-link');
            const dateText = newsEl.querySelector('.eyebrow')?.textContent?.trim() || '';

            if (!linkEl) return;

            const href = (linkEl.getAttribute('href') || '').trim();
            if (!href) {
                linkEl.removeAttribute('href');
                linkEl.removeAttribute('target');
                linkEl.removeAttribute('rel');
                linkEl.classList.add('is-static');
                return;
            }

            if (/\.pdf(\?|$)/i.test(href)) {
                const itemFileType = /\/talks\//i.test(href) ? 'pptx' : 'pdf';

                const viewerHref = `pdf-viewer.html?file=${encodeURIComponent(href)}`
                    + `&title=${encodeURIComponent(title)}`
                    + `&file_type=${encodeURIComponent(itemFileType)}`
                    + `&date=${encodeURIComponent(dateText)}`;

                linkEl.setAttribute('href', viewerHref);
                linkEl.setAttribute('target', '_self');
                linkEl.removeAttribute('rel');
            }
        });
    });
})();
