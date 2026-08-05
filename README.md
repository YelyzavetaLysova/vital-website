# VITAL website

Static HTML, CSS and JavaScript website for the VITAL project.

## Run locally

Open `index.html` directly, or run:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Team photographs

Place the four photograph files in the `images` folder using these exact names:

- `Alain.jpg`
- `Liza.jpg`
- `Tobias.jpg`
- `Christoph.jpg`

Names, email addresses and image paths are editable in `content.js`. If an image cannot be loaded, initials are shown as a fallback.

## Responsive testing

The layout includes dedicated rules for phones, tablets and desktop screens. It was checked at:

- 375 × 812 px
- 430 × 932 px
- 768 × 1024 px

The mobile refinements cover navigation, hero actions, horizontal overflow, tabs, the interactive evidence example, team cards, contact links and reduced-motion preferences.
