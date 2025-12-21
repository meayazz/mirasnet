function hesapla(){
const mal=+document.getElementById("mal").value;
if(mal<=0){alert("Mal giriniz");return}

let kalan=1;
let sonuc=[];

const es=+esEl.value,ogul=+ogulEl.value,kiz=+kizEl.value;
const baba=+babaEl.value,anne=+anneEl.value;
const dede=+dedeEl.value,kardes=+kardesEl.value;

if(es>0){
let p=(ogul+kiz)>0?1/8:1/4;
sonuc.push({ad:"Eş",pay:p});
kalan-=p;
}

if(anne>0){
let p=(ogul+kiz)>0?1/6:1/3;
sonuc.push({ad:"Anne",pay:p});
kalan-=p;
}

if(baba>0){
if(ogul+kiz>0){sonuc.push({ad:"Baba",pay:1/6});kalan-=1/6}
else{sonuc.push({ad:"Baba",pay:kalan});kalan=0}
}

if(baba==0 && dede>0){
sonuc.push({ad:"Dede",pay:1/6});
kalan-=1/6;
}

if(ogul+kiz>0){
let birim=kalan/(ogul*2+kiz);
if(ogul>0)sonuc.push({ad:"Oğul",pay:birim*2});
if(kiz>0)sonuc.push({ad:"Kız",pay:birim});
kalan=0;
}

if(kardes>0 && ogul+kiz+baba==0){
sonuc.push({ad:"Kardeş",pay:kalan});
kalan=0;
}

let toplam=sonuc.reduce((t,s)=>t+s.pay,0);
if(toplam>1){
sonuc.forEach(s=>s.pay=s.pay/toplam);
kalan=0;
}

yaz(sonuc,mal);
}

function yaz(data,mal){
const tb=document.querySelector("#sonuc tbody");
tb.innerHTML="";
data.forEach(d=>{
let tr=document.createElement("tr");
tr.innerHTML=`<td>${d.ad}</td>
<td>${d.pay.toFixed(4)}</td>
<td>${(d.pay*100).toFixed(2)}%</td>
<td>${(d.pay*mal).toFixed(2)}</td>`;
tb.appendChild(tr);
});
}

const esEl=es,ogulEl=ogul,kizEl=kiz,babaEl=baba,anneEl=anne,dedeEl=dede,kardesEl=kardes;