/**
 * site-bootstrap.js — Single-tag script loader for all shared scripts.
 *
 * Place ONE script tag at the bottom of each page's <body> (before any
 * page-specific inline scripts):
 *   <script src="../resources/js/site-bootstrap.js"></script>
 *
 * This replaces the 10 individual <script> tags that every page used to have.
 * Scripts are loaded sequentially so each one can depend on the previous
 * (e.g. site-config.js depends on the 6 site-data/* files being loaded first).
 *
 * Timing note: because this file is a synchronous <script> at the bottom of
 * <body>, it runs before DOMContentLoaded fires. The scripts it loads
 * dynamically will execute after DOMContentLoaded has already fired. That is
 * why site-shell.js, template-bind.js, and theme-toggle.js use a readyState-
 * aware helper instead of a plain addEventListener('DOMContentLoaded', ...).
 */
(function () {
    // Derive the resources/js/ base URL from this script's own absolute URL.
    // e.g. "https://example.com/resources/js/site-bootstrap.js"
    //   → "https://example.com/resources/js/"
    var base = document.currentScript.src.replace(/[^/]+$/, '');

    var scripts = [
        'site-data/profile.js',
        'site-data/projects.js',
        'site-data/blogs.js',
        'site-data/journey.js',
        'site-data/news.js',
        'site-data/publications.js',
        'site-config.js',
        'site-shell.js',
        'template-bind.js',
        'theme-toggle.js',
    ];

    function load(index) {
        if (index >= scripts.length) {
            // All shared scripts have loaded and executed (including template-bind.js
            // which renders the list items). Signal page-specific scripts that the
            // page is fully ready — they listen on 'site:ready' instead of
            // DOMContentLoaded so they can safely query rendered DOM items.
            document.dispatchEvent(new CustomEvent('site:ready'));
            return;
        }
        var s = document.createElement('script');
        s.src = base + scripts[index];
        s.onload = function () { load(index + 1); };
        s.onerror = function () { load(index + 1); }; // keep going on error
        document.head.appendChild(s);
    }

    load(0);
})();
