// Toggle stop/resume feed autoload
let stopped = false;
const styleId = "taof-stop-feed-style";

function applyStop(on) {
  const old = document.getElementById(styleId);
  if (old) old.remove();
  if (on) {
    const el = document.createElement("style");
    el.id = styleId;
    el.textContent = `
      [data-pagelet="MainFeed"] { overflow: hidden !important; max-height: 75vh !important; }
      [role="feed"] { overflow: hidden !important; }
    `;
    document.documentElement.appendChild(el);
  }
}

chrome.storage.sync.get({ stopFeed: false }, ({ stopFeed }) => {
  stopped = !!stopFeed;
  applyStop(stopped);
});

chrome.runtime.onMessage.addListener((msg) => {
  if (msg?.type === "TAOF_TOGGLE_STOP_FEED") {
    stopped = !stopped;
    chrome.storage.sync.set({ stopFeed: stopped });
    applyStop(stopped);
  }
});
