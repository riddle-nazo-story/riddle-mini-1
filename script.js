const eventId = "MY3qtFqNrj5a";
const locationId = "U4Etz4rYhyNb";

function escapeIdSlotsCallback(data) {
  console.log("API取得成功", data);

  const calendar = document.getElementById("calendar");
  calendar.innerHTML = ""; // ← ローディング消す

  if (!data.dates) {
    calendar.innerHTML = "データがありません";
    return;
  }

  data.dates.forEach(dateObj => {

    const dateDiv = document.createElement("div");
    dateDiv.style.marginBottom = "20px";

    const title = document.createElement("h3");
    title.textContent = dateObj.date;
    dateDiv.appendChild(title);

    dateObj.slots.forEach(slot => {
      const btn = document.createElement("button");
      btn.textContent = `${slot.startAt.slice(11,16)} - ${slot.vacancyType}`;
      btn.style.display = "block";
      btn.style.margin = "5px 0";

      btn.onclick = () => {
        window.location.href = "https://escape.id/RIDDLESTORY-org/e-mini-1/";
      };

      dateDiv.appendChild(btn);
    });

    calendar.appendChild(dateDiv);
  });
}

function loadSlots() {
  const script = document.createElement("script");
  script.src =
    `https://pubapi.escape.id/e/${eventId}/loc/${locationId}/slots.jsonp?callback=escapeIdSlotsCallback`;
  document.body.appendChild(script);
}

loadSlots();
