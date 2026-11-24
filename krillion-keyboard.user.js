// ==UserScript==
// @name         Krillion Keyboard Fix
// @namespace    krillion-keyboard-fix
// @version      1.0.1
// @description  Keeps the Krillion game visible above the iPhone keyboard: fits the board into the space left, shrinks the category card, and makes room for other players' answers.
// @match        https://krillion.io/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

/*
 * How it works
 * ------------
 * In iPhone Safari the keyboard covers the bottom of the page. Krillion
 * responds by sliding the whole game up, which pushes the category and the
 * other players' answers off the top of the screen.
 *
 * This script instead watches how much of the screen is still visible
 * (window.visualViewport) while you type in the answer box, and resizes the
 * game to exactly that space. Krillion then lays the board out to fit, and a
 * compact "typing" layout frees up more room. Everything returns to normal
 * when the keyboard closes.
 *
 * It only changes how the page looks. It never reads or sends game data.
 */
(function () {
  'use strict';

  // The keyboard has to cover at least this much before typing mode turns
  // on, so a hardware keyboard's thin shortcut bar doesn't trigger it.
  var FULL_KEYBOARD = 150;

  var css = [
    /* Turn off Krillion's own slide-up; this script fits the game instead. */
    '.ds-root { translate: none !important; }',

    /* Typing mode: pin the game to the visible area above the keyboard. */
    'html.kf-typing .ds-root {',
    '  top: var(--kf-top, 0px) !important;',
    '  height: var(--kf-height, 100vh) !important;',
    '  bottom: auto !important;',
    '}',
    'html.kf-typing, html.kf-typing body { overscroll-behavior: none; }',

    /* Shrink the category card to just the question. */
    'html.kf-typing .ds-root .ds-card { padding: 6px 12px !important; }',
    'html.kf-typing .ds-root .ds-card .rnd,',
    'html.kf-typing .ds-root .ds-card .hint { display: none !important; }',
    'html.kf-typing .ds-root .ds-card .prompt {',
    '  font-size: 24px !important; line-height: 1.2 !important; margin: 0 !important;',
    '}',

    /* Hide the bottom banner ad while typing and give its space back.
       visibility keeps it loaded so it reappears as soon as you stop. */
    'html.kf-typing #fixed_container_bottom { visibility: hidden !important; }',
    'html.kf-typing, html.kf-typing * {',
    '  --kr-ad-bottom: 0px !important; --kr-ad-dock-lift: 0px !important;',
    '}',

    /* Puffer Party: hide the top bar and move the card to the top. */
    'html.kf-typing .pf-root .ds-hud,',
    'html.kf-typing .pf-root .pf-leave,',
    'html.kf-typing .pf-root .ds-mute,',
    'html.kf-typing .pf-root .pf-chat-btn,',
    'html.kf-typing body:has(.pf-root) button[aria-controls="site-menu"] {',
    '  visibility: hidden !important; pointer-events: none !important;',
    '}',
    'html.kf-typing .pf-root .ds-card { top: 8px !important; }',

    /* Puffer Party: shrink players, name plates and the puffer. */
    'html.kf-typing .pf-root { --pf-spr: 46px !important; --pf-perch: 48px !important; }',
    'html.kf-typing .pf-root .pf-pbody { scale: 0.5; }',
    'html.kf-typing .pf-root .pf-plate { width: 56px !important; left: -28px !important; }',
    'html.kf-typing .pf-root .pf-name {',
    '  font-size: 12px !important; max-width: 100%; overflow: hidden; text-overflow: ellipsis;',
    '}',
    'html.kf-typing .pf-root .pf-heart { width: 8px !important; height: 7px !important; }',
    'html.kf-typing .pf-root .pf-meter { width: 24px !important; height: 4px !important; }'
  ].join('\n');

  function addStyle() {
    if (document.getElementById('krillion-keyboard-fix')) return;
    var style = document.createElement('style');
    style.id = 'krillion-keyboard-fix';
    style.textContent = css;
    (document.head || document.documentElement).appendChild(style);
  }

  var typing = false;
  var root = document.documentElement;
  // Tallest visible height seen with no keyboard up. Newer Safari can shrink
  // window.innerHeight along with the keyboard, so measure against this.
  var fullHeight = 0;

  function answerBoxFocused() {
    var el = document.activeElement;
    return !!(el && el.matches && el.matches('.ds-input'));
  }

  function update() {
    var vv = window.visualViewport;
    if (!vv) return;
    var focused = answerBoxFocused();
    if (!focused) {
      fullHeight = Math.max(vv.height, window.innerHeight);
    }
    var baseline = Math.max(fullHeight, window.innerHeight, document.documentElement.clientHeight);
    var covered = baseline - vv.height;
    var nowTyping = focused && covered > FULL_KEYBOARD;

    if (nowTyping) {
      // Safari may scroll the page while the keyboard is up; offsetTop is
      // how far, so the game follows the visible area exactly.
      root.style.setProperty('--kf-top', vv.offsetTop + 'px');
      root.style.setProperty('--kf-height', vv.height + 'px');
    }
    if (nowTyping !== typing) {
      typing = nowTyping;
      root.classList.toggle('kf-typing', typing);
      if (!typing) {
        root.style.removeProperty('--kf-top');
        root.style.removeProperty('--kf-height');
      }
      // Let Krillion re-measure and lay the board out for the new space.
      window.dispatchEvent(new Event('resize'));
    }
  }

  addStyle();
  document.addEventListener('DOMContentLoaded', function () { addStyle(); update(); });
  window.addEventListener('resize', function () { if (!typing) update(); });
  window.addEventListener('orientationchange', function () { fullHeight = 0; });

  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', update);
    window.visualViewport.addEventListener('scroll', update);
  }
  // Focus changes happen before the keyboard finishes moving; check again
  // once it has settled.
  document.addEventListener('focusin', function () { setTimeout(update, 50); setTimeout(update, 400); });
  document.addEventListener('focusout', function () { setTimeout(update, 50); setTimeout(update, 400); });
})();
