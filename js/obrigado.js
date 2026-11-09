/* Página de obrigado: envia os dados da criança para o WhatsApp da loja.
   CONFIGURE AQUI o número que vai receber os pedidos:
   formato internacional, só números (55 + DDD + número). Ex.: '5531999999999' */
var WHATSAPP_NUMERO = '';

(function () {
  'use strict';
  var KEY = 'natal-magico-pedido';
  var $ = function (id) { return document.getElementById(id); };
  var data = null;
  try { data = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (_) { data = null; }

  var form = $('ob-form'), box = $('ob-summary-box'), wa = $('ob-wa'), err = $('ob-error');
  var fields = { child: $('f-child'), age: $('f-age'), deed: $('f-deed'), likes: $('f-likes'), note: $('f-note'), buyer: $('f-buyer'), email: $('f-email') };

  function complete(d) { return d && d.child && d.age && d.deed && d.likes; }

  function fromForm() {
    return {
      child: fields.child.value.trim(), age: fields.age.value.trim(), deed: fields.deed.value.trim(),
      likes: fields.likes.value.trim(), note: fields.note.value.trim(), buyer: fields.buyer.value.trim(),
      email: fields.email.value.trim(), phone: data && data.phone || '', extra: data && data.extra || false
    };
  }

  function fillForm(d) {
    Object.keys(fields).forEach(function (k) { if (d && d[k] != null) fields[k].value = d[k]; });
  }

  function showSummary(d) {
    var dl = $('ob-summary'); dl.replaceChildren();
    [['Criança', d.child], ['Idade', d.age + ' anos'], ['Boa ação', d.deed], ['Gosta de', d.likes], ['Recado da família', d.note], ['E-mail da compra', d.email]]
      .forEach(function (r) {
        if (!r[1]) return;
        var dt = document.createElement('dt'), dd = document.createElement('dd');
        dt.textContent = r[0]; dd.textContent = r[1]; dl.append(dt, dd);
      });
    box.hidden = false; form.hidden = true;
  }

  function message(d) {
    var lines = [
      'Olá! Acabei de comprar o kit Natal Mágico 🎅',
      'Seguem os dados para a carta do Papai Noel:',
      '',
      '• Nome da criança: ' + d.child,
      '• Idade: ' + d.age,
      '• Boa ação: ' + d.deed,
      '• Gosta de: ' + d.likes
    ];
    if (d.note) lines.push('• Recado da família: ' + d.note);
    lines.push('');
    if (d.buyer) lines.push('Comprador(a): ' + d.buyer);
    if (d.email) lines.push('E-mail da compra: ' + d.email);
    if (d.phone) lines.push('Celular: ' + d.phone);
    if (d.extra) lines.push('Escolhi o adicional de foto: vou enviar a foto aqui.');
    return lines.join('\n');
  }

  function link(d) {
    return 'https://wa.me/' + WHATSAPP_NUMERO.replace(/\D/g, '') + '?text=' + encodeURIComponent(message(d));
  }

  if (complete(data)) { fillForm(data); showSummary(data); }
  else { fillForm(data); form.hidden = false; }

  $('ob-edit').addEventListener('click', function () { fillForm(data); box.hidden = true; form.hidden = false; fields.child.focus(); });

  wa.addEventListener('click', function (e) {
    var d = form.hidden ? data : fromForm();
    if (!form.hidden) {
      if (!complete(d) || !fields.email.checkValidity()) {
        e.preventDefault(); err.hidden = false;
        var first = ['child', 'age', 'deed', 'likes', 'email'].filter(function (k) { return !fields[k].value.trim() || !fields[k].checkValidity(); })[0];
        if (first) fields[first].focus();
        return;
      }
      err.hidden = true; data = d;
      try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (_) {}
    }
    if (!WHATSAPP_NUMERO.replace(/\D/g, '')) {
      e.preventDefault();
      alert('Número de WhatsApp ainda não configurado na página.');
      return;
    }
    wa.href = link(d);
  });
})();
