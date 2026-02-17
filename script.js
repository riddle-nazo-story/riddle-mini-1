// =====================
// 設定
// =====================
const API_URL = "https://pubapi.escape.id/e/MY3qtFqNrj5a/loc/U4Etz4rYhyNb/slots.json";
const EVENT_BASE_URL = "https://escape.id/RIDDLESTORY-org/e-mini-1/";

// 時間ごとの固定 u パラメータ
const SLOT_MAP = {
  "10:30": "?u=6c636fe0-ab90-454a-b251-72f44a34d078",
  "11:00": "?u=36cbe960-3c99-4aff-a6a7-fbc6e0afc22c",
  "11:30": "?u=342504f7-f591-41bc-8165-e3add136fb39",
  "12:00": "?u=1d4327a0-cbaa-4c4a-bf9a-32e06e9d8a30",
  "12:30": "?u=056c378b-5238-4ab7-98f8-4fff1bfa9646",
  "13:00": "?u=e5a51911-c866-4272-8901-6e47de1df08d",
  "13:30": "?u=7a5fba87-88cf-412c-bbd9-fd1830aac10f",
  "14:00": "?u=2b038710-81cf-4a87-b076-de0c3fdfc046"
};

// =====================
// 初期化（DOMが準備されてから実行）
// =====================
document.addEventListener("DOMContentLoaded", () => {
  fetchSlots();
});

// =====================
// 空き取得関数
// =====================
async function fetchSlots() {
  const grid = document.getElementById("slot-grid");
  const updateEl = document.getElementById("update-time");

  // 更新中表記
  if (updateEl) updateEl.textContent = "空き状況更新中…";

  try {
    const response = await fetch(`${API_URL}?t=${Date.now()}`);
    if (!response.ok) throw new Error("取得エラー");

    const data = await response.json();

    // 最終更新時間を表示
    if (updateEl) {
      if (data.generatedAt) {
        updateEl.textContent = "空き状況更新：" + data.generatedAt;
      } else {
        const now = new Date();
        updateEl.textContent = `空き状況更新：${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()} ${now.getHours()}:${String(now.getMinutes()).padStart(2,"0")}`;
      }
    }

    renderSlots(grid, data);

  } catch (err) {
    console.error("空き状況取得失敗", err);
    if (updateEl) updateEl.textContent = "空き状況の取得に失敗しました";
    if (grid) grid.innerHTML = "<p>データを取得できませんでした</p>";
  }
}

// =====================
// 描画関数
// =====================
function renderSlots(grid, data) {
  if (!grid) return;
  grid.innerHTML = "";

  if (!data || !data.dates || !data.dates.length) {
    grid.innerHTML = "<p>該当日程の情報がありません</p>";
    return;
  }

  const slots = data.dates[0].slots || [];

  Object.keys(SLOT_MAP).forEach(time => {

    const uParam = SLOT_MAP[time];
    const slotData = slots.find(s => s.startAt && s.startAt.includes(time));

    // 状態文字と CSS クラス
    let statusText = "販売前";
    let statusClass = "";

    if (slotData) {
      switch (slotData.vacancyType) {
        case "MANY":
          statusText = "◯ 空きあり";
          statusClass = "many";
          break;
        case "FEW":
          statusText = "△ 残りわずか";
          statusClass = "few";
          break;
        case "FULL":
          statusText = "× 満席";
          statusClass = "full";
          break;
        case "NOT_IN_SALES_PERIOD":
          statusText = "販売前";
          break;
      }
    }

    // aタグで枠を作成
    const a = document.createElement("a");
    a.className = "slot-card";
    a.href = EVENT_BASE_URL + uParam;
    a.target = "_blank";

    a.innerHTML = `
      <div class="slot-time">${time}</div>
      <div class="slot-status ${statusClass}">${statusText}</div>
    `;

    grid.appendChild(a);
  });
}
