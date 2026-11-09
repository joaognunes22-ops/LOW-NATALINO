/* Prova Mágica do Polo Norte: gera, no navegador, a carta, o certificado com QR Code
   e os bilhetes da rena em um PDF. Requer js/vendor/jspdf.umd.min.js e js/vendor/qrcode.js.
   Nenhum dado é enviado a servidor: o QR Code leva os dados no fragmento (#) da URL. */
(function () {
  'use strict';
  var ANO = 2026;
  var S = 2; // escala de desenho (texto mais nítido na impressão)
  var INK = '#2b1d14', RED = '#a3302a', GOLD = '#8a5a12';
  var HAND = '"Dancing Script", cursive', TITLE = 'Cinzel, Georgia, serif';

  function clean(s) { return String(s || '').replace(/\s+/g, ' ').trim(); }
  function normDeed(s) { return clean(s).replace(/^(que\s+)?(ele|ela)?\s*(você\s+)?/i, '').replace(/[.!\s]+$/, ''); }
  function normLikes(s) { return clean(s).replace(/[.!\s]+$/, ''); }
  function firstUpper(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

  function registro() {
    var n = '';
    try { var a = new Uint32Array(1); crypto.getRandomValues(a); n = String(a[0] % 100000); } catch (_) { n = String(Math.floor(Math.random() * 100000)); }
    return 'PN-' + ANO + '-' + ('00000' + n).slice(-5);
  }

  function b64url(str) {
    var bytes = new TextEncoder().encode(str), bin = '';
    bytes.forEach(function (b) { bin += String.fromCharCode(b); });
    return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function unb64url(s) {
    s = s.replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '=';
    var bin = atob(s), bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  }

  function listaUrl(d) {
    var base = location.href.replace(/[#?].*$/, '').replace(/[^/]*$/, '');
    var payload = b64url(JSON.stringify({ n: d.child, d: normDeed(d.deed), r: d.registro, y: ANO }));
    return base + 'lista.html#' + payload;
  }
  function lerLista(hash) {
    try { var o = JSON.parse(unb64url(hash.replace(/^#/, ''))); return o && o.n ? o : null; } catch (_) { return null; }
  }

  function loadImage(src) {
    return new Promise(function (ok, fail) { var i = new Image(); i.onload = function () { ok(i); }; i.onerror = fail; i.src = src; });
  }
  function fontsReady() {
    if (!document.fonts) return Promise.resolve();
    return Promise.all([
      document.fonts.load('400 30px "Dancing Script"'), document.fonts.load('700 30px "Dancing Script"'),
      document.fonts.load('400 30px Cinzel'), document.fonts.load('700 30px Cinzel')
    ]).catch(function () {});
  }

  function wrap(ctx, text, max) {
    var words = text.split(' '), lines = [], line = '';
    words.forEach(function (w) {
      var t = line ? line + ' ' + w : w;
      if (ctx.measureText(t).width > max && line) { lines.push(line); line = w; } else line = t;
    });
    if (line) lines.push(line);
    return lines;
  }

  function canvasFor(img) {
    var c = document.createElement('canvas'); c.width = img.naturalWidth * S; c.height = img.naturalHeight * S;
    var ctx = c.getContext('2d'); ctx.drawImage(img, 0, 0, c.width, c.height); ctx.scale(S, S);
    ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    return { c: c, ctx: ctx };
  }

  /* Bloco de texto que diminui a fonte até caber na altura disponível. */
  function fitBlocks(ctx, blocks, cx, top, bottom, width) {
    var scale = 1, layout;
    for (; scale > 0.5; scale -= 0.04) {
      var y = top; layout = [];
      blocks.forEach(function (b) {
        var size = b.size * scale;
        ctx.font = b.font.replace('{s}', size.toFixed(1) + 'px');
        var lines = b.wrap === false ? [b.text] : wrap(ctx, b.text, width);
        y += (b.before || 0) * scale;
        lines.forEach(function (l) { y += size * (b.lh || 1.3); layout.push({ b: b, size: size, text: l, y: y }); });
      });
      if (y <= bottom) break;
    }
    layout.forEach(function (it) {
      ctx.font = it.b.font.replace('{s}', it.size.toFixed(1) + 'px');
      ctx.fillStyle = it.b.color || INK;
      ctx.textAlign = it.b.align || 'center';
      ctx.fillText(it.text, it.b.align === 'left' ? cx - width / 2 : cx, it.y);
    });
  }

  function spaced(ctx, text, x, y, spacing) {
    if ('letterSpacing' in ctx) { ctx.letterSpacing = spacing + 'px'; ctx.fillText(text, x, y); ctx.letterSpacing = '0px'; }
    else ctx.fillText(text, x, y);
  }

  function carta(img, d) {
    var k = canvasFor(img), ctx = k.ctx, deed = normDeed(d.deed), likes = normLikes(d.likes), note = clean(d.note);
    ctx.fillStyle = RED; ctx.font = '700 22px ' + TITLE; spaced(ctx, 'CORREIO DO POLO NORTE', 527, 245, 4);
    ctx.fillStyle = GOLD; ctx.font = '400 15px ' + TITLE; spaced(ctx, 'REGISTRO Nº ' + d.registro, 527, 272, 2);
    var blocks = [
      { text: 'Olá, ' + d.child + '!', font: '700 {s} ' + HAND, size: 54, before: 20, color: RED, wrap: false },
      { text: 'Chegou à minha oficina, lá no Polo Norte, uma notícia muito especial: você ' + deed + '. Que gesto bonito!', font: '400 {s} ' + HAND, size: 33, before: 18 },
      { text: 'Os meus elfos me contaram também que você gosta de ' + likes + '. Anotei tudo no meu Livro da Lista dos Bonzinhos.', font: '400 {s} ' + HAND, size: 33, before: 14 },
      { text: 'E, para você ter certeza de que é tudo verdade, deixei uma prova mágica: no seu certificado existe um código dourado. Peça para um adulto apontar a câmera do celular para ele e veja o seu nome escrito no meu livro!', font: '400 {s} ' + HAND, size: 33, before: 14 }
    ];
    if (note) blocks.push({ text: 'Um recado de quem ama você: “' + note + '”', font: '400 {s} ' + HAND, size: 31, before: 14, color: RED });
    blocks.push({ text: 'Com um abraço bem quentinho,', font: '400 {s} ' + HAND, size: 33, before: 22 });
    blocks.push({ text: 'Papai Noel', font: '700 {s} ' + HAND, size: 50, before: 4, color: RED, wrap: false });
    fitBlocks(ctx, blocks, 515, 290, 1090, 700);
    return k.c;
  }

  function qrCanvas(text, size) {
    var qr = qrcode(0, 'M'); qr.addData(unescape(encodeURIComponent(text))); qr.make();
    var n = qr.getModuleCount(), c = document.createElement('canvas'); c.width = c.height = size;
    var ctx = c.getContext('2d'), cell = size / (n + 2);
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, size, size); ctx.fillStyle = '#1a1208';
    for (var r = 0; r < n; r++) for (var col = 0; col < n; col++) if (qr.isDark(r, col)) ctx.fillRect(Math.floor((col + 1) * cell), Math.floor((r + 1) * cell), Math.ceil(cell), Math.ceil(cell));
    return c;
  }

  function certificado(img, d) {
    var k = canvasFor(img), ctx = k.ctx, deed = normDeed(d.deed), cx = 800;
    ctx.fillStyle = RED; ctx.font = '700 20px ' + TITLE; spaced(ctx, 'CORREIO DO POLO NORTE', cx, 232, 5);
    fitBlocks(ctx, [
      { text: 'Certificado Oficial', font: '700 {s} ' + TITLE, size: 50, color: INK, wrap: false, lh: 1.1 },
      { text: 'da Lista dos Bonzinhos', font: '700 {s} ' + TITLE, size: 34, color: INK, wrap: false, lh: 1.25 },
      { text: 'O Papai Noel confirma que', font: '400 {s} ' + HAND, size: 32, before: 12 },
      { text: d.child, font: '700 {s} ' + HAND, size: 92, color: GOLD, wrap: false, lh: 1.1, before: 6 },
      { text: 'está na Lista dos Bonzinhos do Natal de ' + ANO + ' porque ' + deed + '.', font: '400 {s} ' + HAND, size: 31, before: 8 }
    ], cx, 245, 690, 820);
    // assinatura e registro (canto inferior esquerdo, livre de enfeites)
    ctx.textAlign = 'center';
    ctx.fillStyle = RED; ctx.font = '700 44px ' + HAND; ctx.fillText('Papai Noel', 285, 800);
    ctx.strokeStyle = GOLD; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(170, 815); ctx.lineTo(400, 815); ctx.stroke();
    ctx.fillStyle = INK; ctx.font = '400 13px ' + TITLE; spaced(ctx, 'REGISTRO Nº ' + d.registro, 285, 840, 1);
    // QR Code dentro do quadrado branco
    var q = qrCanvas(listaUrl(d), 600);
    ctx.drawImage(q, 1118, 650, 212, 212);
    ctx.fillStyle = RED; ctx.font = '700 15px ' + TITLE; spaced(ctx, 'ESCANEIE A PROVA MÁGICA', 1224, 622, 1);
    return k.c;
  }

  function bilhetes(img, d) {
    var k = canvasFor(img), ctx = k.ctx, deed = normDeed(d.deed), cx = 730, w = 470;
    fitBlocks(ctx, [
      { text: 'Psiu, ' + d.child + '!', font: '700 {s} ' + TITLE, size: 40, color: RED, wrap: false },
      { text: 'Eu sou a Rena Faísca e vim trazer um recado do Papai Noel: ele escondeu uma prova mágica no seu certificado.', font: '400 {s} ' + HAND, size: 34, before: 16 },
      { text: 'Peça para um adulto escanear o código dourado e descubra o que está escrito no Livro do Polo Norte!', font: '400 {s} ' + HAND, size: 34, before: 12 },
      { text: '— Rena Faísca', font: '700 {s} ' + HAND, size: 38, color: RED, before: 16, wrap: false }
    ], cx, 120, 640, w);
    fitBlocks(ctx, [
      { text: d.child + ', continue assim!', font: '700 {s} ' + TITLE, size: 36, color: RED },
      { text: 'O Papai Noel ficou muito feliz porque você ' + deed + '.', font: '400 {s} ' + HAND, size: 34, before: 16 },
      { text: 'Até a noite de Natal, ele vai continuar acompanhando cada gesto de carinho. Eu também!', font: '400 {s} ' + HAND, size: 34, before: 12 },
      { text: '— Rena Faísca', font: '700 {s} ' + HAND, size: 38, color: RED, before: 16, wrap: false }
    ], cx, 860, 1400, w);
    return k.c;
  }

  async function gerar(d) {
    await fontsReady();
    var imgs = await Promise.all(['images/carta-fundo.webp', 'images/certificado-fundo.webp', 'images/bilhete-rena-fundo.webp'].map(loadImage));
    return { carta: carta(imgs[0], d), certificado: certificado(imgs[1], d), bilhetes: bilhetes(imgs[2], d) };
  }

  function pdf(pages, d) {
    var J = window.jspdf.jsPDF, doc = new J({ unit: 'mm', format: 'a4', orientation: 'portrait', compress: true });
    doc.addImage(pages.carta.toDataURL('image/jpeg', 0.9), 'JPEG', 0, 0, 210, 297);
    doc.addPage('a4', 'landscape');
    doc.addImage(pages.certificado.toDataURL('image/jpeg', 0.9), 'JPEG', 0, 0, 297, 210);
    doc.addPage('a4', 'portrait');
    doc.addImage(pages.bilhetes.toDataURL('image/jpeg', 0.9), 'JPEG', 0, 0, 210, 297);
    doc.setProperties({ title: 'Prova Mágica do Polo Norte - ' + d.child });
    var nome = d.child.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'crianca';
    doc.save('Prova-Magica-' + nome + '.pdf');
  }

  window.KitMagico = { gerar: gerar, pdf: pdf, registro: registro, listaUrl: listaUrl, lerLista: lerLista, normDeed: normDeed, firstUpper: firstUpper, ANO: ANO };
})();
