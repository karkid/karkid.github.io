/**
 * site-head.js — Centralized <head> asset injector.
 *
 * Place ONE script tag in each page's <head> (after <title>):
 *   <script src="../resources/js/site-head.js"></script>
 *
 * This script runs synchronously during HTML parsing and uses document.write
 * to inject the favicon and all shared CSS <link> tags inline into the stream.
 * Because document.write is called during parsing, the browser treats the
 * injected <link> tags exactly like static ones — rendering blocks until the
 * stylesheets are loaded, so there is NO flash of unstyled content (FOUC).
 */
(function () {
    // Derive the site root URL from this script's own absolute URL.
    // e.g. "https://example.com/resources/js/site-head.js" → "https://example.com/"
    var base = document.currentScript.src.replace(/resources\/js\/site-head\.js.*$/, '');

    document.write(
        // Prevent Chrome (and other browsers) from offering to translate the page.
        // The journey/news pages contain Indian place names that trip the language detector.
        '<meta name="google" content="notranslate" />\n' +
        '<link rel="icon" type="image/svg+xml" href="' + base + 'resources/img/favicon-graph.svg" />\n' +
        '<link rel="stylesheet" type="text/css" href="' + base + 'venders/css/normalize.css" />\n' +
        '<link rel="stylesheet" type="text/css" href="' + base + 'venders/css/ionicons.css" />\n' +
        '<link rel="stylesheet" type="text/css" href="' + base + 'resources/css/minimal.css" />\n' +
        // Hide body until site-shell.js has rendered the header/footer, preventing
        // the visible layout pop caused by the empty #site-header div on first paint.
        '<style>body{opacity:0;transition:opacity 0.15s ease;}</style>'
    );
})();
