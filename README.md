# Koros Group Gas Cylinder Status

A single-page status board for the gas cylinders stored in the Koros Lab rooms
(458 Perm1, 460 Sorption Lab, 472 Instrument, 474–475 Perm2).

**Live page:** https://ajinyoung-kim.github.io/koros-gas-cylinders/

## What it does

- Header shows the total cylinder count and the New / In use / Used split.
- Floor map shows every room with a pastel chip per gas, grouped into New / In use / Used rows; new cylinders glow softly in neon lime. Rooms grow with their contents, so nothing is clipped when a room holds many cylinders. An "All rooms" panel sums each gas across the lab. Click a room to filter the list, hover a chip for the breakdown.
- **Add** (top right) opens a form: gas, quantity, location, status, optional note. Entries update the map and totals immediately.
- **Edit** on a room card (or on a room line in the inventory) opens that room's list: change quantities, statuses and notes line by line, add or remove lines, then save the room in one go.
- The inventory list is grouped by gas, one line per room, so you can see at a glance where each gas is and in what state.
- Gases not in the list can be added with "Other gas…"; they get their own color automatically.
- **Export** downloads the inventory as a plain-text file; **Import** reads that file (or the blank `inventory-template.txt`) back after you edit it, shows a preview with any problems, and replaces the board on confirm.
- **Request** (bottom-right of the floor map) records a cylinder request: gas, quantity, who asked, optional note. Open requests are shared with everyone; **Done** removes one once the cylinders arrive.
- Editing (Add, Edit, Request, Import) asks for the lab PIN once per browser tab.
- Dark mode toggle, works on phones.

## Inventory text file

`inventory-template.txt` is a blank form; **Export** produces the same format filled in. Edit it in any text editor and **Import** it.

```
[460]   # Sorption Lab
N2      | 3 | in use | sorption rigs
He      | 2 | new
CO2     | 1 | used   | half empty

[458]   # Perm1
CH4     | 1 | new
```

Rules:

- A room starts with its number in brackets: `[460]`, `[458]`, `[472]`, `[474-475]`.
- Each line under a room is `Gas | Qty | Status | Note` (a TAB also works as separator; the note is optional).
- Gas: `N2 CO2 He CH4 O2 H2 Ar Air C3H6 C3H8 CO2/CH4`, or any other name, which is added as a new gas. `N₂`, `n2` and `Nitrogen` are all accepted.
- Qty: whole number 1–99. Status: `new`, `in use`, `used` (`full`, `inuse`, `empty` and similar are understood).
- `#` starts a comment; blank lines are ignored. The same gas with two statuses needs two lines.
- The file is the whole inventory: importing replaces everything on the board. The preview lists every problem with its line number and nothing changes until you confirm.

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

Anyone with the link can *view* the board. Only people who know the lab PIN can change it; a wrong PIN is rejected by the database rules, not just by the page. The PIN is asked before the first Add / Edit / Request / Import in a browser tab and kept until the tab is closed.

If you set the rules up before requests existed, paste the current `firebase.rules.json` into the Rules tab again and Publish, otherwise the page shows a notice that requests cannot be read.

If a browser already has local data when it first connects to an empty shared board, the page asks whether to publish that data or discard it, so nothing is overwritten silently.

## Gas colors

Pastel palette; every chip also carries the gas label, so color is never the only cue.

| Gas | Color | Gas | Color |
|-----|-------|-----|-------|
| N₂ | sky blue | H₂ | rose |
| CO₂ | peach | Ar | lavender |
| He | mint | Air | pink |
| CH₄ | butter yellow | C₃H₆ | aqua |
| O₂ | sage green | C₃H₈ | sand |
| CO₂/CH₄ mix | gray | custom | assigned automatically |

## Development

`index.html` is the whole app; `config.js` holds the optional shared-database settings; `firebase.rules.json` is the database security rule set.
Open `index.html` in a browser, or serve the folder with any static server.
Deployed with GitHub Pages directly from the `main` branch.

`reference/lab-status.png` is the original room sketch the floor map is based on.
