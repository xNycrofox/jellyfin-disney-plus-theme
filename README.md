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

### Option A — One-liner via jsDelivr (easiest)

[jsDelivr](https://www.jsdelivr.com) serves GitHub repos as a CDN and is widely allowed by Jellyfin's Content Security Policy — unlike `raw.githubusercontent.com`.

Paste **one** of these into **Dashboard → General → Custom CSS**:

**Minified** (recommended):
```css
@import url("https://cdn.jsdelivr.net/gh/xNycrofox/jellyfin-disney-plus-theme@latest/Theme/disney-plus-jellyfin-theme.min.css");
```

**Full / unminified:**
```css
@import url("https://cdn.jsdelivr.net/gh/xNycrofox/jellyfin-disney-plus-theme@latest/Theme/disney-plus-jellyfin-theme.css");
```

Then click **Save** and hard-reload (`Ctrl+Shift+R` / `Cmd+Shift+R`).

> `@latest` resolves to the newest semver release tag and is cached for 7 days on jsDelivr.
> If the import still does not apply, your server's CSP is stricter than default. Use Option B instead.

### Option B — Paste the full CSS (always works)

Works on every Jellyfin instance regardless of CSP configuration.

1. Download from the [latest release](https://github.com/xNycrofox/jellyfin-disney-plus-theme/releases/latest):
   - **`disney-plus-jellyfin-theme.min.css`** (smaller)
   - **`disney-plus-jellyfin-theme.css`** (readable)
2. Select all (`Ctrl+A`) and copy.
3. Go to **Dashboard → General → Custom CSS**, paste, and click **Save**.
4. Hard-reload (`Ctrl+Shift+R` / `Cmd+Shift+R`).

### Option C — Per-user (no admin required)

Same as above, but use **Settings → Display → Custom CSS** instead of the dashboard. Only affects your own account.

---

## Customization

See [docs/customization.md](docs/customization.md) for a full reference of all CSS variables.

Quick examples:

```css
/* Change accent color (e.g. Netflix red) */
:root {
    --dp-blue:       #e50914;
    --dp-blue-hover: #f40612;
}

/* Larger card corner radius */
:root {
    --dp-card-radius: 14px;
}

/* Disable card scale on hover */
.card-hoverable:hover .cardScalable {
    transform: none;
}
```

Append any overrides **after** the `@import` line so they take precedence.

---

## File Structure

```
jellyfin-disney-plus-theme/
├── README.md
├── LICENSE                               ← MIT
├── .gitignore
├── .github/
│   ├── workflows/
│   │   └── minify.yml                    ← auto-builds .min.css on every commit
│   └── ISSUE_TEMPLATE.md
├── Theme/
│   ├── disney-plus-jellyfin-theme.css    ← source theme (human-readable)
│   └── disney-plus-jellyfin-theme.min.css← minified (auto-generated, do not edit)
└── docs/
    ├── installation.md
    ├── customization.md
    ├── compatibility.md
    ├── screenshots.md
    └── screenshots/
```

---

## CI / Minification

Two automated workflows handle building and releasing:

**On every push to `main`** that touches the source CSS:
1. `csso` minifies the file.
2. The `.min.css` is committed back automatically.

**On every semver tag** (`v*.*.*`):
1. `csso` builds a fresh `.min.css`.
2. A GitHub Release is created with both CSS files attached.
3. jsDelivr's `@latest` URL updates to point to this tag (within 7 days, or purgeable via their API).

**Edit only the source file**, never the `.min.css`.

---

## Compatibility

| Jellyfin version | Status |
|---|---|
| 10.11.x | ✅ Tested |
| 10.10.x | ✅ Tested |
| 10.9.x  | ✅ Tested |
| < 10.9  | ⚠️ Untested |

See [docs/compatibility.md](docs/compatibility.md) for browser and layout details.

---

## Contributing

Pull requests are welcome. Please open an issue first if you plan a larger change.
Edit only `Theme/disney-plus-jellyfin-theme.css` — the minified file is auto-generated.

---

## License

[MIT](LICENSE) — do whatever you like, attribution appreciated.

---

## Credits

- Disney+ React clone used as visual reference: open-source community project
- Jellyfin DOM analysis based on the [ElegantFin](https://github.com/lscambo13/ElegantFin) theme structure
- Font: [Poppins](https://fonts.google.com/specimen/Poppins) via Google Fonts
