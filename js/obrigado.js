/* Página de obrigado: gera automaticamente a Prova Mágica (carta, certificado com QR Code
   e bilhetes da rena) com os dados que o cliente preencheu no site antes do pagamento. */
(function () {
  'use strict';
  var KEY = 'natal-magico-pedido', PHOTO_KEY = 'natal-magico-foto';
  var $ = function (id) { return document.getElementById(id); };
  var data = null, pages = null;
  try { data = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (_) { data = null; }
  var photo = null;
  try { photo = localStorage.getItem(PHOTO_KEY); } catch (_) {}
  var comFoto = /[?&]foto=1/.test(location.search) || !!(data && data.foto);
  if (comFoto) $('ob-photo').hidden = false;
  $('f-photo').addEventListener('change', async function (e) {
    var f = e.target.files && e.target.files[0], pe = $('ob-photo-error'); if (!f) return;
    pe.hidden = true;
    try {
      photo = await KitMagico.prepararFoto(f);
      try { localStorage.setItem(PHOTO_KEY, photo); } catch (_) {}
      pages = null; if (complete(data)) build();
    } catch (err) { pe.textContent = err.message; pe.hidden = false; }
  });

  var form = $('ob-form'), ready = $('ob-ready'), err = $('ob-error'), dl = $('ob-download');
  var fields = { child: $('f-child'), deed: $('f-deed'), likes: $('f-likes'), note: $('f-note') };

  function complete(d) { return d && d.child && d.deed && d.likes; }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (_) {} }
  function fillForm() { Object.keys(fields).forEach(function (k) { fields[k].value = (data && data[k]) || ''; }); }

  async function build() {
    form.hidden = true; ready.hidden = false;
    dl.disabled = true; dl.textContent = 'Preparando a magia…';
    if (!data.registro) { data.registro = KitMagico.registro(); save(); }
    try {
      pages = await KitMagico.gerar(Object.assign({}, data, { photo: comFoto ? photo : null }));
      pages.guia = Livrinho.guia(data);
      var pv = $('ob-preview'); pv.replaceChildren();
      [['carta', 'Carta do Papai Noel'], ['certificado', 'Certificado com código mágico'], ['bilhetes', 'Bilhetes da rena']].forEach(function (p) {
        var src = pages[p[0]], t = document.createElement('canvas'), w = 600;
        t.width = w; t.height = Math.round(src.height * w / src.width);
        t.getContext('2d').drawImage(src, 0, 0, t.width, t.height);
        var img = new Image(); img.alt = p[1]; img.src = t.toDataURL('image/jpeg', 0.8);
        pv.append(img);
      });
      $('ob-lista').href = KitMagico.listaUrl(data);
      dl.disabled = false; dl.textContent = 'Baixar a Prova Mágica (PDF)';
    } catch (e) {
      dl.disabled = false; dl.textContent = 'Tentar novamente';
      console.error(e);
    }
  }

  dl.addEventListener('click', function () {
    if (!pages) { build(); return; }
    try { KitMagico.pdf(pages, data); } catch (e) { console.error(e); alert('Não foi possível gerar o PDF. Tente novamente.'); }
  });

  var lv = $('ob-livrinho'), lvs = $('ob-livrinho-status');
  lv.addEventListener('click', async function () {
    if (!complete(data)) return;
    if (!data.registro) { data.registro = KitMagico.registro(); save(); }
    lv.disabled = true;
    try {
      await Livrinho.gerar(Object.assign({}, data, { photo: comFoto ? photo : null }), function (i, n) { lvs.textContent = 'Montando a página ' + i + ' de ' + n + '…'; });
      lvs.textContent = 'Pronto! O Livrinho foi baixado.';
    } catch (e) { console.error(e); lvs.textContent = 'Não foi possível gerar o Livrinho. Tente novamente.'; }
    lv.disabled = false;
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var d = { child: fields.child.value.trim(), deed: fields.deed.value.trim(), likes: fields.likes.value.trim(), note: fields.note.value.trim() };
    if (!complete(d)) { err.hidden = false; return; }
    err.hidden = true;
    data = Object.assign({}, data || {}, d);
    save(); pages = null; build();
  });

  $('ob-edit').addEventListener('click', function () { fillForm(); ready.hidden = true; form.hidden = false; fields.child.focus(); });

  function start() { if (complete(data)) build(); else { fillForm(); form.hidden = false; } }
  start();
})();
