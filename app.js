function hesapla() {
  const anne = document.getElementById('anne').checked;
  const baba = document.getElementById('baba').checked;
  const ogul = parseInt(document.getElementById('ogul').value) || 0;
  const kiz = parseInt(document.getElementById('kiz').value) || 0;

  let sonuc = '<h2>Sonuç</h2>';

  if (anne) sonuc += '<p>Anne: 1/6 (Nisâ 4/11)</p>';
  if (baba) sonuc += '<p>Baba: 1/6 + asabe</p>';
  if (ogul + kiz > 0) {
    sonuc += `<p>Çocuklar: Erkek 2, Kız 1 oranıyla paylaşır</p>`;
  }

  const div = document.getElementById('sonuc');
  div.innerHTML = sonuc;
  div.classList.remove('hidden');
  div.scrollIntoView({ behavior: 'smooth' });
}