/***********************
 TEMEL FERAİZ ÇEKİRDEĞİ
 (SİLİNMEDİ)
************************/

function hesapla() {
  const es = +document.getElementById("es").value;
  const ogul = +document.getElementById("ogul").value;
  const kiz = +document.getElementById("kiz").value;
  const baba = +document.getElementById("baba").value;
  const anne = +document.getElementById("anne").value;

  if ([es, ogul, kiz, baba, anne].some(v => v < 0)) {
    alert("Negatif değer olamaz");
    return;
  }

  let kalan = 1;
  let sonuc = [];

  // EŞ
  if (es > 0) {
    let pay = (ogul + kiz) > 0 ? 1/8 : 1/4;
    sonuc.push({ad:"Eş", pay, tur:"Hissedar"});
    kalan -= pay;
  }

  // ANNE
  if (anne > 0) {
    let pay = (ogul + kiz) > 0 ? 1/6 : 1/3;
    sonuc.push({ad:"Anne", pay, tur:"Hissedar"});
    kalan -= pay;
  }

  // BABA
  if (baba > 0 && (ogul + kiz) > 0) {
    sonuc.push({ad:"Baba", pay:1/6, tur:"Hissedar"});
    kalan -= 1/6;
  }

  // ASABE (ÇOCUKLAR)
  if (ogul + kiz > 0) {
    let birim = kalan / (ogul*2 + kiz);
    if (ogul > 0) sonuc.push({ad:"Oğul", pay:birim*2, tur:"Asabe"});
    if (kiz > 0) sonuc.push({ad:"Kız", pay:birim, tur:"Asabe"});
    kalan = 0;
  }

  detayliTabloYaz(sonuc, kalan);
}

/*************************
 YENİ EK: AVl / REDD ALT YAPI
**************************/

function avlKontrol(sonuc) {
  let toplam = sonuc.reduce((t,s)=>t+s.pay,0);
  if (toplam > 1) {
    sonuc.forEach(s => s.pay = s.pay / toplam);
    return "Avl uygulandı";
  }
  return null;
}

function reddUygula(sonuc, kalan) {
  if (kalan <= 0) return;

  let hissedarlar = sonuc.filter(s => s.tur === "Hissedar");
  let toplamPay = hissedarlar.reduce((t,s)=>t+s.pay,0);

  hissedarlar.forEach(s => {
    s.pay += kalan * (s.pay / toplamPay);
  });
}

/*************************
 YENİ EK: DETAYLI TABLO
**************************/

function detayliTabloYaz(data, kalan) {
  const tbody = document.querySelector("#sonuc tbody");
  tbody.innerHTML = "";

  let avlDurum = avlKontrol(data);
  if (!avlDurum && kalan > 0) reddUygula(data, kalan);

  data.forEach(d => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${d.ad}</td>
      <td>${d.pay.toFixed(4)}</td>
      <td>${(d.pay*100).toFixed(2)}%</td>
    `;
    tbody.appendChild(tr);
  });

  if (avlDurum) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td colspan="3"><strong>${avlDurum}</strong></td>`;
    tbody.appendChild(tr);
  }
}

/*************************
 AÇIKLAMA:
 - hesapla() SİLİNMEDİ
 - tablo sistemi GENİŞLETİLDİ
 - Avl & Redd ayrı fonksiyon
 - İleride kardeş/dede eklemek için hazır
**************************/