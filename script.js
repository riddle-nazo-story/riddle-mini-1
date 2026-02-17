// ===== API情報 =====
const eventId = "MY3qtFqNrj5a";
const locationId = "U4Etz4rYhyNb";

const API_URL =
  `https://pubapi.escape.id/e/${eventId}/loc/${locationId}/slots.jsonp?callback=escapeIdSlotsCallback`;

// ===== JSONPコールバック（仕様書通り） =====
function escapeIdSlotsCallback(data) {

  console.log("取得成功:", data);

  const grid = document.getElementById("slot-grid");
  const updateTime = document.getElementById("update-time");

  if (!grid) {
    console.error("slot-gridが見つかりません");
    return;
  }

  // 更新時間表示（仕様書にある generatedAt を使用）
  if (data.generatedAt) {
    updateTime.textContent = "空き状況更新：" + data.generatedAt;
  }

  grid.innerHTML = "";

  if (!data.dates || data.dates.length === 0) {
    grid.innerHTML = "公演データがありません";
    return;
  }

  const day = data.dates[0]; // 今回は1日限定

  day.slots.forEach(slot => {

    const time = slot.startAt.slice(11, 16);
    const status = slot.vacancyType;

    const card = document.createElement("div");
    card.className = "slot-card";

    let statusText = "";
    let statusClass = "";

    switch (status) {
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
      default:
        statusText = "-";
    }

    card.innerHTML = `
      <div class="slot-time">${time}</div>
      <div class="slot-status ${statusClass}">${statusText}</div>
    `;

    grid.appendChild(card);
  });
}

// ===== JSONP読み込み =====
function loadSlots() {
  const script = document.createElement("script");
  script.src = API_URL;
  document.body.appendChild(script);
}

// DOM準備後に実行
document.addEventListener("DOMContentLoaded", loadSlots);
