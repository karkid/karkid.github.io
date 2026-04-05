#!/usr/bin/env node
/**
 * scripts/validate-data.js — AJV schema validation for all site-data files.
 *
 * Usage:
 *   npm run validate          (via package.json "validate" script)
 *   node scripts/validate-data.js
 *
 * How it works:
 *   Each site-data/*.js file assigns to window.SITE_DATA_*. This script runs
 *   each file inside a sandboxed Node vm context with a mock `window` object,
 *   extracts the resulting data, then validates it against its JSON Schema
 *   using AJV. All errors are grouped per file. Exits with code 1 if any
 *   errors are found — which makes GitHub Actions mark the run as failed.
 */

'use strict';

const vm = require('vm');
const fs = require('fs');
const path = require('path');

// ─── Load AJV ───────────────────────────────────────────────────────────────

let Ajv, addFormats;
try {
    Ajv = require('ajv').default;
    addFormats = require('ajv-formats');
} catch {
    console.error('[validate] Missing dependencies. Run:  npm install');
    process.exit(1);
}

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

// ─── File manifest ───────────────────────────────────────────────────────────

const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'resources/js/site-data');
const SCHEMA_DIR = path.join(DATA_DIR, 'schema');

const FILES = [
    { file: 'profile.js', globalKey: 'SITE_DATA_PROFILE', schema: 'profile.schema.json' },
    { file: 'projects.js', globalKey: 'SITE_DATA_PROJECTS', schema: 'projects.schema.json' },
    { file: 'blogs.js', globalKey: 'SITE_DATA_BLOGS', schema: 'blogs.schema.json' },
    { file: 'journey.js', globalKey: 'SITE_DATA_JOURNEY', schema: 'journey.schema.json' },
    { file: 'news.js', globalKey: 'SITE_DATA_NEWS', schema: 'news.schema.json' },
    { file: 'publications.js', globalKey: 'SITE_DATA_PUBLICATIONS', schema: 'publications.schema.json' },
    { file: 'miscellaneous.js', globalKey: 'SITE_DATA_MISCELLANEOUS', schema: 'miscellaneous.schema.json' },
];

// ─── ANSI helpers ────────────────────────────────────────────────────────────

const isTTY = process.stdout.isTTY;
const red = (s) => isTTY ? `\x1b[31m${s}\x1b[0m` : s;
const green = (s) => isTTY ? `\x1b[32m${s}\x1b[0m` : s;
const yellow = (s) => isTTY ? `\x1b[33m${s}\x1b[0m` : s;
const dim = (s) => isTTY ? `\x1b[2m${s}\x1b[0m` : s;

// ─── Validator ───────────────────────────────────────────────────────────────

let totalErrors = 0;

console.log('\nValidating site-data files against JSON Schemas...\n');

for (const { file, globalKey, schema } of FILES) {
    const filePath = path.join(DATA_DIR, file);
    const schemaPath = path.join(SCHEMA_DIR, schema);

    // Run the JS file in a sandboxed vm context with a mock window object.
    // This is safe — the data files only do `window.SITE_DATA_X = {...}`.
    const code = fs.readFileSync(filePath, 'utf8');
    const mockWindow = {};
    const context = vm.createContext({ window: mockWindow });

    try {
        vm.runInContext(code, context);
    } catch (err) {
        console.error(red(`✗ ${file}`));
        console.error(`  Syntax/runtime error: ${err.message}\n`);
        totalErrors++;
        continue;
    }

    const data = mockWindow[globalKey];
    if (data === undefined) {
        console.error(red(`✗ ${file}`));
        console.error(`  window.${globalKey} was never assigned — check the file exports its global.\n`);
        totalErrors++;
        continue;
    }

    // Compile and run the JSON Schema
    const schemaObj = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
    const validate = ajv.compile(schemaObj);
    const valid = validate(data);

    if (valid) {
        console.log(green(`✓ ${file}`));
        continue;
    }

    // Group errors by item index so each item's problems are listed together
    const byPath = {};
    for (const err of validate.errors) {
        const key = err.instancePath || '(root)';
        (byPath[key] = byPath[key] || []).push(err);
    }

    totalErrors += validate.errors.length;
    console.error(red(`✗ ${file}`) + dim(` — ${validate.errors.length} error(s)`));

    for (const [loc, errs] of Object.entries(byPath)) {
        console.error(`  ${yellow(loc)}`);
        for (const err of errs) {
            let msg = `    • ${err.message}`;
            if (err.params && Object.keys(err.params).length) {
                const detail = Object.entries(err.params)
                    .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
                    .join(', ');
                msg += dim(` [${detail}]`);
            }
            console.error(msg);
        }
    }
    console.error('');
}

// ─── Summary ─────────────────────────────────────────────────────────────────

console.log('');
if (totalErrors === 0) {
    console.log(green('✓ All data files valid — no schema errors found'));
    process.exit(0);
} else {
    console.error(red(`✗ ${totalErrors} total error(s) — fix the issues above before deploying`));
    process.exit(1);
}
