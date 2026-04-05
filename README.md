# karkid.github.io
# Personel Site

## Content structure

Site content is now split into section files under [resources/js/site-data](resources/js/site-data):

- [resources/js/site-data/profile.js](resources/js/site-data/profile.js)
- [resources/js/site-data/projects.js](resources/js/site-data/projects.js)
- [resources/js/site-data/blogs.js](resources/js/site-data/blogs.js)
- [resources/js/site-data/journey.js](resources/js/site-data/journey.js)
- [resources/js/site-data/news.js](resources/js/site-data/news.js)
- [resources/js/site-data/publications.js](resources/js/site-data/publications.js)

The runtime object used by templates is assembled in [resources/js/site-config.js](resources/js/site-config.js).

## Shared page shell

Common layout markup (header, quick-contact, footer) is centralized in [resources/js/site-shell.js](resources/js/site-shell.js).

Each page now declares only:

- page-specific `main` content
- a lightweight page identity on `body` (for example `data-active-nav="projects"`)
- shell placeholders:
	- `#site-header`
	- `#site-quick-contact`
	- `#site-footer`

## How to edit content

1. Update only the relevant section file in [resources/js/site-data](resources/js/site-data).
2. Keep key names unchanged unless template bindings are updated too.
3. For list sections (`projects`, `blogs`, `news`, `journey`, `publications`), add items as plain objects in their array.
4. Keep dates in consistent text/ISO format so sorting logic remains stable.

## New page checklist

1. Add `data-active-nav` on the `body` element.
2. Add placeholders: `#site-header`, `#site-quick-contact`, `#site-footer`.
3. Keep only page-specific content in `main`.
4. Include [resources/js/site-shell.js](resources/js/site-shell.js) before [resources/js/template-bind.js](resources/js/template-bind.js).
