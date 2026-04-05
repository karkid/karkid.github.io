(function () {
    const STORAGE_KEY = "site-theme";
    const vars = window.SITE_TEMPLATE_VARS || {};

    const applyTheme = (theme) => {
        document.body.setAttribute("data-theme", theme);
        const btn = document.querySelector(".theme-toggle");
        if (btn) {
            btn.setAttribute("aria-pressed", String(theme === "dark"));
            btn.textContent = theme === "dark" ? "☀ Light" : "🌙 Dark";
        }
    };

    const getInitialTheme = () => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === "dark" || stored === "light") return stored;

        const configured = vars.default_theme || vars.Default_Theme || vars.Theme_Default;
        if (configured === "dark" || configured === "light") return configured;

        return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    };

    // Works whether this script is loaded statically or dynamically via site-bootstrap.js.
    var _domReady = function (fn) {
        if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', fn); }
        else { fn(); }
    };
    _domReady(() => {
        applyTheme(getInitialTheme());

        const btn = document.querySelector(".theme-toggle");
        if (!btn) return;

        btn.addEventListener("click", () => {
            const current = document.body.getAttribute("data-theme") === "dark" ? "dark" : "light";
            const next = current === "dark" ? "light" : "dark";
            localStorage.setItem(STORAGE_KEY, next);
            applyTheme(next);
        });
    });
})();
