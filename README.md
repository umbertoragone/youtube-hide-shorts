# YouTube Hide Shorts

[![GitHub release](https://img.shields.io/github/v/release/umbertoragone/youtube-hide-shorts)](https://github.com/umbertoragone/youtube-hide-shorts/releases)

A lightweight userscript that hides YouTube's **Shorts** entries, search filter, and Shorts shelves.

## Features

- Hides only the mini-guide entry linked to `/shorts/`
- Hides the **Shorts** entry in YouTube's expanded sidebar
- Hides the Shorts shelf using YouTube's `is-shorts` renderer attribute
- Hides the **Shorts** filter chip and Shorts shelves on `/results`
- Works dynamically with YouTube's modern **Single Page Application (SPA)** behavior
- Reacts to navigation and content updates automatically
- 100% client-side — no API calls, no external dependencies

## How It Works

The script identifies the mini-guide entry by its `/shorts/` destination and removes that entry. In the expanded sidebar, it removes the guide entry whose title or label is **Shorts**. It identifies homepage shelves through the `is-shorts` attribute. On search results, it removes the chip labeled **Shorts** and each `grid-shelf-view-model` containing Shorts lockups, leaving surrounding search results intact.

## Installation

### Option 1. Using Tampermonkey (Recommended)

[![Install](https://img.shields.io/badge/Install-Tampermonkey-00485B?style=for-the-badge&logo=tampermonkey&logoColor=white)](https://raw.githubusercontent.com/umbertoragone/youtube-hide-shorts/main/hide-shorts.user.js)

**Quick install:** Click the button above if you already have Tampermonkey installed.

Or install manually:

1. Install **[Tampermonkey](https://www.tampermonkey.net/)** for your browser.
2. Click **Create a new script**.
3. Paste the contents of [`hide-shorts.user.js`](./hide-shorts.user.js).
4. Save the script and refresh **YouTube**.

### Option 2. Using AdGuard

[![Install](https://img.shields.io/badge/Install-AdGuard-68BC71?style=for-the-badge&logo=adguard&logoColor=white)](https://raw.githubusercontent.com/umbertoragone/youtube-hide-shorts/main/hide-shorts.user.js)

**Quick install:** Click the button above if you already have AdGuard installed.

Or install manually:

1. Open AdGuard settings.
2. Navigate to **Extensions → Userscripts** (or **Filters → Custom** if using the extension).
3. Click **Add userscript**.
4. Enter the direct URL to the script: `https://raw.githubusercontent.com/umbertoragone/youtube-hide-shorts/main/hide-shorts.user.js`
5. AdGuard will download and manage the script automatically.
6. Refresh YouTube to activate it.

## Contributing

Pull requests are welcome. If YouTube changes its layout, please open an issue with an HTML snippet showing the updated mini-guide entry, sidebar entry, search filter, or Shorts shelf.
