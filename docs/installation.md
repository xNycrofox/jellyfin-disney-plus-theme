# Installation Guide

## Requirements

- Jellyfin 10.9 or newer
- Access to the Jellyfin web dashboard (admin account) **or** your own user settings

---

## Method 1 — Import via jsDelivr (recommended)

[jsDelivr](https://www.jsdelivr.com) serves GitHub repos as a CDN. Unlike `raw.githubusercontent.com`, `cdn.jsdelivr.net` is widely permitted by Jellyfin's default Content Security Policy.

**Minified** (recommended):
```css
@import url("https://cdn.jsdelivr.net/gh/xNycrofox/jellyfin-disney-plus-theme@main/Theme/disney-plus-jellyfin-theme.min.css");
```

**Full / unminified:**
```css
@import url("https://cdn.jsdelivr.net/gh/xNycrofox/jellyfin-disney-plus-theme@main/Theme/disney-plus-jellyfin-theme.css");
```

Steps:
1. Log in with an admin account.
2. Navigate to **Dashboard → General**.
3. Scroll to **Custom CSS code**.
4. Paste one of the import lines above.
5. Click **Save** and hard-reload (`Ctrl + Shift + R` / `Cmd + Shift + R`).

> If the theme still doesn't appear, your server's CSP is stricter than Jellyfin's default. Use Method 2 instead.

---

## Method 2 — Paste the full CSS (offline / frozen version)

If your server has no internet access or you want to pin a specific version:

1. Download [`Theme/disney-plus-jellyfin-theme.css`](../Theme/disney-plus-jellyfin-theme.css) (or the [minified version](../Theme/disney-plus-jellyfin-theme.min.css)).
2. Copy the entire file contents.
3. Paste into **Dashboard → General → Custom CSS**.
4. Click **Save** and reload.

---

## Method 3 — Self-hosted file (reverse proxy)

If you prefer to host the CSS yourself instead of pulling from GitHub:

```css
@import url("https://YOUR_SERVER/path/disney-plus-jellyfin-theme.css");
```

**Example nginx location block:**

```nginx
location /themes/ {
    alias /opt/jellyfin-themes/;
    add_header Cache-Control "public, max-age=86400";
}
```

Then the import URL would be `https://your-domain/themes/disney-plus-jellyfin-theme.css`.

---

## Method 4 — Per-user (no admin required)

The theme can be applied per-user without touching server-wide settings:

1. Click your avatar (top-right) → **Settings**.
2. Open **Display**.
3. Scroll to **Custom CSS code**.
4. Paste the full CSS.
5. Save and reload.

This only affects your own account.

---

## Updating

Replace the CSS content in the Custom CSS field with the latest version of the file. No other steps are needed.

---

## Uninstalling

Delete everything from the **Custom CSS** field and save.
