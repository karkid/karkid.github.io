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

    const formatDateLabel = (value) => {
        if (!value) return "";
        const ts = parseDateValue(value);
        if (!ts) return String(value);
        return new Intl.DateTimeFormat(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
        }).format(new Date(ts));
    };

    const humanizeKey = (value) => {
        return String(value || "")
            .replace(/[_-]+/g, " ")
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .replace(/\b\w/g, (match) => match.toUpperCase());
    };

    const MISC_DEFAULT_IMAGES = {
        Reading: "../resources/img/misc/reading.svg",
        Watching: "../resources/img/misc/watching.svg",
        Listening: "../resources/img/misc/listening.svg",
        Gaming: "../resources/img/misc/gaming.svg",
        Exploring: "../resources/img/misc/exploring.svg",
    };

    const countryCodeToFlag = (code) => {
        if (!code || code.length !== 2) return '';
        const upper = code.toUpperCase();
        return [...upper].map(c => String.fromCodePoint(0x1F1E6 - 65 + c.charCodeAt(0))).join('');
    };

    const normalizeMiscellaneous = (items) => {
        return [...items]
            .map((item, idx) => {
                const tags = Array.isArray(item.tags) ? item.tags : [];
                const metadata = item.metadata && typeof item.metadata === 'object' && !Array.isArray(item.metadata)
                    ? item.metadata
                    : {};
                const id = item.id ?? idx + 1;
                const isExploring = item.category === 'Exploring';
                const placeName = metadata.place || item.place || item.title || '';
                const title = isExploring
                    ? (placeName || metadata.location || 'Exploring')
                    : (item.title || (item.category === 'Reflections' ? `Reflection ${idx + 1}` : item.category));
                const imageUrl = item.imageUrl || MISC_DEFAULT_IMAGES[item.category] || '';

                const countryFlag = countryCodeToFlag(metadata.countryCode || '');
                const geotag = metadata.geotag || '';
                const location = metadata.location || '';
                const mapQuery = geotag || location;
                const mapUrl = mapQuery
                    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`
                    : '';

                const additionalMetadata = metadata.additional && typeof metadata.additional === 'object' && !Array.isArray(metadata.additional)
                    ? metadata.additional
                    : {};

                const baseMetadataSummary = Object.entries(metadata)
                    .filter(([k, value]) => !['countryCode', 'geotag', 'location', 'place', 'additional'].includes(k) && value !== undefined && value !== null && value !== "")
                    .map(([k, v]) => `${humanizeKey(k)}: ${v}`);

                const additionalSummary = Object.entries(additionalMetadata)
                    .filter(([, value]) => value !== undefined && value !== null && value !== "")
                    .map(([k, v]) => `${humanizeKey(k)}: ${v}`);

                const metadataSummary = [...baseMetadataSummary, ...additionalSummary].join(" • ");

                return {
                    ...item,
                    id,
                    title,
                    imageUrl,
                    countryFlag,
                    mapUrl,
                    location,
                    location_label: location,
                    geotag,
                    type: item.type || item.category,
                    tags_summary: tags.join(" • "),
                    tags_key: tags.map((tag) => String(tag).toLowerCase()).join("|"),
                    metadata_summary: metadataSummary,
                    display_date: formatDateLabel(item.date || item.createdAt),
                };
            })
            .sort((a, b) => parseDateValue(b.date || b.createdAt) - parseDateValue(a.date || a.createdAt));
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
            if (key === "miscellaneous") items = normalizeMiscellaneous(sourceItems);

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

        document.querySelectorAll('.misc-list .misc-item').forEach((itemEl) => {
            const category = (itemEl.dataset.category || '').trim();
            const tagsEl = itemEl.querySelector('.misc-tags');
            const metaEl = itemEl.querySelector('.misc-meta');
            const placeEl = itemEl.querySelector('.misc-place');
            const linkEl = itemEl.querySelector('.misc-link');
            const mediaEl = itemEl.querySelector('.misc-media');
            const imageEl = itemEl.querySelector('.misc-image');

            if (tagsEl) {
                if (category !== 'Reflections') {
                    tagsEl.style.display = 'none';
                } else {
                    const raw = tagsEl.textContent.trim();
                    if (raw) {
                        const parts = raw
                            .split('•')
                            .map((tag) => tag.trim())
                            .filter(Boolean);

                        tagsEl.textContent = '';
                        parts.forEach((tag) => {
                            const tagKey = String(tag).toLowerCase().replace(/[^a-z0-9]/g, '');
                            const badge = document.createElement('span');
                            badge.className = 'misc-tag-badge';
                            badge.dataset.tagKey = tagKey;
                            if (tagKey) badge.classList.add(`tag-${tagKey}`);
                            badge.textContent = tag;
                            tagsEl.appendChild(badge);
                        });
                    }
                }
            }

            if (mediaEl && imageEl) {
                const src = (imageEl.getAttribute('src') || '').trim();
                if (!src) {
                    mediaEl.classList.add('is-empty');
                    imageEl.removeAttribute('src');
                } else {
                    imageEl.addEventListener('error', () => {
                        mediaEl.classList.add('is-empty');
                    }, { once: true });
                }
            }

            if (tagsEl && !tagsEl.textContent.trim()) tagsEl.style.display = 'none';
            if (metaEl && !metaEl.textContent.trim()) metaEl.style.display = 'none';
            if (placeEl && !placeEl.textContent.trim()) placeEl.style.display = 'none';

            if (category === 'Exploring' && metaEl) {
                const rawMeta = metaEl.textContent.trim();
                if (rawMeta) {
                    const parts = rawMeta
                        .split('•')
                        .map((s) => s.trim())
                        .filter(Boolean);

                    if (parts.length > 0) {
                        metaEl.textContent = '';
                        parts.forEach((part) => {
                            const chip = document.createElement('span');
                            chip.className = 'misc-meta-pill';
                            chip.textContent = part;
                            metaEl.appendChild(chip);
                        });
                    }
                }
            }

            if (linkEl) {
                const href = (linkEl.getAttribute('href') || '').trim();
                if (!href) linkEl.style.display = 'none';
            }

            // Exploring: inject flag + geo footer
            if (category === 'Exploring') {
                const overlay = itemEl.querySelector('.misc-overlay');
                const flag = (itemEl.dataset.flag || '').trim();
                const geotag = (itemEl.dataset.geotag || '').trim();
                const map = (itemEl.dataset.mapUrl || '').trim();

                if (overlay && (flag || map)) {
                    const footer = document.createElement('div');
                    footer.className = 'misc-explore-footer';

                    if (flag) {
                        const flagSpan = document.createElement('span');
                        flagSpan.className = 'misc-explore-flag';
                        flagSpan.textContent = flag;
                        footer.appendChild(flagSpan);
                    }

                    if (map) {
                        const mapLink = document.createElement('a');
                        mapLink.className = 'misc-explore-map';
                        mapLink.href = map;
                        mapLink.target = '_blank';
                        mapLink.rel = 'noopener noreferrer';
                        mapLink.setAttribute('aria-label', geotag ? `Open ${geotag} in Google Maps` : 'Open location in Google Maps');
                        if (geotag) mapLink.title = geotag;
                        mapLink.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>';
                        footer.appendChild(mapLink);
                    }

                    // Append directly to card (not inside overlay) so it's always visible
                    itemEl.appendChild(footer);
                }
            }
        });
    });
})();
