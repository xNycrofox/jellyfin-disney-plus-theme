# Compatibility

## Jellyfin Versions

| Version | Status | Notes |
|---|---|---|
| 10.11.x | ✅ Fully supported | Primary target |
| 10.10.x | ✅ Supported | Minor layout differences in detail page |
| 10.9.x  | ✅ Supported | Some grid selectors may not apply |
| < 10.9  | ⚠️ Untested | Use at your own risk |

## Browsers

| Browser | Status |
|---|---|
| Chrome / Chromium 100+ | ✅ |
| Firefox 100+ | ✅ |
| Safari 16+ | ✅ |
| Edge 100+ | ✅ |
| Older browsers | ⚠️ CSS container queries and `:has()` may not work |

## Layouts

| Layout | Status |
|---|---|
| Desktop | ✅ |
| Mobile (phone) | ✅ |
| Tablet | ✅ |
| TV / 10-foot UI | ✅ |

## Known Limitations

- The Jellyfin navigation model is drawer-based; it cannot be converted into Disney+'s inline icon nav via CSS alone.
- Video player controls use Jellyfin's native OSD — the styling matches Disney+'s dark theme but is not pixel-perfect.
- Custom fonts require an internet connection (Poppins is loaded from Google Fonts). For offline setups, override the font-family with a local font.
