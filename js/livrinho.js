/* Meu Livrinho Mágico de Natal: caderno de 29 páginas gerado no navegador com o nome
   da criança (capa, carteirinha de elfo, rodapé das páginas e jogos). Também gera as
   2 páginas do Guia dos Pais. Requer js/kit-magico.js e js/vendor/jspdf.umd.min.js. */
(function () {
  'use strict';
  var H = KitMagico._h, HAND = H.HAND, TITLE = H.TITLE, INK = H.INK, RED = H.RED, GOLD = H.GOLD;
  var W = 1240, PH = 1754; // A4 a 150 dpi
  var SANS = '"Segoe UI", system-ui, -apple-system, Arial, sans-serif';
  var DIR = 'images/livrinho/';
  var COLORIR = ['colorir-noel', 'colorir-rena', 'colorir-elfo', 'colorir-arvore', 'colorir-treno', 'colorir-boneco-neve',
    'colorir-casa', 'colorir-noel-livro', 'colorir-biscoitos', 'colorir-patinando', 'colorir-meia', 'colorir-correio',
    'colorir-presepio', 'colorir-mandala'];

  function page(bg) {
    var c = document.createElement('canvas'); c.width = W; c.height = PH;
    var ctx = c.getContext('2d'); ctx.fillStyle = bg || '#fff'; ctx.fillRect(0, 0, W, PH);
    ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    return { c: c, ctx: ctx };
  }
  /* Desenha a imagem inteira dentro da caixa e devolve a conversão de coordenadas da imagem para a página. */
  function fit(ctx, img, bx, by, bw, bh) {
    var s = Math.min(bw / img.naturalWidth, bh / img.naturalHeight);
    var w = img.naturalWidth * s, h = img.naturalHeight * s, x = bx + (bw - w) / 2, y = by + (bh - h) / 2;
    ctx.drawImage(img, x, y, w, h);
    return { s: s, x: function (ix) { return x + ix * s; }, y: function (iy) { return y + iy * s; } };
  }
  /* Preenche a página inteira (corta as sobras), para artes coloridas. */
  function cover(ctx, img) {
    var s = Math.max(W / img.naturalWidth, PH / img.naturalHeight);
    var w = img.naturalWidth * s, h = img.naturalHeight * s, x = (W - w) / 2, y = (PH - h) / 2;
    ctx.drawImage(img, x, y, w, h);
    return { s: s, x: function (ix) { return x + ix * s; }, y: function (iy) { return y + iy * s; } };
  }
  function footer(ctx, d, n) {
    ctx.textAlign = 'center'; ctx.fillStyle = '#7a6a55'; ctx.font = '400 22px ' + TITLE;
    H.spaced(ctx, 'MEU LIVRINHO MÁGICO DE NATAL  ✦  ' + d.child.toUpperCase(), W / 2, PH - 48, 2);
    ctx.font = '400 20px ' + SANS; ctx.textAlign = 'right'; ctx.fillText(String(n), W - 70, PH - 48);
    ctx.textAlign = 'center';
  }
  function text(ctx, t, x, y, font, color, align) {
    ctx.font = font; ctx.fillStyle = color || INK; ctx.textAlign = align || 'center'; ctx.fillText(t, x, y); ctx.textAlign = 'center';
  }
  function title(ctx, t, y, size, color) { text(ctx, t, W / 2, y, '700 ' + (size || 54) + 'px ' + TITLE, color || RED); }
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function plain(s) { return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase().replace(/[^A-Z]/g, ''); }

  /* ---------- páginas ---------- */
  function capa(img, d) {
    var p = page('#071c26'), ctx = p.ctx, m = cover(ctx, img);
    var cx = m.x(543), ty = m.y(0);
    text(ctx, 'MEU LIVRINHO MÁGICO', cx, ty + 205 * m.s, '700 ' + Math.round(62 * m.s) + 'px ' + TITLE, RED);
    text(ctx, 'DE NATAL', cx, ty + 270 * m.s, '700 ' + Math.round(50 * m.s) + 'px ' + TITLE, INK);
    var size = 96; ctx.font = '700 ' + size + 'px ' + HAND;
    while (ctx.measureText('de ' + d.child).width > 700 && size > 50) { size -= 4; ctx.font = '700 ' + size + 'px ' + HAND; }
    text(ctx, 'de ' + d.child, cx, ty + 372 * m.s, '700 ' + Math.round(size * m.s) + 'px ' + HAND, GOLD);
    return p.c;
  }

  function carteirinha(img, d) {
    var p = page('#2a1408'), ctx = p.ctx, m = cover(ctx, img), s = m.s;
    text(ctx, 'CARTEIRINHA OFICIAL', m.x(730), m.y(392), '700 ' + Math.round(27 * s) + 'px ' + TITLE, RED);
    text(ctx, 'DE ELFO AJUDANTE', m.x(730), m.y(428), '700 ' + Math.round(22 * s) + 'px ' + TITLE, INK);
    var rows = [['Nome:', d.child], ['Função:', 'Elfo Ajudante Oficial'], ['Registro:', d.registro], ['Válida:', 'Natal de ' + KitMagico.ANO]];
    var ys = [548, 637, 724, 812];
    rows.forEach(function (r, i) {
      text(ctx, r[0], m.x(495), m.y(ys[i] - 14), '700 ' + Math.round(20 * s) + 'px ' + TITLE, RED, 'left');
      ctx.font = '700 ' + Math.round(40 * s) + 'px ' + HAND; var v = r[1];
      var maxw = (965 - 620) * s; var fs = 40;
      while (ctx.measureText(v).width > maxw && fs > 22) { fs -= 2; ctx.font = '700 ' + Math.round(fs * s) + 'px ' + HAND; }
      ctx.fillStyle = INK; ctx.textAlign = 'left'; ctx.fillText(v, m.x(620), m.y(ys[i] - 12)); ctx.textAlign = 'center';
    });
    if (d.photoImg) H.photoFrame(ctx, d.photoImg, m.x(278), m.y(573), 165 * s);
    else {
      text(ctx, 'Desenhe', m.x(278), m.y(560), '400 ' + Math.round(34 * s) + 'px ' + HAND, '#9a8f80');
      text(ctx, 'o seu rosto aqui', m.x(278), m.y(600), '400 ' + Math.round(34 * s) + 'px ' + HAND, '#9a8f80');
    }
    return p.c;
  }

  function colorir(img, d, n) {
    var p = page(), ctx = p.ctx; fit(ctx, img, 70, 70, W - 140, PH - 180); footer(ctx, d, n); return p.c;
  }

  function moldura(img) { var p = page(), ctx = p.ctx, m = fit(ctx, img, 50, 40, W - 100, PH - 120); return { p: p, ctx: ctx, m: m }; }

  function cacaPalavras(img, d, n) {
    var k = moldura(img), ctx = k.ctx, m = k.m, N = 10;
    title(ctx, 'Caça-palavras de Natal', m.y(215), 50);
    text(ctx, 'Encontre as palavras escondidas (e o seu nome!)', W / 2, m.y(268), '400 30px ' + HAND, INK);
    var nome = plain(d.child.split(' ')[0]);
    var words = ['NATAL', 'NOEL', 'RENA', 'ELFO', 'NEVE', 'SINO', 'ESTRELA', 'PRESENTE'];
    if (nome.length >= 2 && nome.length <= N && words.indexOf(nome) < 0) words.unshift(nome);
    var grid, placed;
    for (var attempt = 0; attempt < 60; attempt++) {
      grid = []; for (var r = 0; r < N; r++) grid.push(new Array(N).fill(''));
      placed = [];
      var ok = words.every(function (w) {
        for (var t = 0; t < 200; t++) {
          var horiz = Math.random() < 0.55, r0 = Math.floor(Math.random() * (horiz ? N : N - w.length + 1)), c0 = Math.floor(Math.random() * (horiz ? N - w.length + 1 : N));
          var fits = true;
          for (var i = 0; i < w.length; i++) { var g = grid[horiz ? r0 : r0 + i][horiz ? c0 + i : c0]; if (g && g !== w[i]) { fits = false; break; } }
          if (!fits) continue;
          for (i = 0; i < w.length; i++) grid[horiz ? r0 : r0 + i][horiz ? c0 + i : c0] = w[i];
          placed.push(w); return true;
        }
        return false;
      });
      if (ok) break;
    }
    var L = 'ABCDEFGHIJLMNOPRSTUV';
    var gx = m.x(170), gy = m.y(310), cell = (m.x(855) - gx) / N;
    ctx.strokeStyle = '#3a2a1a'; ctx.lineWidth = 3; ctx.strokeRect(gx, gy, cell * N, cell * N);
    ctx.lineWidth = 1; ctx.strokeStyle = '#cdbf9f';
    for (var i = 1; i < N; i++) { ctx.beginPath(); ctx.moveTo(gx + i * cell, gy); ctx.lineTo(gx + i * cell, gy + N * cell); ctx.moveTo(gx, gy + i * cell); ctx.lineTo(gx + N * cell, gy + i * cell); ctx.stroke(); }
    ctx.font = '700 ' + Math.round(cell * 0.55) + 'px ' + SANS; ctx.fillStyle = INK; ctx.textBaseline = 'middle';
    for (r = 0; r < N; r++) for (var c = 0; c < N; c++) {
      var ch = grid[r][c] || L[Math.floor(Math.random() * L.length)];
      ctx.fillText(ch, gx + c * cell + cell / 2, gy + r * cell + cell / 2 + 2);
    }
    ctx.textBaseline = 'alphabetic';
    var ly = m.y(1010); text(ctx, 'Palavras:', m.x(120), ly, '700 30px ' + TITLE, RED, 'left');
    placed.forEach(function (w, i) {
      var col = i % 2, row = Math.floor(i / 2);
      text(ctx, '☐ ' + w, m.x(120) + col * 290, ly + 50 + row * 44, '600 30px ' + SANS, INK, 'left');
    });
    footer(ctx, d, n); return k.p.c;
  }

  function labirinto(img, d, n) {
    var k = moldura(img), ctx = k.ctx, m = k.m, C = 11, R = 10;
    title(ctx, 'Labirinto do Polo Norte', m.y(215), 50);
    text(ctx, 'Leve o Pipo até a Rena Faísca!', W / 2, m.y(268), '400 32px ' + HAND, INK);
    var walls = [], seen = [];
    for (var r = 0; r < R; r++) { walls.push([]); seen.push([]); for (var c = 0; c < C; c++) { walls[r].push({ n: 1, s: 1, e: 1, w: 1 }); seen[r].push(false); } }
    var stack = [[0, 0]]; seen[0][0] = true;
    while (stack.length) {
      var cur = stack[stack.length - 1], cr = cur[0], cc = cur[1], opts = [];
      [[-1, 0, 'n', 's'], [1, 0, 's', 'n'], [0, 1, 'e', 'w'], [0, -1, 'w', 'e']].forEach(function (dd) {
        var nr = cr + dd[0], nc = cc + dd[1]; if (nr >= 0 && nr < R && nc >= 0 && nc < C && !seen[nr][nc]) opts.push([nr, nc, dd[2], dd[3]]);
      });
      if (!opts.length) { stack.pop(); continue; }
      var o = opts[Math.floor(Math.random() * opts.length)];
      walls[cr][cc][o[2]] = 0; walls[o[0]][o[1]][o[3]] = 0; seen[o[0]][o[1]] = true; stack.push([o[0], o[1]]);
    }
    walls[0][0].n = 0; walls[R - 1][C - 1].s = 0;
    var cs = Math.min((m.x(885) - m.x(140)) / C, (m.y(930) - m.y(340)) / R), x0 = W / 2 - C * cs / 2, y0 = m.y(340);
    ctx.strokeStyle = '#1a1208'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath();
    for (r = 0; r < R; r++) for (c = 0; c < C; c++) {
      var w = walls[r][c], x = x0 + c * cs, y = y0 + r * cs;
      if (w.n) { ctx.moveTo(x, y); ctx.lineTo(x + cs, y); }
      if (w.w) { ctx.moveTo(x, y); ctx.lineTo(x, y + cs); }
      if (r === R - 1 && w.s) { ctx.moveTo(x, y + cs); ctx.lineTo(x + cs, y + cs); }
      if (c === C - 1 && w.e) { ctx.moveTo(x + cs, y); ctx.lineTo(x + cs, y + cs); }
    }
    ctx.stroke();
    text(ctx, 'INÍCIO ↓', x0, y0 - 16, '700 26px ' + TITLE, RED, 'left');
    text(ctx, '↓ CHEGADA', x0 + C * cs, y0 + R * cs + 40, '700 26px ' + TITLE, RED, 'right');
    footer(ctx, d, n); return k.p.c;
  }

  function calendario(img, d, n) {
    var k = moldura(img), ctx = k.ctx, m = k.m;
    title(ctx, 'Contagem para o Natal', m.y(215), 50);
    text(ctx, 'Pinte um quadradinho por dia, de 1 a 24 de dezembro!', W / 2, m.y(268), '400 30px ' + HAND, INK);
    var cols = 6, rows = 4, gx = m.x(135), gy = m.y(320), gw = m.x(890) - gx, gh = m.y(900) - gy, cw = gw / cols, ch = gh / rows;
    for (var i = 0; i < 24; i++) {
      var x = gx + (i % cols) * cw + 6, y = gy + Math.floor(i / cols) * ch + 6, w = cw - 12, h = ch - 12;
      ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(x, y, w, h, 14); else ctx.rect(x, y, w, h);
      ctx.lineWidth = 4; ctx.strokeStyle = '#1a1208'; ctx.stroke();
      if (i === 23) {
        var sx = x + w / 2, sy = y + h / 2 + 8, R1 = Math.min(w, h) * 0.36, R2 = R1 * 0.45; ctx.beginPath();
        for (var j = 0; j < 10; j++) { var a = -Math.PI / 2 + j * Math.PI / 5, rr = j % 2 ? R2 : R1; ctx.lineTo(sx + Math.cos(a) * rr, sy + Math.sin(a) * rr); }
        ctx.closePath(); ctx.lineWidth = 3; ctx.stroke();
        text(ctx, '24', sx, y + 34, '700 26px ' + TITLE, INK);
      } else text(ctx, String(i + 1), x + w / 2, y + h / 2 + 22, '700 ' + Math.round(h * 0.42) + 'px ' + TITLE, INK);
    }
    text(ctx, 'Falta pouco, ' + d.child + '!', m.x(120), m.y(1010), '700 46px ' + HAND, RED, 'left');
    text(ctx, 'O Papai Noel já está', m.x(120), m.y(1070), '400 34px ' + HAND, INK, 'left');
    text(ctx, 'preparando o trenó.', m.x(120), m.y(1115), '400 34px ' + HAND, INK, 'left');
    footer(ctx, d, n); return k.p.c;
  }

  function jogoDaVelha(img, d, n) {
    var k = moldura(img), ctx = k.ctx, m = k.m;
    title(ctx, 'Jogo da Velha de Natal', m.y(215), 50);
    text(ctx, 'Jogue com alguém da família: quem for Estrela ★ e quem for Bolinha ●?', W / 2, m.y(268), '400 28px ' + HAND, INK);
    var size = Math.min((m.x(870) - m.x(150) - 60) / 2, (m.y(945) - m.y(330) - 50) / 2), off = (m.x(870) - m.x(150) - 2 * size - 60) / 2;
    for (var g = 0; g < 4; g++) {
      var gx = m.x(150) + off + (g % 2) * (size + 60), gy = m.y(330) + Math.floor(g / 2) * (size + 50);
      ctx.strokeStyle = '#1a1208'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath();
      for (var i = 1; i < 3; i++) { ctx.moveTo(gx + i * size / 3, gy + 8); ctx.lineTo(gx + i * size / 3, gy + size - 8); ctx.moveTo(gx + 8, gy + i * size / 3); ctx.lineTo(gx + size - 8, gy + i * size / 3); }
      ctx.stroke();
    }
    footer(ctx, d, n); return k.p.c;
  }

  function pergaminho(img, d, n, kind) {
    var p = page(), ctx = p.ctx, m = fit(ctx, img, 50, 40, W - 100, PH - 120), cx = m.x(512);
    if (kind === 'lista') {
      title(ctx, 'Minha lista de desejos', m.y(690), 46);
      text(ctx, 'Querido Papai Noel, neste Natal eu gostaria de...', cx, m.y(745), '400 30px ' + HAND, INK);
      for (var i = 0; i < 8; i++) {
        var y = m.y(830 + i * 68);
        text(ctx, (i + 1) + '.', m.x(150), y, '700 30px ' + TITLE, RED, 'left');
        ctx.strokeStyle = '#8a7a66'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(m.x(195), y + 4); ctx.lineTo(m.x(880), y + 4); ctx.stroke();
      }
      text(ctx, 'Com carinho, ' + d.child, cx, m.y(1395), '700 36px ' + HAND, GOLD);
    } else if (kind === 'presente') {
      title(ctx, 'Meu presente dos sonhos', m.y(690), 46);
      text(ctx, 'Desenhe aqui o presente que você mais quer ganhar!', cx, m.y(745), '400 30px ' + HAND, INK);
    } else if (kind === 'missoes') {
      title(ctx, '7 missões de bondade', m.y(690), 46);
      text(ctx, 'Marque cada missão cumprida. A Rena Faísca vai contar ao Papai Noel!', cx, m.y(742), '400 27px ' + HAND, INK);
      ['Dar um abraço apertado em alguém da família', 'Ajudar a arrumar a mesa', 'Guardar os brinquedos sem ninguém pedir',
        'Fazer um desenho para alguém especial', 'Dividir um brinquedo ou um lanche', 'Agradecer com carinho a alguém', 'Contar uma história para alguém']
        .forEach(function (t, i) {
          var y = m.y(820 + i * 78);
          ctx.strokeStyle = '#1a1208'; ctx.lineWidth = 4; ctx.strokeRect(m.x(140), y - 34, 40, 40);
          text(ctx, t, m.x(205), y, '600 30px ' + SANS, INK, 'left');
        });
    } else if (kind === 'tradicoes') {
      title(ctx, 'Meu Natal é assim', m.y(690), 46);
      text(ctx, 'Escreva ou desenhe as respostas, ' + d.child + '!', cx, m.y(745), '400 30px ' + HAND, INK);
      ['O que eu mais gosto no Natal:', 'Minha comida preferida da ceia:', 'Quem vai passar o Natal comigo:', 'Meu desejo para o mundo:']
        .forEach(function (t, i) {
          var y = m.y(840 + i * 140);
          text(ctx, t, m.x(140), y, '700 26px ' + TITLE, RED, 'left');
          ctx.strokeStyle = '#8a7a66'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(m.x(140), y + 70); ctx.lineTo(m.x(885), y + 70); ctx.stroke();
        });
    }
    footer(ctx, d, n); return p.c;
  }

  function recorte(img, d, n, t) {
    var p = page(), ctx = p.ctx;
    title(ctx, t, 120, 44);
    fit(ctx, img, 80, 160, W - 160, PH - 270); footer(ctx, d, n); return p.c;
  }

  function cartaCrianca(img, d, n) {
    var p = page(), ctx = p.ctx, m = fit(ctx, img, 50, 40, W - 100, PH - 120);
    text(ctx, 'Querido Papai Noel,', m.x(75), m.y(228), '700 36px ' + HAND, RED, 'left');
    text(ctx, 'Com carinho, ' + d.child, m.x(950), m.y(757), '700 34px ' + HAND, GOLD, 'right');
    text(ctx, 'Meu desenho para você:', m.x(90), m.y(845), '400 30px ' + HAND, '#8a7a66', 'left');
    footer(ctx, d, n); return p.c;
  }

  function envelope(img, d, n) {
    var p = page(), ctx = p.ctx;
    title(ctx, 'Envelope para o Polo Norte', 110, 40);
    text(ctx, 'Recorte na linha tracejada, dobre as abas e coloque a sua carta dentro.', W / 2, 160, '400 28px ' + HAND, INK);
    var m = fit(ctx, img, 90, 190, W - 180, PH - 300), cx = m.x(543);
    text(ctx, 'Para: Papai Noel', cx, m.y(660), '700 ' + Math.round(54 * m.s) + 'px ' + HAND, RED);
    text(ctx, 'Oficina do Polo Norte', cx, m.y(725), '700 ' + Math.round(30 * m.s) + 'px ' + TITLE, INK);
    text(ctx, 'De: ' + d.child, cx, m.y(830), '700 ' + Math.round(46 * m.s) + 'px ' + HAND, GOLD);
    footer(ctx, d, n); return p.c;
  }

  function parabens(img, d, n) {
    var k = moldura(img), ctx = k.ctx, m = k.m;
    title(ctx, 'Parabéns,', m.y(240), 56);
    var size = 90; ctx.font = '700 ' + size + 'px ' + HAND;
    while (ctx.measureText(d.child + '!').width > 760 && size > 50) { size -= 4; ctx.font = '700 ' + size + 'px ' + HAND; }
    text(ctx, d.child + '!', W / 2, m.y(340), '700 ' + size + 'px ' + HAND, GOLD);
    text(ctx, 'Você completou o Livrinho Mágico de Natal.', W / 2, m.y(410), '400 34px ' + HAND, INK);
    text(ctx, 'Desenhe aqui como vai ser a sua noite de Natal:', W / 2, m.y(460), '400 30px ' + HAND, INK);
    ctx.setLineDash([14, 10]); ctx.strokeStyle = '#8a7a66'; ctx.lineWidth = 3;
    ctx.strokeRect(m.x(140), m.y(500), m.x(880) - m.x(140), m.y(930) - m.y(500)); ctx.setLineDash([]);
    footer(ctx, d, n); return k.p.c;
  }

  /* ---------- Guia dos pais (2 páginas, vai no PDF da Prova Mágica) ---------- */
  function guiaPage() {
    var p = page('#fbf6ea'), ctx = p.ctx;
    ctx.strokeStyle = '#c9a55c'; ctx.lineWidth = 6; ctx.strokeRect(50, 50, W - 100, PH - 100);
    ctx.lineWidth = 2; ctx.strokeRect(66, 66, W - 132, PH - 132);
    return p;
  }
  function para(ctx, t, x, y, w, font, color, lh) {
    ctx.font = font; ctx.fillStyle = color || INK; ctx.textAlign = 'left';
    H.wrap(ctx, t, w).forEach(function (l) { ctx.fillText(l, x, y); y += lh; });
    ctx.textAlign = 'center'; return y;
  }
  function guia(d) {
    var X = 130, Wd = W - 260, body = '400 29px ' + SANS, lh = 42;
    function sec(ctx, t, y) { ctx.font = '700 32px ' + TITLE; ctx.fillStyle = RED; ctx.textAlign = 'left'; ctx.fillText(t, X, y); ctx.textAlign = 'center'; return y + 50; }
    function list(ctx, items, y) { items.forEach(function (it) { y = para(ctx, '•  ' + it, X + 10, y, Wd - 20, body, INK, lh) + 8; }); return y + 14; }
    var a = guiaPage(), ctx = a.ctx, y = 170;
    text(ctx, 'GUIA DOS PAIS', W / 2, y, '700 60px ' + TITLE, RED); y += 60;
    text(ctx, 'Como fazer a magia acontecer para ' + d.child, W / 2, y, '700 42px ' + HAND, GOLD); y += 90;
    y = sec(ctx, '1. O que tem no seu kit', y);
    y = list(ctx, ['Carta do Papai Noel personalizada', 'Certificado Oficial da Lista dos Bonzinhos com o código mágico (QR Code)',
      '2 bilhetes da Rena Faísca', 'Meu Livrinho Mágico de Natal: 29 páginas com o nome da criança (colorir, jogos, carteirinha de elfo, carta para o Papai Noel, envelope, máscara e enfeites)'], y);
    y = sec(ctx, '2. Como imprimir', y);
    y = list(ctx, ['Papel A4. Na impressora, escolha "Tamanho real" ou "Ajustar à página".', 'Imprima a carta e o certificado coloridos, de preferência em papel mais grosso (90 g ou mais) ou fotográfico.',
      'O livrinho pode ser impresso em sulfite comum. As páginas de colorir também ficam ótimas em preto e branco.', 'Não tem impressora? Leve o PDF a uma papelaria ou gráfica.'], y);
    y = sec(ctx, '3. Como montar', y);
    y = list(ctx, ['Bilhetes da rena: recorte na linha tracejada do meio.', 'Envelope: recorte na linha tracejada externa, dobre as abas laterais para dentro, cole a aba de baixo e feche com a aba do selo.',
      'Máscara: recorte, faça os furos dos olhos e prenda um elástico nas bolinhas laterais.'], y);
    var b = guiaPage(); ctx = b.ctx; y = 170;
    text(ctx, 'O MOMENTO DA PROVA MÁGICA', W / 2, y, '700 48px ' + TITLE, RED); y += 100;
    y = sec(ctx, '1. Antes do Natal', y);
    y = list(ctx, ['Entregue o livrinho no começo de dezembro: a criança pinta o calendário e cumpre as 7 missões de bondade.', 'Ela escreve a carta para o Papai Noel e coloca no envelope do Polo Norte, na árvore ou na janela.'], y);
    y = sec(ctx, '2. A resposta chega', y);
    y = list(ctx, ['Na véspera ou na noite de Natal, deixe a carta do Papai Noel, o certificado e o bilhete da rena junto do presente (ou "trocando de lugar" com a carta da criança).',
      'Leia a carta junto com a criança. Ela vai descobrir que o Papai Noel sabe da boa ação dela.'], y);
    y = sec(ctx, '3. "Mas é de verdade?"', y);
    y = list(ctx, ['Mostre o código dourado do certificado. Aponte a câmera do celular e toque no link que aparecer.', 'O Livro do Polo Norte se abre, procura o nome e confirma: a criança está na Lista dos Bonzinhos!',
      'Dica: teste o código antes, sem a criança por perto. O número de registro do livro é o mesmo do certificado.'], y);
    y = sec(ctx, 'Para manter a magia', y);
    y = list(ctx, ['Guarde o certificado: ele pode ser escaneado de novo sempre que a criança quiser.', 'Use as missões de bondade durante o mês e comente que "a Rena Faísca está de olho".'], y);
    text(ctx, 'Dúvidas? Suporte somente pelo WhatsApp (15) 99766-3247', W / 2, PH - 120, '600 26px ' + SANS, '#5b6870');
    return [a.c, b.c];
  }

  /* ---------- montagem ---------- */
  async function gerarLivrinho(d, onProgress) {
    await H.fontsReady();
    var L = function (n) { return H.loadImage(DIR + n + '.webp'); };
    d = Object.assign({}, d, { photoImg: d.photo ? await H.loadImage(d.photo).catch(function () { return null; }) : null });
    var J = window.jspdf.jsPDF, doc = new J({ unit: 'mm', format: 'a4', orientation: 'portrait', compress: true });
    var steps = [
      function () { return L('capa').then(function (i) { return capa(i, d); }); },
      function () { return L('carteirinha-elfo').then(function (i) { return carteirinha(i, d); }); }
    ];
    COLORIR.forEach(function (n) { steps.push(function (num) { return L(n).then(function (i) { return colorir(i, d, num); }); }); });
    var mold = function (fn) { return function (num) { return L('moldura-rena').then(function (i) { return fn(i, d, num); }); }; };
    var perg = function (kind) { return function (num) { return L('pergaminho-pipo').then(function (i) { return pergaminho(i, d, num, kind); }); }; };
    steps.push(mold(cacaPalavras), mold(labirinto), mold(calendario), mold(jogoDaVelha),
      perg('lista'), perg('presente'), perg('missoes'), perg('tradicoes'),
      function (num) { return L('carta-crianca').then(function (i) { return cartaCrianca(i, d, num); }); },
      function (num) { return L('envelope').then(function (i) { return envelope(i, d, num); }); },
      function (num) { return L('enfeites').then(function (i) { return recorte(i, d, num, 'Enfeites para pintar, recortar e pendurar'); }); },
      function (num) { return L('mascara-rena').then(function (i) { return recorte(i, d, num, 'Máscara da Rena Faísca'); }); },
      mold(parabens));
    for (var i = 0; i < steps.length; i++) {
      if (onProgress) onProgress(i + 1, steps.length);
      var c = await steps[i](i + 1);
      if (i) doc.addPage('a4', 'portrait');
      doc.addImage(c.toDataURL('image/jpeg', i < 2 ? 0.9 : 0.82), 'JPEG', 0, 0, 210, 297);
      c.width = c.height = 1; // libera memória
      await new Promise(function (r) { setTimeout(r, 0); });
    }
    doc.setProperties({ title: 'Meu Livrinho Mágico de Natal - ' + d.child });
    var nome = d.child.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'crianca';
    doc.save('Livrinho-Magico-' + nome + '.pdf');
    return steps.length;
  }

  window.Livrinho = { gerar: gerarLivrinho, guia: guia, _pages: { capa: capa, colorir: colorir, cacaPalavras: cacaPalavras, labirinto: labirinto, calendario: calendario, carteirinha: carteirinha, envelope: envelope, cartaCrianca: cartaCrianca, pergaminho: pergaminho, parabens: parabens, jogoDaVelha: jogoDaVelha, recorte: recorte } };
})();
