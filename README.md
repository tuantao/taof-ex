# TaoF - Friends (MVP)
Toolbox hỗ trợ Facebook/Threads/TikTok: nút tải video, chặn tracking params, stop feed, video controls.

## Cách cài (Load Unpacked)
1. Mở `chrome://extensions`
2. Bật **Developer mode**
3. `Load unpacked` → chọn folder `taof-ex`
4. Mở Facebook và thử video để thấy nút **Download**.

## Thư mục
- `manifest.json` — MV3
- `src/background/service-worker.js` — bắt message và gọi `chrome.downloads.download`
- `src/content/fb/*.js` — 4 content scripts:
  - `inject-video-buttons.js`
  - `remove-tracking.js`
  - `stop-feed.js`
  - `video-controls.js`
- `popup/` — UI đơn giản để bật/tắt stop feed

## Ghi chú chính sách
- Mặc định chỉ chạy trên facebook.com.
- Không thu thập dữ liệu, mọi xử lý đều **cục bộ** trên trình duyệt.
- Không dùng API riêng của Facebook.
