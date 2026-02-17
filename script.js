const calendar = document.getElementById("calendar");
const modal = document.getElementById("modal");
const modalDate = document.getElementById("modal-date");
const modalBody = document.getElementById("modal-body");
const closeBtn = document.getElementById("close");

const EVENT_PAGE_URL = "https://escape.id/RIDDLESTORY-org/e-mini-1/";

const EVENT_ID = "MY3qtFqNrj5a";
const LOCATION_ID = "U4Etz4rYhyNb";

const API_URL = `https://pubapi.escape.id/e/${EVENT_ID}/loc/${LOCATION_ID}/slots.json`;

const weekdays = ["日","月","火","水","木","金","土"];

calendar.innerHTML = "";

// ===== 曜日 =====
weekdays.forEach((day,index)=>{
  const wd = document.createElement("div");
  wd.classList.add("weekday");
  wd.textContent = day;

  if(index===0) wd.classList.add("sun");
  if(index===6) wd.classList.add("sat");

  calendar.appendChild(wd);
});

// ===== API取得 =====
fetch(API_URL)
  .then(res=>res.json())
  .then(data=>{
    generateCalendar(data);
  })
  .catch(err=>{
    console.error("API取得失敗:",err);
  });

function generateCalendar(apiData){

  if(!apiData.dates || !apiData.dates.length) return;

  const firstDate = new Date(apiData.dates[0].date);
  const year = firstDate.getFullYear();
  const month = firstDate.getMonth();

  const eventDates = apiData.dates.map(d=>d.date);

  const firstDay = new Date(year,month,1).getDay();
  const lastDate = new Date(year,month+1,0).getDate();

  // 空白
  for(let i=0;i<firstDay;i++){
    const empty=document.createElement("div");
    empty.classList.add("day","empty");
    calendar.appendChild(empty);
  }

  for(let i=1;i<=lastDate;i++){

    const dateStr = `${year}-${String(month+1).padStart(2,"0")}-${String(i).padStart(2,"0")}`;

    const day=document.createElement("div");
    day.classList.add("day");
    day.textContent=i;

    const weekIndex = new Date(year,month,i).getDay();
    if(weekIndex===0) day.classList.add("sun");
    if(weekIndex===6) day.classList.add("sat");

    if(eventDates.includes(dateStr)){

      const selected = apiData.dates.find(d=>d.date===dateStr);
      const symbol = getSymbol(selected.slots);

      day.classList.add("active");

      if(symbol){
        const mark=document.createElement("div");
        mark.classList.add("status-mark");
        mark.textContent=symbol;

        if(symbol==="◯") mark.classList.add("many");
        if(symbol==="△") mark.classList.add("few");
        if(symbol==="×") mark.classList.add("full");

        day.appendChild(mark);
      }

      // 日付タップでモーダル表示
      day.addEventListener("click",()=>{
        openModal(dateStr, selected.slots);
      });
    }

    calendar.appendChild(day);
  }
}

// ===== 記号判定 =====
function getSymbol(slots){
  if(slots.some(s=>s.vacancyType==="MANY")) return "◯";
  if(slots.some(s=>s.vacancyType==="FEW")) return "△";
  if(slots.some(s=>s.vacancyType==="FULL")) return "×";
  return "";
}

// ===== モーダル =====
function openModal(dateStr, slots){

  modal.style.display="flex";
  modalDate.textContent=dateStr;
  modalBody.innerHTML="";

  slots.forEach(slot=>{

    const link=document.createElement("a");
    link.classList.add("time-slot");

    const start=slot.startAt.split(" ")[1].slice(0,5);
    const end=slot.endAt.split(" ")[1].slice(0,5);

    link.textContent=`${start}〜${end}（${convertStatus(slot.vacancyType)}）`;

    // 👇 各公演タップでイベントページへ
    link.href = EVENT_PAGE_URL;
    link.target = "_blank";

    modalBody.appendChild(link);
  });
}

function convertStatus(type){
  switch(type){
    case "MANY": return "空きあり";
    case "FEW": return "残りわずか";
    case "FULL": return "満席";
    case "NOT_IN_SALES_PERIOD": return "販売前";
  }
}

// モーダル閉じる
closeBtn.onclick=()=>modal.style.display="none";
window.onclick=e=>{ if(e.target==modal) modal.style.display="none"; };
