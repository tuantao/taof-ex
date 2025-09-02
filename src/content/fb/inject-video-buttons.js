// Add a floating "Download" button to each <video> element
const BTN_CLASS = "taof-download-btn";

function addBtnToVideo(video) {
  if (!video || video.closest(".taof-has-btn")) return;

  const wrap = document.createElement("div");
  wrap.className = "taof-has-btn";
  wrap.style.position = "relative";

  const btn = document.createElement("button");
  btn.textContent = "Download";
  btn.className = BTN_CLASS;
  btn.style.position = "absolute";
  btn.style.right = "8px";
  btn.style.bottom = "8px";
  btn.style.zIndex = "9999";
  btn.style.padding = "6px 10px";
  btn.style.borderRadius = "10px";
  btn.style.border = "none";
  btn.style.background = "#e11d48";
  btn.style.color = "#fff";
  btn.style.fontWeight = "700";
  btn.style.cursor = "pointer";
  btn.style.boxShadow = "0 6px 18px rgba(0,0,0,.25)";
  btn.addEventListener("click", async () => {
    try {
      const src = video.currentSrc || video.src;
      if (!src) return alert("Không tìm thấy nguồn video!");
      const res = await fetch(src);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const name = `facebook-video-${Date.now()}.mp4`;
      chrome.runtime.sendMessage({ type: "TAOF_SAVE_BLOB", url, name });
    } catch (e) {
      console.error(e);
      alert("Tải video thất bại!");
    }
  });

  const parent = video.parentElement;
  if (!parent) return;
  parent.insertBefore(wrap, video);
  wrap.appendChild(video);
  wrap.appendChild(btn);
}

function scanVideos() {
  document.querySelectorAll("video").forEach(addBtnToVideo);
}

const mo = new MutationObserver(scanVideos);
mo.observe(document.documentElement, { childList: true, subtree: true });
scanVideos();
