# Jellyfin Disney+ Theme

A complete CSS theme for [Jellyfin](https://jellyfin.org) that recreates the Disney+ visual design — dark navy backgrounds, cinematic card effects, clean typography, and the iconic Disney+ color palette.

---

## Preview

> Screenshots go in `docs/screenshots/` — see [docs/screenshots.md](docs/screenshots.md).

---

## Features

- **Disney+ color palette** — deep `#040714` background, `#090b13` navigation, white text
- **Card design** — rounded corners, subtle border, depth shadows, scale + glow on hover (identical to Disney+)
- **Poppins typeface** — visually equivalent to Disney+'s proprietary Avenir
- **Navigation bar** — dark, frosted-glass, 70 px height
- **Detail/item pages** — full-screen backdrop, clear logo support, white play button with black text
- **Login page** — glassmorphism card on dark background
- **Horizontal content rows** — section titles + scrollable card rows styled after Disney+
- **Responsive** — desktop, tablet, mobile and TV layouts
- **Compatible** with Jellyfin 10.9, 10.10, and 10.11+

---

## Installation

### Option A — Custom CSS (recommended)

1. Open your Jellyfin web client.
2. Go to **Dashboard → General → Custom CSS**.
3. Paste the entire contents of [`Theme/disney-plus-jellyfin-theme.css`](Theme/disney-plus-jellyfin-theme.css).
4. Click **Save** and reload the page.

### Option B — Self-hosted file

1. Place `disney-plus-jellyfin-theme.css` somewhere your Jellyfin server can serve it (e.g. next to your `web/` folder or via a reverse proxy).
2. In **Dashboard → General → Custom CSS**, add a single import line:

```css
@import url("https://your-server/path/to/disney-plus-jellyfin-theme.css");
```

### Option C — User-level (per profile)

1. Go to your **User Settings → Display → Custom CSS**.
2. Paste the contents of the CSS file.

This applies the theme only to your account and does not affect other users.

---

## Customization

See [docs/customization.md](docs/customization.md) for a full list of CSS variables you can override.

Quick examples:

```css
/* Swap the accent color from Disney blue to a custom color */
:root {
    --dp-blue:       #e50914;   /* e.g. Netflix red */
    --dp-blue-hover: #f40612;
}

/* Increase card border radius */
:root {
    --dp-card-radius: 14px;
}

/* Disable card scale-up on hover */
.card-hoverable:hover .cardScalable {
    transform: none;
}
```

---

## File Structure

```
jellyfin-disney-plus-theme/
├── README.md                        ← you are here
├── LICENSE                          ← MIT
├── Theme/
│   └── disney-plus-jellyfin-theme.css   ← main theme file
├── docs/
│   ├── installation.md              ← detailed install guide
│   ├── customization.md             ← all CSS variables & overrides
│   ├── compatibility.md             ← tested Jellyfin versions
│   └── screenshots/                 ← place your screenshots here
└── .github/
    └── ISSUE_TEMPLATE.md
```

---

## Compatibility

| Jellyfin version | Status |
|---|---|
| 10.11.x | ✅ Tested |
| 10.10.x | ✅ Tested |
| 10.9.x  | ✅ Tested |
| < 10.9  | ⚠️ Untested |

---

## Contributing

Pull requests are welcome. Please open an issue first if you plan a larger change.

---

## License

[MIT](LICENSE) — do whatever you like, attribution appreciated.

---

## Credits

- Disney+ React clone used as visual reference: open-source community project
- Jellyfin DOM analysis based on the [ElegantFin](https://github.com/lscambo13/ElegantFin) theme structure
- Font: [Poppins](https://fonts.google.com/specimen/Poppins) via Google Fonts
