---
date: 2025-08-01T00:00:00Z
tags: [project, web]
title: "Streaks Web App"
description: "Built a minimal habit tracker web app with MVC and Firebase backend."
draft: false
github_url: https://github.com/andyKlenzman/streaks_js
intro:
  language: "JavaScript"
  backend: "Firebase"
  architecture: "MVC"
  tools:
    - "Vite"
    - "GitHub Pages Deployment"
  hardSkills:
    - "Frontend Architecture"
    - "Backend Integration"
  softSkills:
    - "User-Centric Design"
    - "Technology Tradeoff Decisions"
---

I created a minimalist habit tracker inspired by "streak" tracker like snapchat or other behavior apps, but stripped of the cluttered UI and extra features. I built it in raw JavaScript with an Model-View-Controller architecture and connected it to Firebase.

I initially prototyped in React Native but switched to a lightweight web build for simplicity and portability. I also created a data access layer for future flexibility and testing, which sets a single API for connecting to multiple data sources.

The resulting app is something I use daily to help me build good habits, and it now serves as a reusable, extensible codebase for future projects.

![View of streaks_js UI](streaks_focus_view.png)
