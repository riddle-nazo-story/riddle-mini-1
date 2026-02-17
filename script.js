const API_URL = "https://pubapi.escape.id/e/MY3qtFqNrj5a/loc/U4Etz4rYhyNb/slots.json";
const BASE_URL = "https://escape.id/RIDDLESTORY-org/e-mini-1/";

const SLOT_MAP = {
  "10:30":"?u=6c636fe0-ab90-454a-b251-72f44a34d078",
  "11:00":"?u=36cbe960-3c99-4aff-a6a7-fbc6e0afc22c",
  "11:30":"?u=342504f7-f591-41bc-8165-e3add136fb39",
  "12:00":"?u=1d4327a0-cbaa-4c4a-bf9a-32e06e9d8a30",
  "12:30":"?u=056c378b-5238-4ab7-98f8-4fff1bfa9646",
  "13:00":"?u=e5a51911-c866-4272-8901-6e47de1df08d",
  "13:30":"?u=7a5fba87-88cf-412c-bbd9-fd1830aac10f",
  "14:00":"?u=2b038710-81cf-4a87-b076-de0c3fdfc046"
};

fetch(API_URL)
  .then(res=>res.json())
  .then(data=>{
    renderSlots(data);
  });

function renderSlots(data){

  const grid = document.getElementById("slot-grid");
  const updateText = document.getElementById("update-time");

  grid.innerHTML = "";

  // 更新時間表示
  const now = new Date();
  updateText.textContent =
    `空き状況更新：${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()} ${now.getHours()}:${String(now.getMinutes()).padStart(2,"0")}`;

  if(!data.dates || !data.dates.length) return;

  const slots = data.dates[0].slots;

  Object.keys(SLOT_MAP).forEach(time=>{

    const slotData = slots.find(s=>{
      return s.startAt.includes(time);
    });

    let statusText = "販売前";
    let statusClass = "";

    if(slotData){
      switch(slotData.vacancyType){
        case "MANY":
          statusText = "◯ 空きあり";
          statusClass = "many";
          break;
        case "FEW":
          statusText = "△ 残り僅か";
          statusClass = "few";
          break;
        case "FULL":
          statusText = "× 満席";
          statusClass = "full";
          break;
      }
    }

    const link = document.createElement("a");
    link.className = "slot-card";
    link.href = BASE_URL + SLOT_MAP[time];
    link.target = "_blank";

    link.innerHTML = `
      <div class="slot-time">${time}</div>
      <div class="slot-status ${statusClass}">
        ${statusText}
      </div>
    `;

    grid.appendChild(link);

  });
}
