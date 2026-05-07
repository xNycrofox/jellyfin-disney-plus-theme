/* Disney+ Theme — Detail Page Tabs
 * Organises the sections below the hero area into Disney+-style tabs:
 *   Episoden | Vorgeschlagen | Extras | Besetzung
 *
 * Paste into JavaScript Injector plugin → Private Scripts.
 */
(function () {
    'use strict';

    // Selectors that belong to specific tabs (by element id)
    const SUGGESTED_IDS  = new Set(['similarCollapsible']);
    const EXTRAS_IDS     = new Set(['specialsCollapsible', 'musicVideosCollapsible', 'scenesCollapsible']);
    const CAST_IDS       = new Set(['castCollapsible', 'guestCastCollapsible']);
    // Everything else (childrenCollapsible, additionalPartsCollapsible, unnamed season
    // scrollers, moreFromSeasonSection, lyricsContainer, moreFromArtistSection,
    // seriesScheduleSection, …) goes to the "Episoden" tab.

    // ─── helpers ───────────────────────────────────────────────────────────────

    function getItemId() {
        const m = (window.location.hash + '&' + window.location.search)
            .match(/[?&#]id=([a-f0-9]{32})/i);
        return m ? m[1] : null;
    }

    function panelHasVisibleSection(panel) {
        return Array.from(panel.querySelectorAll('.detailVerticalSection'))
            .some(el => !el.classList.contains('hide'));
    }

    // ─── tab activation ────────────────────────────────────────────────────────

    function setActiveTab(tabBar, panelWrap, tabId) {
        tabBar.querySelectorAll('.dpt-tab').forEach(btn => {
            btn.classList.toggle('dpt-tab--active', btn.dataset.dptTab === tabId);
        });
        panelWrap.querySelectorAll('.dpt-panel').forEach(panel => {
            panel.hidden = panel.dataset.dptTab !== tabId;
        });
    }

    function refreshTabVisibility(tabBar, panelWrap) {
        const activeBtn = tabBar.querySelector('.dpt-tab--active');
        let activeStillVisible = false;

        tabBar.querySelectorAll('.dpt-tab').forEach(btn => {
            const panel = panelWrap.querySelector(`.dpt-panel[data-dpt-tab="${btn.dataset.dptTab}"]`);
            const visible = panel && panelHasVisibleSection(panel);
            btn.hidden = !visible;
            if (visible && btn === activeBtn) activeStillVisible = true;
        });

        // If the current active tab disappeared, move to the first visible one
        if (!activeStillVisible) {
            const first = tabBar.querySelector('.dpt-tab:not([hidden])');
            if (first) setActiveTab(tabBar, panelWrap, first.dataset.dptTab);
        }

        // Hide the whole tab bar if fewer than 2 tabs are visible
        const visibleCount = tabBar.querySelectorAll('.dpt-tab:not([hidden])').length;
        tabBar.hidden = visibleCount < 2;
    }

    // ─── build ─────────────────────────────────────────────────────────────────

    function buildTabs(page) {
        // Guard: don't rebuild if already present
        if (page.querySelector('.dpt-tabbar')) return;

        const content = page.querySelector('.detailPageContent');
        if (!content) return;

        // Only direct children that are detail vertical sections
        const allSections = Array.from(
            content.querySelectorAll(':scope > .detailVerticalSection')
        );
        if (allSections.length === 0) return;

        // Distribute sections into groups
        const groups = { episodes: [], suggested: [], extras: [], cast: [] };

        for (const section of allSections) {
            const id = section.id;
            if (SUGGESTED_IDS.has(id)) {
                groups.suggested.push(section);
            } else if (EXTRAS_IDS.has(id)) {
                groups.extras.push(section);
            } else if (CAST_IDS.has(id)) {
                groups.cast.push(section);
            } else {
                groups.episodes.push(section);
            }
        }

        const tabDefs = [
            { id: 'episodes',   label: 'Episoden',     sections: groups.episodes },
            { id: 'suggested',  label: 'Vorgeschlagen', sections: groups.suggested },
            { id: 'extras',     label: 'Extras',        sections: groups.extras },
            { id: 'cast',       label: 'Besetzung',     sections: groups.cast },
        ].filter(t => t.sections.length > 0);

        if (tabDefs.length < 2) return; // Not worth showing tabs for a single group

        // Build tab bar
        const tabBar = document.createElement('nav');
        tabBar.className = 'dpt-tabbar';
        tabBar.setAttribute('aria-label', 'Detail-Tabs');

        // Build panel wrapper
        const panelWrap = document.createElement('div');
        panelWrap.className = 'dpt-panels';

        for (const def of tabDefs) {
            const btn = document.createElement('button');
            btn.className = 'dpt-tab';
            btn.type = 'button';
            btn.dataset.dptTab = def.id;
            btn.textContent = def.label;
            tabBar.appendChild(btn);

            const panel = document.createElement('div');
            panel.className = 'dpt-panel';
            panel.dataset.dptTab = def.id;
            panel.hidden = true;
            for (const section of def.sections) {
                panel.appendChild(section);
            }
            panelWrap.appendChild(panel);
        }

        // Inject into DOM: tabBar first, then panelWrap
        content.prepend(panelWrap);
        content.prepend(tabBar);

        // Initial visibility + activate first visible tab
        refreshTabVisibility(tabBar, panelWrap);
        const firstVisible = tabBar.querySelector('.dpt-tab:not([hidden])');
        if (firstVisible) setActiveTab(tabBar, panelWrap, firstVisible.dataset.dptTab);

        // Tab click
        tabBar.addEventListener('click', e => {
            const btn = e.target.closest('.dpt-tab');
            if (btn && !btn.hidden) setActiveTab(tabBar, panelWrap, btn.dataset.dptTab);
        });

        // Watch sections for .hide changes so tabs appear/disappear as Jellyfin loads data
        const observer = new MutationObserver(() => refreshTabVisibility(tabBar, panelWrap));
        allSections.forEach(section => {
            observer.observe(section, { attributes: true, attributeFilter: ['class'] });
        });
    }

    // ─── navigation watcher ────────────────────────────────────────────────────

    let lastId   = null;
    let timer    = null;

    function schedule() {
        clearTimeout(timer);
        timer = setTimeout(() => {
            const page = document.getElementById('itemDetailPage');
            if (!page || page.classList.contains('hide')) {
                lastId = null;
                return;
            }
            const id = getItemId();
            if (!id) return;

            // Rebuild if new item OR if DOM was re-created (tabbar gone)
            const alreadyBuilt = !!page.querySelector('.dpt-tabbar');
            if (id === lastId && alreadyBuilt) return;

            lastId = id;
            buildTabs(page);
        }, 600);
    }

    window.addEventListener('hashchange', schedule);
    window.addEventListener('popstate', schedule);
    document.addEventListener('viewshow', schedule);
    schedule();
})();
