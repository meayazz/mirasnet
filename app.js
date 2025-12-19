class Heir{
  constructor(type,count=1){this.type=type;this.count=count;this.share=0;this.rule='';this.note=0}
}
class Estate{
  constructor(amount,name){this.amount=amount;this.name=name;this.heirs=[]}
  add(h){this.heirs.push(h)}
}
class Engine{
  constructor(e){this.e=e;this.notes=[]}
  calc(){this.mother();this.father();this.spouse();this.children();this.siblings()}
  mother(){const h=this.f('anne');if(!h)return;h.share=this.hasChildren()?1/6:1/3;h.rule='Anne payı';h.note=1}
  father(){const h=this.f('baba');if(!h)return;h.share=this.hasChildren()?1/6:0;h.rule='Baba payı';h.note=1}
  spouse(){const h=this.f('es');if(!h)return;h.share=this.hasChildren()?1/8:1/4;h.rule='Eş payı';h.note=2}
  children(){const s=this.f('ogul'),d=this.f('kiz');if(!s&&!d)return;const u=(s?s.count*2:0)+(d?d.count:0);const r=this.rem();if(s){s.share=r*(s.count*2/u);s.rule='Erkek evlat';s.note=1}if(d){d.share=r*(d.count/u);d.rule='Kız evlat';d.note=1}}
  siblings(){/* v1: yer tutucu */}
  rem(){return 1-this.e.heirs.reduce((a,h)=>a+h.share,0)}
  hasChildren(){return this.c('ogul')+this.c('kiz')>0}
  f(t){return this.e.heirs.find(x=>x.type===t)}
  c(t){const h=this.f(t);return h?h.count:0}
}
function hesapla(){
  const e=new Estate(+estate.value,isim.value);
  if(anne.checked)e.add(new Heir('anne'));
  if(baba.checked)e.add(new Heir('baba'));
  const es=+document.getElementById('es').value||0;if(es)e.add(new Heir('es',es));
  const o=+ogul.value||0;if(o)e.add(new Heir('ogul',o));
  const k=+kiz.value||0;if(k)e.add(new Heir('kiz',k));
  const eng=new Engine(e);eng.calc();
  let html=`<div class='document'><h3>${e.name} Miras Belgesi</h3>`;
  e.heirs.forEach(h=>{html+=`<p>${h.type}: ${(h.share*e.amount).toFixed(2)} ₺ <sup>${h.note}</sup></p>`});
  html+=`<div class='footnotes'><p><sup>1</sup> Nisâ 4/11</p><p><sup>2</sup> Nisâ 4/12</p></div></div>`;
  sonuc.innerHTML=html;sonuc.classList.remove('hidden');sonuc.scrollIntoView({behavior:'smooth'})
}
```javascript
/**
 * MirasNet v1 – Feraiz Motoru (OOP)
 * Kaynaklar:
 * - Kur’an, Nisâ 4/11–12
 * - İbn Kudâme, el-Muğnî
 * - Serahsî, el-Mebsût
 * - İbn Âbidîn, Reddü’l-Muhtâr
 */

class Heir {
  constructor(type, count = 1) {
    this.type = type; // anne, baba, ogul, kiz
    this.count = count;
    this.share = 0;
    this.rule = '';
  }
}

class Estate {
  constructor() {
    this.heirs = [];
    this.total = 1; // 1 = tamamı
  }

  addHeir(heir) {
    this.heirs.push(heir);
  }
}

class FaraidEngine {
  constructor(estate) {
    this.estate = estate;
    this.notes = [];
  }

  calculate() {
    this.applyMotherRule();
    this.applyFatherRule();
    this.applyChildrenRule();
    return this.estate.heirs;
  }

  applyMotherRule() {
    const mother = this.estate.heirs.find(h => h.type === 'anne');
    const childrenCount = this.count('ogul') + this.count('kiz');
    if (!mother) return;

    if (childrenCount > 0) {
      mother.share = 1/6;
      mother.rule = 'Anne, çocuk bulunması halinde 1/6 alır (Nisâ 4/11)';
      this.notes.push('Anne: Nisâ 4/11');
    } else {
      mother.share = 1/3;
      mother.rule = 'Anne, çocuk yoksa 1/3 alır (Nisâ 4/11)';
      this.notes.push('Anne: Nisâ 4/11');
    }
  }

  applyFatherRule() {
    const father = this.estate.heirs.find(h => h.type === 'baba');
    const childrenCount = this.count('ogul') + this.count('kiz');
    if (!father) return;

    if (childrenCount > 0) {
      father.share = 1/6;
      father.rule = 'Baba, çocuk bulunması halinde 1/6 alır + asabe (Nisâ 4/11)';
      this.notes.push('Baba: Nisâ 4/11');
    } else {
      father.share = 1; // asabe
      father.rule = 'Baba, çocuk yoksa asabe olur';
      this.notes.push('Baba: Asabe kaidesi');
    }
  }

  applyChildrenRule() {
    const sons = this.estate.heirs.find(h => h.type === 'ogul');
    const daughters = this.estate.heirs.find(h => h.type === 'kiz');

    if (!sons && !daughters) return;

    const totalUnits = (sons ? sons.count * 2 : 0) + (daughters ? daughters.count : 0);
    const remaining = this.remainingShare();

    if (sons) {
      sons.share = remaining * (sons.count * 2 / totalUnits);
      sons.rule = 'Erkek çocuk iki pay alır';
      this.notes.push('Erkek çocuk: Nisâ 4/11');
    }
    if (daughters) {
      daughters.share = remaining * (daughters.count / totalUnits);
      daughters.rule = 'Kız çocuk bir pay alır';
      this.notes.push('Kız çocuk: Nisâ 4/11');
    }
  }

  remainingShare() {
    return 1 - this.estate.heirs.reduce((sum, h) => sum + h.share, 0);
  }

  count(type) {
    const h = this.estate.heirs.find(x => x.type === type);
    return h ? h.count : 0;
  }
}

function hesapla() {
  const estate = new Estate();

  if (document.getElementById('anne').checked)
    estate.addHeir(new Heir('anne'));

  if (document.getElementById('baba').checked)
    estate.addHeir(new Heir('baba'));

  const ogul = parseInt(document.getElementById('ogul').value) || 0;
  if (ogul > 0) estate.addHeir(new Heir('ogul', ogul));

  const kiz = parseInt(document.getElementById('kiz').value) || 0;
  if (kiz > 0) estate.addHeir(new Heir('kiz', kiz));

  const engine = new FaraidEngine(estate);
  const heirs = engine.calculate();

  let html = '<h2>Sonuç (Belge)</h2>';
  heirs.forEach(h => {
    html += `<p><strong>${h.type}</strong>: ${h.share.toFixed(3)} — ${h.rule}</p>`;
  });

  document.getElementById('sonuc').innerHTML = html;
  document.getElementById('sonuc').classList.remove('hidden');
  document.getElementById('sonuc').scrollIntoView({ behavior: 'smooth' });
}

---

## 📜 terms.html
```html
<!DOCTYPE html>
<html lang="tr"><head><meta charset="UTF-8"><title>Hüküm ve Koşullar</title></head>
<body>
<h1>Hüküm ve Koşullar</h1>
<p>Bu uygulama bilgilendirme amaçlıdır. Resmî veya bağlayıcı fetva yerine geçmez.</p>
<p>Yerel ve uluslararası regülasyonlara uygunluk gözetilmiştir (GDPR dahil).</p>
</body></html>
