# Performance Running Toronto

Personal running coaching website for Eoin Taggart, hosted at https://performance-running.com/.

## Structure

- `index.html`: content, package prices, form and search/social metadata.
- `styles.css`: responsive layouts, colours and typography.
- `script.js`: mobile navigation, package selection and enquiry submission.
- `images/prt-hero.webp`: optimized decorative running image, not a portrait of Eoin or a client.
- `CNAME`: existing custom-domain configuration.
- `robots.txt` and `sitemap.xml`: search crawler discovery.

No build tools or dependencies are required. Serve the repository with any static web server, such as `python -m http.server 8000`.

## Enquiries

The existing Formspree endpoint is preserved. The form sends name, email, coaching interest, optional race/date and running goals. JavaScript provides submission feedback and retains input on error. Without JavaScript, native form submission works. The endpoint's account configuration and inbox delivery must be checked by the owner; no test enquiry was sent during the redesign.

## Content maintenance

Update prices in both the package cards and form options/data-plan attributes together. Confirm group schedules before changing them. Add testimonials only with genuine approved athlete feedback. No placeholder booking links or unverified testimonials are included.

## Publishing

The redesign branch is intended for review before merging into the branch used by GitHub Pages. The existing domain is preserved.
