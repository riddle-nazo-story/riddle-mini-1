// ===== 2026年3月 =====
const year = 2026;
const month = 2; // 0始まり（2 = 3月）

const eventDays = [22]; // 開催日（好きに変更OK）

const calendar = document.getElementById("calendar");
const modal = document.getElementById("modal");
const modalDate = document.getElementById("modal-date");
const modalBody = document.getElementById("modal-body");
const closeBtn = document.getElementById("close");

// ===== 曜日表示 =====
const weekdays = ["日","月","火","水","木","金","土"];
weekdays.forEach(day=>{
  const wd = document.createElement("div");
  wd.classList.add("weekday");
  wd.textContent = day;
  calendar.appendChild(wd);
});

// ===== 月初情報 =====
const firstDay = new Date(year, month, 1).getDay();
const lastDate = new Date(year, month+1, 0).getDate();

// 空白埋め
for(let i=0;i<firstDay;i++){
  const empty = document.createElement("div");
  empty.classList.add("day","empty");
  calendar.appendChild(empty);
}

// 日付生成
for(let i=1;i<=lastDate;i++){
  const day = document.createElement("div");
  day.classList.add("day");
  day.textContent = i;

  if(eventDays.includes(i)){
    day.classList.add("active");
    day.addEventListener("click",()=>{
      modal.style.display="flex";
      modalDate.textContent = `2026年3月${i}日`;
      modalBody.innerHTML = `
        <div class="time-slot">10:30〜　〇空きあり</div>
        <div class="time-slot">11:00〜　〇空きあり</div>
        <div class="time-slot">11:30〜　〇空きあり</div>
        <div class="time-slot">12:00〜　〇空きあり</div>
        <div class="time-slot">12:30〜　〇空きあり</div>
        <div class="time-slot">13:00〜　〇空きあり</div>
        <div class="time-slot">13:30〜　〇空きあり</div>
        <div class="time-slot">14:00〜　〇空きあり</div>
      `;
    });
  }

  calendar.appendChild(day);
}

closeBtn.onclick = ()=> modal.style.display="none";
window.onclick = e => { if(e.target==modal) modal.style.display="none"; }

// ===== アコーディオン（複数開閉OK＋アニメーション） =====
const accBtns = document.querySelectorAll(".acc-btn");

accBtns.forEach(btn=>{
  btn.addEventListener("click",()=>{
    btn.classList.toggle("active");
    const content = btn.nextElementSibling;

    if(content.style.maxHeight){
      content.style.maxHeight = null;
      content.style.opacity = 0;
      content.style.padding = "0 20px";
    }else{
      content.style.maxHeight = content.scrollHeight + "px";
      content.style.opacity = 1;
      content.style.padding = "20px";
    }
  });
});
