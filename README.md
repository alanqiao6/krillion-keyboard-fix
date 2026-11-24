# Krillion Keyboard Fix (Safari)

Makes Krillion and Puffer Party playable on iPhone Safari: when you type an
answer, the category and everyone's answers stay on screen above the keyboard.
Free, no app download beyond the Userscripts extension, works on any iPhone.

## Install (about 2 minutes, one time)

1. Install **Userscripts** (free) from the App Store.
2. Open the Userscripts app once and tap **Set Userscripts Directory**. Pick a
   folder in Files, for example *On My iPhone → Userscripts*.
3. Turn the extension on: **Settings → Apps → Safari → Extensions →
   Userscripts** → on. Under permissions, allow **krillion.io**.
4. Add the script, either way:
   - **From a file:** save `krillion-keyboard.user.js` (AirDrop, Messages,
     iCloud Drive) into the folder you picked in step 2.
   - **From a link:** open the script's link in Safari, tap the **puzzle-piece
     icon** in the address bar → **Userscripts** → **Install**.
5. Open **krillion.io** in Safari and play. Nothing else to do.

## What it changes (only while the keyboard is open)

- Fits the game into the space above the keyboard instead of sliding it off screen.
- Shrinks the category card to a single line and puts it at the top.
- Puffer Party: hides the top bar and makes players and the puffer smaller.
- Hides the bottom banner ad so the board has room (it comes back when you
  stop typing).

It only changes how the page looks. It does not read or send any game data.

## Updating

Replace the file in your Userscripts folder with the new version (or install
from the link again).

## Notes

- Safari only. Chrome and other iPhone browsers don't support extensions.
- If Krillion changes their site, parts of the fix may stop working until the
  script is updated.
