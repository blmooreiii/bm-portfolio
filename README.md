# Bertram L. Moore III - Personal Portfolio

A premium, cinematic personal portfolio website showcasing the work and expertise of Bertram L. Moore III, Manager of PMs, UX Thinker, and Systems Builder.

## 🌟 Overview

This portfolio is designed with a "cinematic high-fidelity" aesthetic, featuring smooth animations, a personalized design system, and a core focus on storytelling. It serves as a central hub for case studies, professional background, and a dynamic blog feed.

## 🚀 Features

- **Cinematic Hero Sequence**: An immersive entrance animation using early-loading assets and optimized "elevator door" transitions.
- **Deep-Dive Case Studies**: Custom-built pages for major projects:
  - **Stay Me7o**: A sportswear campaign creative direction project.
  - **Bastet**: A civic interaction design initiative.
  - **The Collection**: A personal sneaker collection management application.
  - **PMO Governance**: Strategic project management and delivery structure.
- **Dynamic Blog Integration**: Real-time fetching of the latest 3 posts from [bdotmdev.wordpress.com](https://bdotmdev.wordpress.com) via the WordPress REST API.
- **Responsive Design**: Audited and optimized for desktop, tablet, and mobile viewing.
- **Functional Contact Form**: Integrated with Formspree for direct client/collaborator engagement.

## 🛠 Tech Stack

- **Core**: Semantic HTML5, Vanilla JavaScript (ES6+).
- **Styling**: Custom CSS3 variables, `@keyframes` animations, and CSS Grid/Flexbox for layout.
- **Fonts**: Space Grotesk (Headers), Inter (Body).
- **Integration**: WordPress REST API, Formspree.

## 📂 Project Structure

```text
├── home.html           # Main entry point (Landing Page)
├── work.html           # Project gallery and showcase
├── about.html          # Professional background and facts
├── case-*.html         # Individual deep-dive case study pages
├── bm-logo.png         # Core brand asset
└── hero.mp4            # Cinematic hero video background
```

## 🛠 Local Development

To run the project locally and view changes in real-time, you can use any static file server.

**Using Python:**
```bash
python3 -m http.server 8000
```
Then navigate to `http://localhost:8000/home.html`.

## 📄 License

© 2026 Bertram L. Moore III. All rights reserved.
