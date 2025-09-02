// Remove fbclid/ttclid/gclid/utm_* from URL and copied text
const BAD_PARAMS = new Set(["fbclid", "ttclid", "gclid", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]);

function cleanUrlString(urlString) {
  try {
    const u = new URL(urlString);
    let changed = false;
    BAD_PARAMS.forEach(p => {
      if (u.searchParams.has(p)) { u.searchParams.delete(p); changed = true; }
    });
    return changed ? u.toString() : null;
  } catch {
    return null;
  }
}

(function () {
  const cleaned = cleanUrlString(location.href);
  if (cleaned) history.replaceState({}, "", cleaned);

  document.addEventListener("copy", e => {
    const text = document.getSelection()?.toString();
    if (!text) return;
    const out = cleanUrlString(text);
    if (out) {
      e.clipboardData.setData("text/plain", out);
      e.preventDefault();
    }
  });
})();
