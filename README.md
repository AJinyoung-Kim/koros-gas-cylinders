# Koros Lab Gas Cylinders Status

A single-page status board for the gas cylinders stored in the Koros Lab rooms
(458 Perm1, 460 Sorption Lab, 472 Instrument, 474–475 Perm2).

**Live page:** https://ajinyoung-kim.github.io/koros-gas-cylinders/

## What it does

- Header shows the total cylinder count and the New / In use / Used split.
- Floor map shows every room with a colored chip per gas (count, plus dots for the status mix). Click a room to filter the list, hover a chip for the breakdown.
- **Add** (top right) opens a form: gas, quantity, location, status, optional note. Entries update the map and totals immediately.
- **Edit** on any row changes quantity, status, location or note, or deletes the entry.
- Gases not in the list can be added with "Other gas…"; they get their own color automatically.
- Dark mode toggle, works on phones.

## Where the data lives

The page has two modes, chosen by `config.js`:

| Mode | When | Behaviour |
|------|------|-----------|
| Local only | `firebase: null` (default) | Each browser keeps its own copy in `localStorage`. Share snapshots with **Export** / **Import**. |
| Shared board | Firebase config filled in | One live inventory for the whole lab. Every change is written to a Firebase Realtime Database and shows up on every open page within a second. |

The header pill shows which mode is active (Local only / Live · shared board / Offline).

### Setting up the shared board (one-time, ~5 minutes)

1. Go to https://console.firebase.google.com and **Add project** (any name, e.g. `koros-gas`). Google Analytics can be turned off.
2. In the project: **Build → Realtime Database → Create database**. Pick the nearest location and start in *locked mode*.
3. Open the **Rules** tab, replace everything with the contents of `firebase.rules.json`, and **Publish**.
4. Open the **Data** tab and add a child `secret` with a child `pin` whose value is the lab PIN (e.g. `1111`; number or string both work). This is the PIN lab members type once per browser before they can edit. Only the console can read or change it.
5. **Project settings (gear) → Your apps → Web (</>)**, register the app, and copy the `firebaseConfig` object.
6. Paste it into `config.js` as `window.KOROS_CONFIG = { firebase: { ... } }` and push. The next page load is live.

Anyone with the link can *view* the board. Only people who know the lab PIN can change it; a wrong PIN is rejected by the database rules, not just by the page.

If a browser already has local data when it first connects to an empty shared board, the page asks whether to publish that data or discard it, so nothing is overwritten silently.

## Gas colors

| Gas | Color | Gas | Color |
|-----|-------|-----|-------|
| N₂ | blue | H₂ | red |
| CO₂ | orange | Ar | violet |
| He | aqua | Air | pink |
| CH₄ | yellow | C₃H₆ | teal |
| O₂ | green | C₃H₈ | brown |
| CO₂/CH₄ mix | gray | custom | assigned automatically |

## Development

`index.html` is the whole app; `config.js` holds the optional shared-database settings; `firebase.rules.json` is the database security rule set.
Open `index.html` in a browser, or serve the folder with any static server.
Deployed with GitHub Pages directly from the `main` branch.

`reference/lab-status.png` is the original room sketch the floor map is based on.
