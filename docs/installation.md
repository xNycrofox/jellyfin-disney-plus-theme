# Installation Guide

## Requirements

- Jellyfin 10.9 or newer
- Access to the Jellyfin web dashboard (admin account) **or** your own user settings

---

## Method 1 — Admin Custom CSS (all users)

This applies the theme globally to every user on your server.

1. Log in with an admin account.
2. Navigate to **Dashboard** (top-right menu or sidebar).
3. Open **General** in the left sidebar.
4. Scroll down to **Custom CSS code**.
5. Paste the full contents of `Theme/disney-plus-jellyfin-theme.css`.
6. Click **Save**.
7. Hard-reload your browser (`Ctrl + Shift + R` / `Cmd + Shift + R`).

---

## Method 2 — Import via URL (self-hosted)

If you host the CSS file yourself (e.g. alongside Jellyfin's web root or via a reverse proxy):

```css
@import url("https://YOUR_SERVER/path/disney-plus-jellyfin-theme.css");
```

Paste that single line into the **Custom CSS** field instead of the full file.

**Example nginx location block** to serve the file:

```nginx
location /themes/ {
    alias /opt/jellyfin-themes/;
    add_header Cache-Control "public, max-age=86400";
}
```

Then the import URL would be `https://your-domain/themes/disney-plus-jellyfin-theme.css`.

---

## Method 3 — Per-user (no admin required)

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
