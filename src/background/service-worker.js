chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.type === "TAOF_SAVE_BLOB") {
    chrome.downloads.download({ url: msg.url, filename: msg.name || `taof-${Date.now()}.mp4`, saveAs: true });
    sendResponse({ ok: true });
  }
});
