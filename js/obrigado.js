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
  // Kit com foto: vem pelo link ?foto=1, pela escolha feita no site ou por uma foto já enviada.
  var FOTO_FLAG = 'natal-magico-com-foto', flag = null;
  try { flag = localStorage.getItem(FOTO_FLAG); } catch (_) {}
  var comFoto = /[?&]foto=1/.test(location.search) || !!(data && data.foto) || flag === '1' || !!photo;
  function showPhotoBox() {
    comFoto = true; $('ob-photo').hidden = false; $('ob-photo-show').hidden = true;
    try { localStorage.setItem(FOTO_FLAG, '1'); } catch (_) {}
  }
  function showPhotoPreview() {
    if (!photo) return;
    $('ob-photo-img').src = photo; $('ob-photo-ok').hidden = false; $('ob-photo-label').textContent = 'Trocar foto';
  }
  if (comFoto) showPhotoBox(); else $('ob-photo-show').hidden = false;
  showPhotoPreview();
  $('ob-photo-show').addEventListener('click', function () { showPhotoBox(); $('ob-photo').scrollIntoView({ block: 'center' }); });
  $('f-photo').addEventListener('change', async function (e) {
    var input = e.target, f = input.files && input.files[0], pe = $('ob-photo-error'), ps = $('ob-photo-status'); if (!f) return;
    pe.hidden = true; ps.textContent = 'Carregando a foto…'; ps.hidden = false;
    try {
      photo = await KitMagico.prepararFoto(f);
      try { localStorage.setItem(PHOTO_KEY, photo); } catch (_) {}
      showPhotoPreview();
      pages = null;
      if (complete(data)) { ps.textContent = 'Colocando a foto na carta e no certificado…'; await build(); ps.hidden = true; }
      else { ps.textContent = 'Foto pronta! Agora preencha os dados da criança abaixo.'; }
    } catch (err) {
      ps.hidden = true;
      pe.textContent = 'Não foi possível abrir esta foto. Escolha outra foto em JPG ou PNG (uma dica: tire um print da foto e envie o print).';
      pe.hidden = false;
    }
    input.value = ''; // permite escolher a mesma foto de novo
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
      $('ob-photo-status').hidden = true;
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
