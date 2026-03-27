# Changelog

All notable changes to the Bertram L. Moore III Portfolio project will be documented in this file.

## [1.3.0] - 2026-03-13

### Added
- **Camille Mormal Style Gallery**: Completely reworked `creative.html` with a premium vertical "strip" layout and smooth expansion transitions.
- **Interactive Parallax**: Suble mouse-reactive parallax effects added to gallery strips for a dynamic feel.
- **Dynamic Content Management**: Refactored gallery to generate content dynamically from a single JavaScript `assets` array, simplifying title/category customization.

### Changed
- **Entrance Animation**: Refined the gallery flight-in to match the home page hero's `fadeUp` style (20px vertical displacement, 0.9s duration, and smooth ease).
- **Minimalist UI Polish**: Redesigned slider controls, typography, and background (`#0a0807`) for a more immersive experience.
- **Responsive Slider**: Optimized transition logic and layout stacking for perfect mobile/tablet compatibility.

## [1.2.0] - 2026-03-13

### Added
- **Creative Storyteller Page**: New `creative.html` featuring a bento-grid gallery layout (12-column asymmetric grid) with placeholder cells ready for photos and video.
- **Bento Gallery Animation**: Clip-path reveal animation (left → right wipe with image counter-scale) with JS-measured column cascade stagger across the grid on page load.
- **Video Cell Support**: Video cell pattern with `autoplay muted loop playsinline` and a pinned `▶ Video` badge pill overlay; CSS for `video` inside `.bento-cell` added.
- **Film Artifact Animation**: Vintage film scratch, hair-line, and flicker effects layered over the `hero-left` dark panel in `home.html`, activating post-intro with staggered infinite loops.
- **Images Folder**: Created `images/` directory at project root for organized photo asset storage.
- **Creative Nav Link**: Added "Creative" navigation item across all HTML pages (`home.html`, `about.html`, `work.html`, `case-anubis.html`, `case-melo.html`, `case-pmo.html`, `case-taurus.html`).

### Changed
- **About Section — Real Content**: Replaced Lorem ipsum headline and paragraphs on `home.html` and `about.html` with final bio copy; headline set to "When Product Thinking Meets Culture".
- **About Stats**: Updated fact cards to: 8+ Years in Project Management · 4 Case Studies · 3 Products in Development.
- **About Portrait**: Wired `portrait-bertram.jpg` into the portrait circle on both `home.html` and `about.html`; added GPU rendering hints (`image-rendering`, `transform: translateZ(0)`, `backface-visibility`) for sharpness.
- **PMO Governance Page**: Replaced all Lorem ipsum on `case-pmo.html` with real governance content — intro paragraphs, five numbered pillar cards, and a tools/frameworks list. Hero placeholder replaced with `governance-lifecycle.png`.
- **Bastet Icon**: Changed Creative stat card icon from 🎙️ to 🌍 across `home.html` to better reflect the civic/community nature of the project.
- **Experience Section**: Added "The Journey So Far" career/education section to `about.html` with streamlined entries for J&J (Manager of PMs), ATCS (Founder/Creative Director), Verizon (Sr. Manager Business Strategy), and ASU (B.S. GIT).
- **Filter Tabs**: Creative page filter buttons apply opacity fade to non-matching cells without removing them from the grid.

### Fixed
- **About Portrait Overflow**: Added `overflow: hidden` to `.about-portrait` on `about.html` so the headshot is properly clipped to the circle instead of overflowing.
- **Portrait Image src**: Corrected `portrait-bertram.png` reference to `portrait-bertram.jpg` (the actual file present in the project).

## [1.1.0] - 2026-03-11

### Added
- **New Case Study Page**: Created `case-pmo.html` for "PMO - Governance" with tailored content and structure.
- **Functional Contact Form**: Integrated Formspree (`mbdzlgyp`) site-wide to enable direct messaging via the "#contact" section.
- **Interactive Animations**: Added a pulse and glow hover effect to `.about-fact` elements in the About section for enhanced tactile feedback.
- **Repository Documentation**: Initialized `README.md` and `CHANGELOG.md`.

### Changed
- **Navigation Cleanup**: Removed redundant "Contact" links from the header navigation site-wide to focus on the primary "Let's Work" call-to-action.
- **Hero Title Refinement**: Increased `line-height` and added vertical padding to `.hero-title` to prevent character descenders (like "y" in "Systems") from being clipped.
- **Link Standardization**: Updated all `mailto:` links to `bertram@bertrammoore.com` and fixed the Bastet footer link to point to the case study rather than YouTube.
- **Case Study Sequencing**: Corrected the "Next Project" logic to ensure a perfect loop through the work gallery (Melo → Bastet → The Collection → PMO → Melo).

### Fixed
- **Header Styles**: Restored missing navigation CSS on `case-melo.html` that caused layout breakage.
- **Responsive Layouts**: Fine-tuned grid behavior for descenders and transitions.

## [1.0.0] - Initial Release
- Cinematic hero section with elevator door entry.
- Projects gallery with numbered rows.
- Dynamic WordPress blog feed integration.
- "About" section with professional mission statement.
