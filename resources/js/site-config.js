(function () {
    // ─── Assemble global vars ────────────────────────────────────────────────
    const sections = [
        window.SITE_DATA_PROFILE,
        window.SITE_DATA_PROJECTS,
        window.SITE_DATA_BLOGS,
        window.SITE_DATA_JOURNEY,
        window.SITE_DATA_NEWS,
        window.SITE_DATA_PUBLICATIONS,
    ];

    window.SITE_TEMPLATE_VARS = Object.assign({}, ...sections.filter(Boolean));
    const vars = window.SITE_TEMPLATE_VARS;

    // ─── Schema definitions ──────────────────────────────────────────────────
    // Each entry declares:
    //   required  – fields that must be present and non-empty on every item
    //   enums     – fields whose value must be one of the listed strings
    //   types     – fields whose JS typeof must match (use "array" for arrays)
    const COLLECTION_SCHEMAS = {
        projects: {
            required: ["title", "description", "status", "timeline", "technology"],
            enums: {
                status: ["In Progress", "Completed", "Discontinued"],
                Repo: ["Public", "Private"],
            },
            types: { pinned: "boolean", tags: "array" },
        },
        blogs: {
            required: ["title", "summary", "link", "date", "author", "status", "type"],
            enums: {
                type: ["talk", "blog"],
                mode: ["In-Person", "Online", "Hybrid"],
                file_type: ["pdf", "pptx", "ppt", "doc", "docx"],
            },
            types: { featured: "boolean", tags: "array" },
        },
        journey: {
            required: ["year", "icon", "location", "event", "outcome", "reward"],
        },
        news: {
            required: ["date", "headline"],
        },
        publications: {
            required: ["key", "author", "title", "year", "type"],
            enums: { type: ["article", "inproceedings", "book", "misc"] },
        },
    };

    // ─── Top-level scalar presence check ────────────────────────────────────
    const REQUIRED_SCALARS = ["Name", "Year", "LinkedIn_URL", "GitHub_URL", "CV_URL"];

    // ─── Validator ───────────────────────────────────────────────────────────
    const validate = () => {
        let totalIssues = 0;

        // 1. Required scalars
        REQUIRED_SCALARS.forEach((key) => {
            if (!vars[key]) {
                console.warn(`[site-data] profile — missing required scalar: "${key}"`);
                totalIssues++;
            }
        });

        // 2. Collections: existence + item-level schema
        Object.entries(COLLECTION_SCHEMAS).forEach(([collectionKey, schema]) => {
            const items = vars[collectionKey];

            if (!Array.isArray(items)) {
                console.warn(`[site-data] "${collectionKey}" — expected an array but got ${typeof items}`);
                totalIssues++;
                return;
            }

            items.forEach((item, idx) => {
                // Best human-readable label for the item in console output
                const label = item.title || item.headline || item.key || `index ${idx}`;
                const errors = [];

                // Required fields
                (schema.required || []).forEach((field) => {
                    const val = item[field];
                    const missing = val === undefined || val === null || val === "";
                    if (missing) errors.push(`missing required field: "${field}"`);
                });

                // Enum values
                Object.entries(schema.enums || {}).forEach(([field, allowed]) => {
                    const val = item[field];
                    if (val !== undefined && !allowed.includes(val)) {
                        errors.push(
                            `"${field}" has unexpected value "${val}" — allowed: ${allowed.map((v) => `"${v}"`).join(", ")}`
                        );
                    }
                });

                // Type checks
                Object.entries(schema.types || {}).forEach(([field, expectedType]) => {
                    const val = item[field];
                    if (val === undefined) return; // optional — absence is fine
                    const actuallyArray = Array.isArray(val);
                    if (expectedType === "array" && !actuallyArray) {
                        errors.push(`"${field}" should be an array, got ${typeof val}`);
                    } else if (expectedType !== "array" && !actuallyArray && typeof val !== expectedType) {
                        errors.push(`"${field}" should be ${expectedType}, got ${typeof val}`);
                    }
                });

                if (errors.length > 0) {
                    totalIssues += errors.length;
                    console.groupCollapsed(
                        `[site-data] ${collectionKey}[${idx}] — "${label}" — ${errors.length} issue(s)`
                    );
                    errors.forEach((e) => console.warn(e));
                    console.groupEnd();
                }
            });
        });

        // Summary line
        if (totalIssues === 0) {
            console.log("[site-data] ✓ All data valid — no schema issues found");
        } else {
            console.warn(`[site-data] ✗ ${totalIssues} schema issue(s) found — see grouped warnings above`);
        }
    };

    validate();
})();
