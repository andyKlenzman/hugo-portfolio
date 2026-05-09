# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A personal Hugo static site blog deployed on Netlify. Uses the `hugo-bearcub` theme (git submodule) with local layout overrides. Also contains `blogtools/`, a small Python CLI for tracking personal intentions/habits.

## Hugo Commands

```bash

# Dev server with full rebuilds
hugo server --disableFastRender

# New post (long-form)
hugo new posts/$(date +%Y-%m-%d)-mein-artikel/index.md

# New note (short-form)
hugo new notes/$(date +%Y-%m-%d)-name/index.md
```

## Creating new content

```bash
hugo new content/items/$(date +%Y-%m-%d)-my-slug/index.md
```

Uses the archetype at `archetypes/items.md`. Add media files to the same bundle folder.

## Architecture

### Content

Two content sections with different roles:
- `content/posts/` — long-form essays (mostly in German)
- `content/notes/` — short snippets/micro-posts

Both use page bundles (`index.md` + sibling assets in a directory).

### Layouts

`layouts/` fully overrides the `hugo-bearcub` theme. Key files:
- `layouts/_default/baseof.html` — top-level HTML shell; loads CSS via `partialCached "css.html"`
- `layouts/index.html` — homepage: shows latest 5 notes, latest 5 posts
- `layouts/partials/intention_splash_summary.html` — reads all `data/intentions/*.yaml` and shows counts for last 7 days
- `layouts/shortcodes/` — reusable shortcodes for content files

### Styling

Theme is `theme-terminal` (set in `params.toml`). Custom CSS layers in `assets/css/`:
- `root-colors.css` — CSS custom properties / color tokens
- `themes.css` — theme variants
- `main.css` — general overrides
- `highlight.css` — syntax highlighting

### Data-driven features

- `data/intentions/*.yaml` — habit/intention tracking. Each file has `name` and a `timestamps` list. The `intention_splash_summary.html` partial iterates all files and counts timestamps from the last 7 days.
- `data/timeline.yaml` — timeline data (currently placeholder, rendered by `layouts/partials/timeline.html`)

### Deployment

Netlify. Build command: `hugo`. Publish dir: `public`. Hugo version pinned to `0.152.2` in `netlify.toml`.

## Git

Commit messages should be short and plain — one line, no bullet points, no Co-Authored-By trailer. Example: `add items section layouts`

Before starting a TODO or feature work, create a feature branch. Work on that branch and merge to main when done.
