# Andy Klenzman Portfolio

## Commands

```bash
# Start local dev server
hugo server --disableFastRender

# Create a new item
hugo new content/items/$(date +%Y-%m-%d)-my-slug/index.md
```

## Creating content

Every item is a **page bundle** — a folder with an `index.md` and any media files:

```
content/items/2026-05-04-my-item/
    index.md
    photo.jpg       <- optional
```

The archetype (`archetypes/items.md`) prefills the frontmatter. Edit `index.md`:

```yaml
---
date: 2026-05-04T14:00:00Z   # required
tags: [thought]               # required — controls how/where it appears
title: ""                     # optional
description: ""               # optional
draft: false
---
Your text here.
```

Reference media files directly in the markdown body: `![alt](photo.jpg)`.

> **Obsidian users:** Obsidian's wiki-link image syntax `![[path/to/image.jpg]]` is **not supported** by Hugo. Always use standard Markdown syntax `![alt](filename.jpg)` with the image file placed in the same page bundle folder. The Obsidian path (e.g. `![[posts/2026-02-02-slug/image.jpg]]`) will render as raw text instead of an image.

Extra fields (e.g. `tech_stack`, `github_url`) can be added freely — layouts check for them with `{{ with .Params.field_name }}`.

