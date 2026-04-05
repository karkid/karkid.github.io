/**
 * types.d.ts — TypeScript interface definitions for all site-data shapes.
 *
 * This file is picked up by jsconfig.json (checkJs: true).
 * Each site-data/*.js file has "// @ts-check" at the top, which makes VS Code
 * validate assignments to window.SITE_DATA_* against these interfaces —
 * giving you inline red squiggles for wrong field types, bad enum values,
 * missing required fields, and unknown property names.
 *
 * No build step needed. No extensions required. Works out of the box in VS Code.
 */

// ─── Projects ───────────────────────────────────────────────────────────────

interface SiteProject {
    title: string;
    description?: string;
    summary?: string;
    link?: string;
    presentation_link?: string;
    /** "Public" or "Private" GitHub repo visibility */
    Repo?: "Public" | "Private";
    owner?: string;
    status: "In Progress" | "Completed" | "Discontinued" | "Active";
    timeline: string;
    technology: string;
    domain?: string;
    tags?: string[];
    pinned?: boolean;
    purpose?: string;
}

interface SiteDataProjects {
    project_intro: string;
    projects: SiteProject[];
}

// ─── Profile ─────────────────────────────────────────────────────────────────

interface SiteDataProfile {
    Name: string;
    Current_Role: string;
    Affiliation?: string;
    About_Intro?: string;
    About_Background?: string;
    About_Collaboration?: string;
    Current_Position_Detail?: string;
    Academic_Direction?: string;
    Near_Term_Goal?: string;
    LinkedIn_URL: string;
    GitHub_URL: string;
    CV_URL: string;
    Email: string;
    Year: string;
    default_theme?: "light" | "dark";
}

// ─── Blogs / Talks ───────────────────────────────────────────────────────────

interface SiteBlog {
    title: string;
    summary: string;
    link: string;
    date: string;
    tags?: string[];
    timeToRead?: string;
    featured?: boolean;
    author: string;
    status: "Presented" | "Draft" | "Published" | "Archived";
    type: "talk" | "blog";
    event?: string;
    file_type?: "pdf" | "pptx" | "ppt" | "doc" | "docx" | "url";
    mode?: "In-Person" | "Online" | "Hybrid";
    location?: string;
    extra_meta?: string;
}

interface SiteDataBlogs {
    blogs_intro: string;
    blogs: SiteBlog[];
}

// ─── Journey ─────────────────────────────────────────────────────────────────

interface SiteJourneyItem {
    year: string;
    icon: string;
    location: string;
    event: string;
    outcome: string;
    reward: string;
}

interface SiteDataJourney {
    journey_intro: string;
    journey: SiteJourneyItem[];
}

// ─── News ────────────────────────────────────────────────────────────────────

interface SiteNewsItem {
    /** ISO date string: YYYY-MM-DD */
    date: string;
    headline: string;
    link?: string;
}

interface SiteDataNews {
    news_intro: string;
    news: SiteNewsItem[];
}

// ─── Publications ────────────────────────────────────────────────────────────

interface SitePublication {
    key: string;
    author: string;
    title: string;
    booktitle?: string;
    journal?: string;
    year: string;
    publisher?: string;
    volume?: string;
    number?: string;
    pages?: string;
    doi?: string;
    link?: string;
    type: "article" | "inproceedings" | "book" | "misc";
}

interface SiteDataPublications {
    publications_intro: string;
    publications: SitePublication[];
}

// ─── Global Window augmentation ──────────────────────────────────────────────
// Tells TypeScript (and VS Code's checkJs) what types these globals have, so
// that assignments in each site-data/*.js file are validated against the shapes above.

declare global {
    interface Window {
        SITE_DATA_PROFILE: SiteDataProfile;
        SITE_DATA_PROJECTS: SiteDataProjects;
        SITE_DATA_BLOGS: SiteDataBlogs;
        SITE_DATA_JOURNEY: SiteDataJourney;
        SITE_DATA_NEWS: SiteDataNews;
        SITE_DATA_PUBLICATIONS: SiteDataPublications;
    }
}

export { };
