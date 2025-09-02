const stopFeedEl = document.getElementById("stopFeed");
const toggleBtn = document.getElementById("toggleStopFeed");

chrome.storage.sync.get({ stopFeed: false }, ({ stopFeed }) => { stopFeedEl.checked = !!stopFeed; });

stopFeedEl.addEventListener("change", () => {
  chrome.storage.sync.set({ stopFeed: stopFeedEl.checked });
  chrome.runtime.sendMessage({ type: "TAOF_TOGGLE_STOP_FEED" });
});

toggleBtn.addEventListener("click", () => {
  chrome.runtime.sendMessage({ type: "TAOF_TOGGLE_STOP_FEED" });
  chrome.storage.sync.get({ stopFeed: false }, ({ stopFeed }) => (stopFeedEl.checked = !!stopFeed));
});
