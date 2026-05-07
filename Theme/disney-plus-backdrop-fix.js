/* Disney+ Theme — Backdrop Fix
 * Paste this into the JavaScript Injector plugin → Private Scripts.
 *
 * Jellyfin leaves #itemBackdrop empty and relies on a global backdrop system
 * instead. This script watches for navigation to detail pages and injects
 * the correct item backdrop into #itemBackdrop so the Disney+ CSS can display it.
 */
(function () {
    'use strict';

    function getItemId() {
        // 1. Try URL hash (e.g. #!/itemdetails?id=abc123)
        const fromUrl = (window.location.hash + '&' + window.location.search)
            .match(/[?&#]id=([a-f0-9]{32})/i);
        if (fromUrl) return fromUrl[1];

        // 2. Fallback: extract from the detailLogo background-image URL
        const logo = document.querySelector('#itemDetailPage .detailLogo');
        if (logo && logo.style.backgroundImage) {
            const fromLogo = logo.style.backgroundImage.match(/\/Items\/([a-f0-9]{32})\//i);
            if (fromLogo) return fromLogo[1];
        }

        return null;
    }

    function getServerUrl() {
        // ApiClient is more reliable than window.location when Jellyfin runs under a subpath
        if (window.ApiClient && typeof window.ApiClient.serverAddress === 'function') {
            return window.ApiClient.serverAddress().replace(/\/$/, '');
        }
        return window.location.origin;
    }

    async function applyBackdrop() {
        const backdrop = document.getElementById('itemBackdrop');
        if (!backdrop) return;

        const id = getItemId();
        if (!id) return;

        const serverUrl = getServerUrl();

        // Try to get the proper image tag for cache-busting; fall back to tagless URL
        let url = `${serverUrl}/Items/${id}/Images/Backdrop/0?quality=90&maxWidth=1920`;

        if (window.ApiClient && typeof window.ApiClient.getItem === 'function') {
            try {
                const userId = window.ApiClient.getCurrentUserId();
                const item = await window.ApiClient.getItem(userId, id);
                if (item.BackdropImageTags && item.BackdropImageTags.length > 0) {
                    url += `&tag=${item.BackdropImageTags[0]}`;
                } else {
                    // Item has no backdrop — clear any stale one
                    backdrop.style.backgroundImage = '';
                    return;
                }
            } catch (_) {
                // Proceed with tagless URL
            }
        }

        backdrop.style.backgroundImage = `url('${url}')`;
        backdrop.style.backgroundSize = 'cover';
        backdrop.style.backgroundPosition = 'center top';
    }

    let lastId = null;
    let timer = null;

    function schedule() {
        clearTimeout(timer);
        timer = setTimeout(async () => {
            const id = getItemId();
            const key = id || '';
            if (key !== lastId) {
                lastId = key;
                if (id) await applyBackdrop();
                else {
                    // Left the detail page — clear backdrop
                    const backdrop = document.getElementById('itemBackdrop');
                    if (backdrop) backdrop.style.backgroundImage = '';
                }
            }
        }, 400);
    }

    window.addEventListener('hashchange', schedule);
    window.addEventListener('popstate', schedule);
    document.addEventListener('viewshow', schedule);

    schedule();
})();
