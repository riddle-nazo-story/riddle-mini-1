const eventId = "MY3qtFqNrj5a";
const locationId = "U4Etz4rYhyNb";

function escapeIdSlotsCallback(data) {
  console.log("API取得成功", data);

  if (!data.dates) {
    console.log("datesなし");
    return;
  }

  data.dates.forEach(dateObj => {
    console.log(dateObj.date, dateObj.vacancyType);

    dateObj.slots.forEach(slot => {
      console.log(slot.startAt, slot.vacancyType);
    });
  });
}

function loadSlots() {
  const script = document.createElement("script");
  script.src = `https://pubapi.escape.id/e/${eventId}/loc/${locationId}/slots.jsonp?callback=escapeIdSlotsCallback`;
  document.body.appendChild(script);
}

loadSlots();
