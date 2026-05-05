# Customization

All visual parameters are controlled through CSS custom properties defined in `:root`. You can override any of them by appending a short `:root { }` block **after** the main theme import.

---

## Colors

| Variable | Default | Description |
|---|---|---|
| `--dp-bg` | `#040714` | Main page background |
| `--dp-surface` | `#090b13` | Card and surface background |
| `--dp-surface-2` | `#1a1c29` | Elevated surface (drawer, etc.) |
| `--dp-blue` | `#0063e5` | Accent color (play button, links, active states) |
| `--dp-blue-hover` | `#0483ee` | Hover variant of accent color |
| `--dp-text` | `rgb(249,249,249)` | Primary text color |
| `--dp-text-dim` | `rgba(249,249,249,0.7)` | Secondary / dimmed text |
| `--dp-text-muted` | `rgba(249,249,249,0.45)` | Muted / placeholder text |

### Example: change accent to red (Netflix style)

```css
:root {
    --dp-blue:       #e50914;
    --dp-blue-hover: #f40612;
}
```

---

## Cards

| Variable | Default | Description |
|---|---|---|
| `--dp-card-border` | `rgba(249,249,249,0.1)` | Default card border color |
| `--dp-card-border-hover` | `rgba(249,249,249,0.8)` | Card border color on hover |
| `--dp-card-radius` | `10px` | Card corner radius |
| `--dp-card-shadow` | *(multi-layer)* | Card drop shadow at rest |
| `--dp-card-shadow-hover` | *(multi-layer)* | Card drop shadow on hover |

### Example: square cards with no hover glow

```css
:root {
    --dp-card-radius:       4px;
    --dp-card-border-hover: rgba(249,249,249,0.2);
}
```

### Example: disable card scale on hover

```css
.card-hoverable:hover .cardScalable {
    transform: none !important;
}
```

---

## Layout

| Variable | Default | Description |
|---|---|---|
| `--dp-nav-height` | `70px` | Height of the top navigation bar |
| `--dp-side-padding` | `calc(3.5vw + 5px)` | Horizontal page padding |
| `--dp-transition` | `250ms cubic-bezier(...)` | Default animation timing |
| `--resumeCardScale` | `1.25` | Size multiplier for "Continue Watching" cards |

---

## Detail / Item Page

| Variable | Default | Description |
|---|---|---|
| `--clearLogoVisibility` | `block` | Show (`block`) or hide (`none`) the title clear logo |
| `--itemTitleVisibility` | `none` | Show the text title even when a logo is present |
| `--itemOriginalTitleVisibility` | `block` | Show the original (non-localized) title |
| `--backdropTrimFromTop` | `10%` | How much of the top of a backdrop image to crop |

### Example: always show text title

```css
:root {
    --itemTitleVisibility: block;
}
```

---

## Home Page

| Variable | Default | Description |
|---|---|---|
| `--libraryLabelVisibility` | `none` | Show (`block`) labels on library tiles |
| `--extraCardButtonsVisibility` | `none` | Show extra buttons (watched/favorite) on card hover |
| `--miniOverlayButtonVisibility` | `block` | Show mini play button on mobile |

---

## OSD / Player

| Variable | Default | Description |
|---|---|---|
| `--osdSeekBarPlayedColor` | `rgb(249,249,249)` | Played portion of seek bar |
| `--osdSeekBarBufferedColorAlpha` | `rgba(249,249,249,0.3)` | Buffered portion of seek bar |
| `--osdSeekBarThumbColor` | `white` | Seek bar thumb color |

---

## Typography

The theme imports **Poppins** from Google Fonts automatically. To use a different font:

```css
/* Disable Poppins (remove the @import from the main file, or override below) */
html {
    font-family: "Your Font", sans-serif !important;
}
```

---

## Complete override example

```css
/* Place this AFTER the main theme import or at the end of the Custom CSS field */

:root {
    /* Custom accent: amber */
    --dp-blue:            #f59e0b;
    --dp-blue-hover:      #fbbf24;

    /* Slightly less dark background */
    --dp-bg:              #06080f;

    /* Larger card radius */
    --dp-card-radius:     14px;

    /* Always show library labels */
    --libraryLabelVisibility: block;
}
```
