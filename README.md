# Krillion Keyboard Fix (Safari)

Makes Krillion and Puffer Party playable on iPhone Safari: when you type an
answer, the category and everyone's answers stay on screen above the keyboard.
Free, no app download beyond the Userscripts extension, works on any iPhone.

**Install link (open in Safari on your iPhone):**
https://gist.githubusercontent.com/alanqiao6/f224230b228101651bd4273c86362dca/raw/krillion-keyboard.user.js

## Install (about 2 minutes, one time)

1. Install **Userscripts** (free) from the App Store.
2. Open the Userscripts app once and tap **Set Userscripts Directory**. Pick a
   folder in Files, for example *On My iPhone → Userscripts*.
3. Turn the extension on: **Settings → Apps → Safari → Extensions →
   Userscripts** → **Allow Extension** on.
   Then give it permission for Krillion (this step is easy to miss; without
   it the script never runs): open **krillion.io** in Safari, tap the page
   menu at the left of the address bar → **Userscripts** →
   **Always Allow on This Website**. Afterwards, Settings should show
   **krillion.io → Allow** under Permissions.
4. Add the script, either way:
   - **From a file:** save `krillion-keyboard.user.js` (AirDrop, Messages,
     iCloud Drive) into the folder you picked in step 2.
   - **From the link (easiest):** open the install link above in Safari, tap
     the page menu at the left of the address bar → **Userscripts** →
     **Install**.
5. **Reload** krillion.io in Safari (scripts only load when the page loads)
   and play. Nothing else to do.

**Check it's running:** on krillion.io, open the page menu → Userscripts.
"Krillion Keyboard Fix" should be listed and switched on.

## What it changes (only while the keyboard is open)

- Fits the game into the space above the keyboard instead of sliding it off screen.
- Shrinks the category card to a single line and puts it at the top.
- Puffer Party: hides the top bar and makes players and the puffer smaller.
- Hides the bottom banner ad so the board has room (it comes back when you
  stop typing).

It only changes how the page looks. It does not read or send any game data.

## Updating

If you installed from the link, Userscripts can check for new versions on its
own (open the Userscripts menu on any page → **Check for updates**). If you
installed from a file, replace it with the new version or install from the
link instead.

## Notes

- Safari only. Chrome and other iPhone browsers don't support extensions.
- If Krillion changes their site, parts of the fix may stop working until the
  script is updated.
