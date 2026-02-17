const eventId = "MY3qtFqNrj5a";
const locationId = "U4Etz4rYhyNb";

const apiUrl = `https://pubapi.escape.id/e/${eventId}/loc/${locationId}/slots.jsonp`;

function loadSlots() {
  const script = document.createElement("script");
  script.src = apiUrl;
  document.body.appendChild(script);
}

// JSONP callback
function escapeIdSlotsCallback(data) {
  console.log("API取得成功", data);

  if (!data.dates) return;

  data.dates.forEach(dateObj => {
    console.log(dateObj.date, dateObj.vacancyType);

    dateObj.slots.forEach(slot => {
      console.log(slot.startAt, slot.vacancyType);
    });
  });
}

loadSlots();
