(function () {
    const readVar = (vars, key, fallback = "") => {
        if (Object.prototype.hasOwnProperty.call(vars, key)) return String(vars[key]);
        return fallback;
    };

    const navItems = [
        { key: "about", href: "index.html", label: "About" },
        { key: "projects", href: "projects.html", label: "Projects" },
        { key: "blogs", href: "blogs.html", label: "Talks &amp; Blogs" },
        { key: "journey", href: "journey.html", label: "Journey" },
        { key: "news", href: "news.html", label: "News" },
        { key: "publications", href: "publications.html", label: "Publications" },
    ];

    const buildHeader = (vars, activeNav, brandHidden) => {
        const name = readVar(vars, "Name", "Name");
        const brandHtml = brandHidden
            ? `<span class="brand" style="visibility: hidden;">${name}</span>`
            : `<a class="brand" href="index.html">${name}</a>`;

        const navHtml = navItems
            .map((item) => {
                const activeClass = item.key === activeNav ? " class=\"active\"" : "";
                return `<li><a href="${item.href}"${activeClass}>${item.label}</a></li>`;
            })
            .join("");

        return `
<header class="site-header">
    <div class="container nav-wrap">
        ${brandHtml}
        <nav>
            <ul class="main-nav">${navHtml}</ul>
            <button class="theme-toggle" type="button" aria-pressed="false">🌙 Dark</button>
        </nav>
    </div>
</header>`;
    };

    const buildQuickContact = (vars) => {
        const linkedIn = readVar(vars, "LinkedIn_URL", "#");
        const github = readVar(vars, "GitHub_URL", "#");
        const cv = readVar(vars, "CV_URL", "#");

        return `
<div class="quick-contact" aria-label="Quick contact links">
    <a href="${linkedIn}" target="_blank" title="LinkedIn"><i class="ion-social-linkedin"></i></a>
    <a href="${github}" target="_blank" title="GitHub"><i class="ion-social-github"></i></a>
    <a href="${cv}" target="_blank" title="CV"><i class="ion-ios-cloud-download"></i></a>
</div>`;
    };

    const buildFooter = (vars) => {
        const year = readVar(vars, "Year", "");
        const name = readVar(vars, "Name", "");
        const linkedIn = readVar(vars, "LinkedIn_URL", "#");
        const github = readVar(vars, "GitHub_URL", "#");
        const cv = readVar(vars, "CV_URL", "#");

        return `
<footer class="site-footer">
    <div class="container footer-row">
        <p>© ${year} ${name}</p>
        <p class="footer-links">
            <a href="${linkedIn}" target="_blank">LinkedIn</a>
            · <a href="${github}" target="_blank">GitHub</a>
            · <a href="${cv}" target="_blank">CV</a>
        </p>
    </div>
</footer>`;
    };

    const renderShell = () => {
        const vars = window.SITE_TEMPLATE_VARS || {};
        const body = document.body;
        const activeNav = body.dataset.activeNav || "about";
        const brandHidden = body.dataset.brandHidden === "true";

        const headerHost = document.getElementById("site-header");
        const quickContactHost = document.getElementById("site-quick-contact");
        const footerHost = document.getElementById("site-footer");

        if (headerHost) headerHost.innerHTML = buildHeader(vars, activeNav, brandHidden);
        if (quickContactHost) quickContactHost.innerHTML = buildQuickContact(vars);
        if (footerHost) footerHost.innerHTML = buildFooter(vars);
        // Reveal the page now that the shell is fully rendered.
        // body starts at opacity:0 (set by site-head.js) to prevent the layout
        // pop from the empty #site-header div being painted before JS runs.
        document.body.style.opacity = '1';
    };

    window.renderSiteShell = renderShell;
    // Works whether this script is loaded statically (DOMContentLoaded not yet
    // fired) or dynamically via site-bootstrap.js (already fired).
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderShell);
    } else {
        renderShell();
    }
})();
