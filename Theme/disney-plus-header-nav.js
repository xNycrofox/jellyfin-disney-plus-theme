/* Disney+ Theme — Header Navigation
 * Reads the library links from the sidebar drawer and injects them as a
 * horizontal nav bar into the header, like Disney+'s top nav:
 *   Startseite · Filme · Serien · …
 *
 * Paste into JavaScript Injector plugin → Private Scripts.
 */
(function () {
    'use strict';

    const NAV_ID = 'dp-header-nav';

    // ─── helpers ───────────────────────────────────────────────────────────────

    /** Resolve the raw href attribute to a hash string like "#/movies?…" */
    function rawHref(el) {
        return el ? (el.getAttribute('href') || '') : '';
    }

    /** Return the topParentId param from a hash string, or null. */
    function topParentId(hash) {
        const q = hash.includes('?') ? hash.slice(hash.indexOf('?') + 1) : '';
        return new URLSearchParams(q).get('topParentId');
    }

    /** True when the nav item's href matches the current page. */
    function isActive(itemHref) {
        const hash = window.location.hash;
        // Exact match (covers #/home)
        if (hash === itemHref) return true;
        // Library pages: match via topParentId
        const pid = topParentId(itemHref);
        if (pid) return topParentId(hash) === pid;
        return false;
    }

    // ─── extract links from the sidebar drawer ─────────────────────────────────

    function collectLinks() {
        const links = [];

        // Home
        const homeEl = document.querySelector(
            '.mainDrawer-scrollContainer > a.lnkMediaFolder, ' +
            '.mainDrawer-scrollContainer .lnkMediaFolder:not(.libraryMenuOptions .lnkMediaFolder)'
        );
        if (homeEl) {
            links.push({
                href:  rawHref(homeEl),
                icon:  homeEl.querySelector('.navMenuOptionIcon')?.textContent?.trim() ?? 'home',
                label: homeEl.querySelector('.navMenuOptionText')?.textContent?.trim() ?? 'Startseite',
            });
        }

        // Library folders (Filme, Serien, etc.)
        document.querySelectorAll('.libraryMenuOptions .lnkMediaFolder').forEach(el => {
            links.push({
                href:  rawHref(el),
                icon:  el.querySelector('.navMenuOptionIcon')?.textContent?.trim() ?? 'folder',
                label: (el.querySelector('.sectionName') ?? el.querySelector('.navMenuOptionText'))
                           ?.textContent?.trim() ?? '',
            });
        });

        return links;
    }

    // ─── build / refresh ───────────────────────────────────────────────────────

    function buildNav() {
        if (document.getElementById(NAV_ID)) return; // already built

        const headerTop   = document.querySelector('.headerTop');
        const headerRight = document.querySelector('.headerRight');
        if (!headerTop || !headerRight) return;

        const links = collectLinks();
        if (links.length === 0) return; // drawer not ready yet

        const nav = document.createElement('nav');
        nav.id = NAV_ID;

        links.forEach(link => {
            const a = document.createElement('a');
            a.className = 'dp-nav-item';
            a.href = link.href;
            a.classList.toggle('dp-nav-item--active', isActive(link.href));

            const icon = document.createElement('span');
            icon.className = 'material-icons dp-nav-icon';
            icon.setAttribute('aria-hidden', 'true');
            icon.textContent = link.icon;

            const label = document.createElement('span');
            label.className = 'dp-nav-label';
            label.textContent = link.label;

            a.append(icon, label);
            nav.appendChild(a);

            // Let Jellyfin's router handle navigation
            a.addEventListener('click', e => {
                e.preventDefault();
                window.location.hash = link.href.startsWith('#') ? link.href.slice(1) : link.href;
            });
        });

        headerTop.insertBefore(nav, headerRight);
    }

    function refreshActive() {
        const nav = document.getElementById(NAV_ID);
        if (!nav) return;
        nav.querySelectorAll('.dp-nav-item').forEach(a => {
            const href = a.getAttribute('href') || '';
            a.classList.toggle('dp-nav-item--active', isActive(href));
        });
    }

    // ─── retry until drawer is populated ───────────────────────────────────────

    let attempts = 0;

    function tryBuild() {
        if (document.getElementById(NAV_ID)) {
            refreshActive();
            return;
        }
        buildNav();
        if (!document.getElementById(NAV_ID) && attempts < 20) {
            attempts++;
            setTimeout(tryBuild, 400);
        }
    }

    window.addEventListener('hashchange', refreshActive);
    document.addEventListener('viewshow', () => { attempts = 0; tryBuild(); });

    // Initial run
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(tryBuild, 200));
    } else {
        setTimeout(tryBuild, 200);
    }
})();
