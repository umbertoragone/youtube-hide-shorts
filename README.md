# YouTube Hide Shorts

[![GitHub release](https://img.shields.io/github/v/release/umbertoragone/youtube-hide-shorts)](https://github.com/umbertoragone/youtube-hide-shorts/releases)

A lightweight userscript that hides YouTube's **Shorts** entries, search filter, and Shorts shelves.

## Features

- Hides the Shorts entry in YouTube navigation
- Hides the **Shorts** entry in YouTube's expanded sidebar
- Hides the Shorts tab on channel pages by its label, regardless of tab order
- Hides Shorts shelves
- Hides the **Shorts** filter and shelves in search results
- Works dynamically with YouTube's modern **Single Page Application (SPA)** behavior
- Reacts to navigation and content updates automatically
- 100% client-side — no API calls, no external dependencies

## How It Works

The script hides Shorts links, channel tabs, and video sections as YouTube loads them. On channel pages, it identifies the Shorts tab by its label, so the tab's position does not matter. It also handles YouTube's automatic page updates.

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
