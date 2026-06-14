(function () {
    const readVar = (vars, key, fallback = "") => {
        if (Object.prototype.hasOwnProperty.call(vars, key)) return String(vars[key]);
        return fallback;
    };

    const navItems = [
        { key: "about", href: "index.html", label: "About" },
        { key: "journey", href: "journey.html", label: "Journey" },
        { key: "projects", href: "projects.html", label: "Projects" },
        { key: "publications", href: "publications.html", label: "Publications" },
        { key: "blogs", href: "blogs.html", label: "Talks &amp; Blogs" },
        { key: "miscellaneous", href: "miscellaneous.html", label: "Miscellaneous" },
        { key: "news", href: "news.html", label: "News" },
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
        const orcid = readVar(vars, "ORCID_URL", "#");
        const cv = readVar(vars, "CV_URL", "#");

        return `
<div class="quick-contact" aria-label="Quick contact links">
    <a href="${linkedIn}" target="_blank" title="LinkedIn"><i class="ion-social-linkedin"></i></a>
    <a href="${github}" target="_blank" title="GitHub"><i class="ion-social-github"></i></a>
    <a href="${orcid}" target="_blank" title="ORCID iD"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 256 256" aria-hidden="true" style="vertical-align:middle;fill:currentColor"><path d="M128 0C57.3 0 0 57.3 0 128s57.3 128 128 128 128-57.3 128-128S198.7 0 128 0zm-18.5 56.4c5.3 0 9.6 4.3 9.6 9.6s-4.3 9.6-9.6 9.6-9.6-4.3-9.6-9.6 4.3-9.6 9.6-9.6zm-11.4 36.5h22.9V192h-22.9V92.9zm59.9 0h-22.8v99.1h22.8c24.2 0 43.5-10.8 43.5-49.6 0-36.6-18.2-49.5-43.5-49.5zm1.4 79.7h-2.3V112.3h2.3c13.1 0 20.8 7.3 20.8 30.1 0 23-7.7 30.2-20.8 30.2z"/></svg></a>
    <a href="${cv}" target="_blank" title="CV"><i class="ion-ios-cloud-download"></i></a>
</div>`;
    };

    const buildFooter = (vars) => {
        const year = readVar(vars, "Year", "");
        const name = readVar(vars, "Name", "");
        const linkedIn = readVar(vars, "LinkedIn_URL", "#");
        const github = readVar(vars, "GitHub_URL", "#");
        const orcid = readVar(vars, "ORCID_URL", "#");
        const cv = readVar(vars, "CV_URL", "#");

        return `
<footer class="site-footer">
    <div class="container footer-row">
        <p>© ${year} ${name}</p>
        <p class="footer-links">
            <a href="${linkedIn}" target="_blank">LinkedIn</a>
            · <a href="${github}" target="_blank">GitHub</a>
            · <a href="${orcid}" target="_blank">ORCID</a>
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
