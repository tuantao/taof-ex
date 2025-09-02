// Keyboard helpers around <video> (hover to activate)
function bindVideo(video) {
  if (!video || video.dataset.taofBound) return;
  video.dataset.taofBound = "1";

  const onKey = (e) => {
    if (e.key === ".") video.playbackRate = Math.min(4, (video.playbackRate || 1) + 0.25);
    if (e.key === ",") video.playbackRate = Math.max(0.25, (video.playbackRate || 1) - 0.25);
    if (e.key === "ArrowRight") video.currentTime += 5;
    if (e.key === "ArrowLeft") video.currentTime -= 5;
  };
  video.addEventListener("mouseenter", () => window.addEventListener("keydown", onKey));
  video.addEventListener("mouseleave", () => window.removeEventListener("keydown", onKey));
}

const mo = new MutationObserver(() => document.querySelectorAll("video").forEach(bindVideo));
mo.observe(document.documentElement, { childList: true, subtree: true });
document.querySelectorAll("video").forEach(bindVideo);
