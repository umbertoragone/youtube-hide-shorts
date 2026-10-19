// ==UserScript==
// @name         YouTube Hide Shorts
// @version      1.1.0
// @description  Hide Shorts navigation, search filters, and shelves on YouTube in multiple languages
// @author       umbertoragone
// @match        *://*.youtube.com/*
// @exclude      *://music.youtube.com/*
// @exclude      *://*.music.youtube.com/*
// @compatible   chrome
// @compatible   firefox
// @compatible   opera
// @compatible   safari
// @compatible   edge
// @downloadURL  https://github.com/umbertoragone/youtube-hide-shorts/raw/main/hide-shorts.user.js
// @updateURL    https://github.com/umbertoragone/youtube-hide-shorts/raw/main/hide-shorts.user.js
// @grant        none
// @run-at       document-end
// ==/UserScript==

(() => {
  "use strict";

  const MINI_GUIDE_ENTRY_SELECTOR =
    'ytd-mini-guide-renderer ytd-mini-guide-entry-renderer > a#endpoint[href]';
  const GUIDE_ENTRY_SELECTOR =
    "ytd-guide-section-renderer ytd-guide-entry-renderer";
  const CHANNEL_TAB_SELECTOR =
    "#tabsContainer yt-tab-group-shape .tabGroupShapeTabs > yt-tab-shape";
  const SHORTS_SHELF_SELECTOR = "ytd-rich-shelf-renderer[is-shorts]";
  const SEARCH_CHIP_SELECTOR =
    "ytd-search yt-chip-cloud-renderer yt-chip-cloud-chip-renderer";
  const SEARCH_SHORTS_SHELF_SELECTOR = "ytd-search grid-shelf-view-model";
  // Distinct tab labels, ordered by first appearance in YouTube's language menu.
  const SHORTS_LABELS = new Set([
    "kortvideo's",
    "shorts",
    "curts",
    "lühivideod",
    "ama-short",
    "short",
    "video fupi",
    "shorts-videoer",
    "kratki videoposnetki",
    "šorts",
    "кыска видеолор",
    "шортс",
    "youtube shorts",
    "կարճ հոլովակներ",
    "کوته‌ویدیوها",
    "მოკლე ვიდეოები",
    "ショート",
  ]);
  const SHORTS_LABEL_PATTERNS = [
    /(?:^|[^a-z0-9])shorts?(?:$|[^a-z0-9])/i,
    /(?:^|[^a-z0-9])šorts?(?:$|[^a-z0-9])/i,
  ];

  function isShortsLabel(value) {
    const label = value?.replace(/\s+/g, " ").trim().toLowerCase();
    return (
      SHORTS_LABELS.has(label || "") ||
      SHORTS_LABEL_PATTERNS.some((pattern) => pattern.test(label || ""))
    );
  }

  function removeElement(element) {
    if (element?.isConnected) {
      element.remove();
    }
  }

  function hideShortsMiniGuideEntry() {
    const entries = document.querySelectorAll(MINI_GUIDE_ENTRY_SELECTOR);
    for (const endpoint of entries) {
      let pathname;
      try {
        pathname = new URL(endpoint.getAttribute("href"), window.location.origin)
          .pathname;
      } catch {
        continue;
      }

      if (pathname === "/shorts" || pathname === "/shorts/") {
        removeElement(endpoint.closest("ytd-mini-guide-entry-renderer"));
      }
    }
  }

  function hideShortsGuideEntry() {
    const entries = document.querySelectorAll(GUIDE_ENTRY_SELECTOR);
    for (const entry of entries) {
      const endpoint = entry.querySelector(":scope > a#endpoint");
      const title = endpoint?.getAttribute("title")?.trim();
      const label = entry
        .querySelector("yt-formatted-string.title")
        ?.textContent.trim();

      if (isShortsLabel(title) || isShortsLabel(label)) {
        removeElement(entry);
      }
    }
  }

  function hideChannelShortsTab() {
    const tabs = document.querySelectorAll(CHANNEL_TAB_SELECTOR);
    for (const tab of tabs) {
      const labels = [
        tab.getAttribute("aria-label"),
        tab.getAttribute("tab-title"),
        tab.getAttribute("title"),
        tab.querySelector(".ytTabShapeTab")?.textContent,
        tab.textContent,
      ];
      if (labels.some(isShortsLabel)) {
        removeElement(tab);
      }
    }
  }

  function hideShortsShelf() {
    const shelves = document.querySelectorAll(SHORTS_SHELF_SELECTOR);
    for (const shelf of shelves) {
      removeElement(shelf.closest("ytd-rich-section-renderer") || shelf);
    }
  }

  function hideSearchShorts() {
    if (window.location.pathname !== "/results") return;

    const chips = document.querySelectorAll(SEARCH_CHIP_SELECTOR);
    for (const chip of chips) {
      const labels = [
        chip.getAttribute("aria-label"),
        chip.querySelector(".ytChipShapeText")?.textContent,
      ];
      if (labels.some(isShortsLabel)) {
        removeElement(chip);
      }
    }

    const shelves = document.querySelectorAll(SEARCH_SHORTS_SHELF_SELECTOR);
    for (const shelf of shelves) {
      if (
        shelf.querySelector(
          "ytm-shorts-lockup-view-model, ytm-shorts-lockup-view-model-v2",
        )
      ) {
        removeElement(shelf);
      }
    }
  }

  function hideShorts() {
    hideShortsMiniGuideEntry();
    hideShortsGuideEntry();
    hideChannelShortsTab();
    hideShortsShelf();
    hideSearchShorts();
  }

  let hideScheduled = false;
  function scheduleHideShorts() {
    if (hideScheduled) return;
    hideScheduled = true;

    window.requestAnimationFrame(() => {
      hideScheduled = false;
      hideShorts();
    });
  }

  const observer = new MutationObserver(scheduleHideShorts);
  observer.observe(document.body, { childList: true, subtree: true });

  window.addEventListener("yt-navigate-finish", scheduleHideShorts);

  hideShorts();
  console.log("[YouTube Hide Shorts] Loaded");
})();
