/* НАВИГАЦИЯ */
function openScreen(id){
  document.querySelectorAll('.screen')
    .forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

/* RIPPLE + ЗВУК */
const audio=new AudioContext();
function clickSound(){
  const o=audio.createOscillator();
  const g=audio.createGain();
  o.frequency.value=400;
  g.gain.value=.1;
  o.connect(g);
  g.connect(audio.destination);
  o.start();
  o.stop(audio.currentTime+.05);
}

document.addEventListener("click",e=>{
  if(e.target.tagName==="BUTTON"){
    clickSound();
    const r=document.createElement("span");
    r.className="ripple";
    e.target.appendChild(r);
    const s=Math.max(e.target.offsetWidth,e.target.offsetHeight);
    r.style.width=r.style.height=s+"px";
    r.style.left=e.offsetX-s/2+"px";
    r.style.top=e.offsetY-s/2+"px";
    setTimeout(()=>r.remove(),600);
  }
});

/* BLOCK BLAST */
const board=document.getElementById('board');
for(let i=0;i<100;i++){
  const c=document.createElement('div');
  c.className='cell';
  c.onclick=()=>c.classList.add('filled');
  board.appendChild(c);
}

/* КЕСТЕ — БЕЗ БАГОВ */
const schedule={
  1:["Қазақ тілі","Дж/тарих","Алгебра","Құқық негіздері","Ағылшын","География (ф)","Дене шын-у","Сынып сағаты"],
  2:["Қазақ әдебиет","Информатика","Қазақ т (ф)","Геометрия","Химия","География","Орыс т"],
  3:["Ағылшын","Информатика","Биология","Алгебра","Физика","Қазақстан тарих","География"],
  4:["АӘД","Геометрия","Алгебра","Қазақстан тарих","Химия","Дене шын-у","Орыс т"],
  5:["Қазақ әдебиет","Алгебра","Физика","Биология","Дене шын-у","Ағылшын","Жаһандық құз (ф)"]
};

function showDay(day){
  const box=document.getElementById("lessons");
  box.innerHTML="";
  schedule[day].forEach((l,i)=>{
    const d=document.createElement("div");
    d.className="lesson";
    d.textContent=(i+1)+". "+l;
    box.appendChild(d);
  });
}
