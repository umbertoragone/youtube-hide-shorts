// ==UserScript==
// @name         YouTube Hide Shorts
// @version      1.0.0
// @description  Hide Shorts navigation, search filters, and shelves on YouTube
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
  const SHORTS_SHELF_SELECTOR = "ytd-rich-shelf-renderer[is-shorts]";
  const SEARCH_CHIP_SELECTOR =
    "ytd-search yt-chip-cloud-renderer yt-chip-cloud-chip-renderer";
  const SEARCH_SHORTS_SHELF_SELECTOR = "ytd-search grid-shelf-view-model";

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

      if (title?.toLowerCase() === "shorts" || label?.toLowerCase() === "shorts") {
        removeElement(entry);
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
      const label = chip.querySelector(".ytChipShapeText")?.textContent.trim();
      if (label?.toLowerCase() === "shorts") {
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
