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

Everything is stored in the browser (`localStorage`), so the page works with no backend.
That also means each browser keeps its own copy. To share the current state with the lab:

1. Click **Export** to download a JSON snapshot.
2. On another machine, click **Import** and pick that file.

If a shared, always-in-sync inventory is needed later, the data model is a plain JSON array
(`{ gas, count, status, lab, note, updated }`) and can be moved to a small backend
(GitHub-hosted JSON, Firebase, Supabase, etc.) without changing the UI.

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

It is one file: `index.html`. Open it in a browser, or serve it with any static server.
Deployed with GitHub Pages via `.github/workflows/pages.yml`.

`reference/lab-status.png` is the original room sketch the floor map is based on.
