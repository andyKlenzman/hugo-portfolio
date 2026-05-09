# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A personal Hugo static site (in transition from blog to portfolio) deployed on Netlify. Uses the `hugo-bearcub` theme as a git submodule with local layout overrides in `layouts/`. Hugo version pinned to `0.152.2`.

## Commands

```bash
# Dev server with full rebuilds on every change
hugo server --disableFastRender

# Create a new item (page bundle)
hugo new content/items/$(date +%Y-%m-%d)-my-slug/index.md

# Production build
hugo
```

## Architecture

### Content: one section, tag-driven

All content lives in `content/items/` as **page bundles** — a directory containing `index.md` plus any media files. There are no separate content types or sections; **tags are the only control mechanism** for how/where content appears.

Frontmatter shape (from `archetypes/items.md`):

```yaml
date: 2026-05-04T14:00:00Z   # required
tags: []                      # controls routing and display
title: ""                     # optional
description: ""               # optional
draft: false
```

Extra fields (e.g. `tech_stack`, `github_url`) can be added freely — layouts check for them with `{{ with .Params.field_name }}`.

### Layouts (override the theme)

`layouts/` fully overrides `themes/hugo-bearcub/`. Key files:

- `layouts/_default/baseof.html` — HTML shell; loads CSS via `partialCached "css.html"`
- `layouts/index.html` — homepage: latest 5 items + links to list/stream
- `layouts/items/list.html` — paginated list of all items
- `layouts/items/single.html` — individual item page
- `layouts/partials/list-item.html` — shared component for all list entries (date + title link, no tags shown)
- `layouts/partials/timeline.html` — renders `data/timeline.json` entries
- `layouts/taxonomy/tag.html` — tag-filtered list view at `/tags/{tag}/`
- `layouts/taxonomy/tag.tagstream.html` — tag-filtered stream view at `/tags/{tag}/stream/`

### Tag/taxonomy system

Hugo taxonomies generate two static layouts per tag via a custom Output Format (`TagStream` defined in `config/_default/hugo.toml`):

| URL | Layout |
|-----|--------|
| `/tags/{tag}/` | `layouts/taxonomy/tag.html` — list view |
| `/tags/{tag}/stream/` | `layouts/taxonomy/tag.tagstream.html` — stream view with truncated content |

No JavaScript filtering — all tag pages are statically generated.

### Data-driven features

- `data/timeline.json` — life/career timeline. Root key must be `entries` (Hugo requires an object, not array, at root). Fields: `date` (YYYY-MM), `title` (required), `description` (optional), `url` (optional), `tags` (optional).

### Styling

Theme variant set to `theme-terminal` in `config/_default/params.toml`. Custom CSS layers in `assets/css/`:
- `root-colors.css` — CSS custom properties / color tokens
- `themes.css` — theme variants
- `main.css` — general overrides
- `highlight.css` — syntax highlighting

### Deployment

Netlify. Build: `hugo`. Publish dir: `public`. Hugo version pinned in `netlify.toml`.

## Git

Commit messages: short and plain, one line, no bullet points, no trailers. Example: `add timeline partial`

## Image syntax

Obsidian wiki-link syntax `![[path/to/image.jpg]]` is **not supported** by Hugo. Always use standard Markdown `![alt](filename.jpg)` with the image in the same page bundle directory.

## Spec and design decisions

The design spec lives in `dev-docs/SPEC.md`. Read it before making layout or navigation changes — it documents decisions about navigation (mailto link instead of contact page), the list-item shared component, stream truncation, and what's explicitly out of scope.
