const eventId = "MY3qtFqNrj5a";
const locationId = "U4Etz4rYhyNb";

document.addEventListener("DOMContentLoaded", function () {

  function escapeIdSlotsCallback(data) {
    console.log("API取得成功", data);

    const calendar = document.getElementById("calendar");

    if (!calendar) {
      console.error("calendarが見つからない");
      return;
    }

    calendar.innerHTML = ""; // ← 更新中を消す

    if (!data || !data.dates) {
      calendar.innerHTML = "データがありません";
      return;
    }

    data.dates.forEach(dateObj => {
      dateObj.slots.forEach(slot => {

        const btn = document.createElement("button");
        btn.textContent = slot.startAt.slice(11,16) + " - " + slot.vacancyType;
        btn.style.display = "block";
        btn.style.margin = "5px 0";

        calendar.appendChild(btn);
      });
    });
  }

  // ★ ここ重要：windowに登録
  window.escapeIdSlotsCallback = escapeIdSlotsCallback;

  const script = document.createElement("script");
  script.src =
    `https://pubapi.escape.id/e/${eventId}/loc/${locationId}/slots.jsonp?callback=escapeIdSlotsCallback`;

  document.body.appendChild(script);

});
