/* Natal Mágico — comportamento. Sem dependências, sem rastreamento externo. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var small = matchMedia('(max-width:700px)').matches;

  /* ---------- Camada de eventos (ver docs/EVENTOS.md) ----------
     Só aceita parâmetros da lista abaixo, com valores simples.
     Nenhum conteúdo digitado pelo usuário passa por aqui. */
  var ALLOWED = { plan: 1, addon: 1, step: 1, value: 1, source: 1, selected: 1, scene: 1 };
  var NM = window.NatalMagico = window.NatalMagico || {};
  NM.events = [];
  NM.config = NM.config || { checkoutEnabled: true, createCheckout: null, debug: /[?&]debug=1/.test(location.search) };
  // LINK DE CHECKOUT: cole aqui o seu link de pagamento (ex.: 'https://...').
  // Enquanto estiver vazio, o botão de pagamento mostra uma mensagem de aviso.
  NM.config.checkoutUrl = NM.config.checkoutUrl || '';
  NM.config.createCheckout = async function () {
    var url = NM.config.checkoutUrl;
    var checkout;
    try { checkout = new URL(url); } catch (_) { throw new Error('Link de pagamento ainda não configurado.'); }
    if (checkout.protocol !== 'https:') throw new Error('Link de pagamento ainda não configurado.');
    return {checkoutUrl:checkout.href};
  };
  NM.track = function (name, params) {
    var clean = {};
    if (params) Object.keys(params).forEach(function (k) {
      var v = params[k];
      if (ALLOWED[k] && (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean')) clean[k] = typeof v === 'string' ? v.slice(0, 40) : v;
    });
    var ev = { name: name, params: clean, t: Date.now() };
    NM.events.push(ev); if (NM.events.length > 200) NM.events.shift();
    if (NM.config.debug) console.debug('[natalmagico]', name, clean);
    window.dispatchEvent(new CustomEvent('natalmagico:event', { detail: ev }));
  };
  NM.track('page_view');
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-track]'); if (!a) return;
    var n = a.getAttribute('data-track');
    if (n.indexOf('cta_') === 0 || n.indexOf('shortcut_') === 0) NM.track('cta_click', { source: n });
  });

  /* ---------- Nav ---------- */
  var nav = $('nav.top');
  var onScrollNav = function () { nav.classList.toggle('solid', scrollY > 40); };
  addEventListener('scroll', onScrollNav, { passive: true }); onScrollNav();

  /* ---------- Neve ---------- */
  var snow = $('.snow');
  if (!reduced) {
    var count = small ? 14 : 32, frag = document.createDocumentFragment();
    for (var i = 0; i < count; i++) {
      var f = document.createElement('i'), n = 2 + Math.random() * 3;
      f.className = 'flake';
      f.style.cssText = 'left:' + Math.random() * 100 + '%;width:' + n + 'px;height:' + n + 'px;animation-duration:' + (10 + Math.random() * 18) + 's;animation-delay:-' + Math.random() * 25 + 's';
      frag.appendChild(f);
    }
    snow.appendChild(frag);
  }

  /* ---------- Revelação por rolagem ---------- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.1 });
    $$('.reveal').forEach(function (el) { io.observe(el); });
  } else { $$('.reveal').forEach(function (el) { el.classList.add('visible'); }); }

  /* ---------- Jornada de rolagem ----------
     A rolagem é nativa. O progresso p (0 a 1) vem da posição real da página,
     então tudo é reversível. Só transform e opacity são animados por quadro. */
  var journey = $('.scroll-journey'), hero = $('.hero');
  var heroCopy = $('.hero-content'), village = $('.scene'), doorLight = $('.door-light'),
      workshop = $('.workshop'), envelope = $('.scroll-envelope'), flap = $('.env-flap'),
      bar = $('.journey-progress i'), hint = $('.scroll-hint'),
      chapters = $$('.chapter'), journeyStarted = false, journeyDone = false;
  var clamp = function (v) { return Math.max(0, Math.min(1, v)); };
  var smooth = function (v) { v = clamp(v); return v * v * (3 - 2 * v); };
  var ramp = function (p, a, b) { return smooth((p - a) / (b - a)); };
  var pulse = function (p, a, b, c, d) { return ramp(p, a, b) * (1 - ramp(p, c, d)); };
  var ticking = false;

  function renderJourney() {
    ticking = false;
    if (reduced) return;
    var rect = journey.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > innerHeight) { snow.classList.add('paused'); return; }
    var range = journey.offsetHeight - hero.offsetHeight;
    var p = clamp(-rect.top / Math.max(1, range));
    // Keep the preview readable while the mobile keyboard is active.
    if (document.activeElement && document.activeElement.id === "hero-name") p = 0;

    heroCopy.style.opacity = 1 - ramp(p, 0.02, 0.13);
    heroCopy.style.transform = 'translateY(' + (-ramp(p, 0, 0.15) * 70) + 'px)';
    heroCopy.style.visibility = p > 0.14 ? 'hidden' : 'visible';

    // Follow the doorway in the source image, accounting for object-fit cropping.
    var z = ramp(p, 0.06, 0.42), w = hero.clientWidth, h = hero.clientHeight;
    var nw = village.naturalWidth || 1672, nh = village.naturalHeight || 941;
    var cover = Math.max(w / nw, h / nh), rw = nw * cover, rh = nh * cover;
    var posX = w <= 700 ? 0.64 : 0.5;
    var doorX = (w - rw) * posX + rw * 0.72;
    var doorY = (h - rh) * 0.5 + rh * 0.62;
    village.style.transformOrigin = doorX + 'px ' + doorY + 'px';
    var scale = 1 + z * 0.9;
    var tx = Math.max(-(scale - 1) * (w - doorX), Math.min((scale - 1) * doorX, (w * 0.5 - doorX) * z));
    var ty = Math.max(-(scale - 1) * (h - doorY), Math.min((scale - 1) * doorY, (h * 0.55 - doorY) * z));
    village.style.transform = 'translate(' + tx + 'px,' + ty + 'px) scale(' + scale + ')';
    village.style.opacity = 1 - ramp(p, 0.4, 0.5);
    doorLight.style.opacity = ramp(p, 0.3, 0.44) * (1 - ramp(p, 0.5, 0.6));
    workshop.style.opacity = ramp(p, 0.43, 0.55);
    workshop.style.transform = 'scale(' + (1.1 - ramp(p, 0.43, 0.72) * 0.1) + ')';

    var ops = [pulse(p, 0.14, 0.2, 0.3, 0.38), pulse(p, 0.48, 0.55, 0.64, 0.72), ramp(p, 0.8, 0.9)];
    chapters.forEach(function (c, i) {
      c.style.opacity = ops[i];
      c.style.visibility = ops[i] < 0.01 ? 'hidden' : 'visible';
    });

    var open = ramp(p, 0.64, 0.76);
    envelope.style.setProperty('--seal', ramp(p, 0.6, 0.66));
    envelope.style.setProperty('--open', open);
    envelope.style.setProperty('--lift', ramp(p, 0.75, 0.92));
    flap.style.zIndex = open > 0.5 ? '2' : '6'; /* a aba passa para trás da carta quando está de lado */

    bar.style.width = (p * 100) + '%';
    hint.style.opacity = 1 - ramp(p, 0.03, 0.1);
    snow.classList.toggle('paused', rect.bottom < 0);

    if (!journeyStarted && p > 0.03) { journeyStarted = true; NM.track('journey_start'); }
    if (!journeyDone && p > 0.93) { journeyDone = true; NM.track('journey_complete'); }
  }
  addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(renderJourney); } }, { passive: true });
  addEventListener('resize', renderJourney);
  renderJourney();

  /* ---------- Carta interativa ---------- */
  var chipText = {
    nome: 'O primeiro nome da criança abre a carta e a assinatura do certificado.',
    conquista: 'Uma atitude concreta que você quer celebrar, escrita como o Noel contaria.',
    gosto: 'Algo de que ela gosta, para a carta soar como se o Noel a conhecesse.',
    recado: 'Um recado seu, que entra como um carinho da família.'
  };
  var chips = $$('.chip'), letterParts = $$('.letter [data-k]'), note = $('#chip-note');
  function selectChip(k) {
    chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c.dataset.chip === k)); });
    letterParts.forEach(function (s) { s.classList.toggle('on', s.dataset.k === k); });
    note.textContent = chipText[k];
  }
  chips.forEach(function (c) { c.addEventListener('click', function () { selectChip(c.dataset.chip); }); });
  selectChip('nome');

  /* ---------- Formulário em 3 etapas ---------- */
  var PRICE = { kit: 1490, foto: 2990, extra: 990 };
  var money = function (c) { if (c === null) return 'Valor no checkout'; return (c / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); };
  var form = $('#form'), panels = $$('[data-panel]'), stepperItems = $$('#stepper li'),
      back = $('#back'), next = $('#next'), result = $('#result'), step = 1, started = false;
  var F = { child: $('#child'), age: $('#age'), deed: $('#deed'), likes: $('#likes'), note: $('#note'), extra: $('#extra') };
  var planInputs = $$('input[name=plan]');
  var getPlan = function () { return (planInputs.filter(function (r) { return r.checked; })[0] || {}).value || 'kit'; };
  var setPlan = function (v) { planInputs.forEach(function (r) { r.checked = r.value === v; }); onPlan(); };
  var totalCents = function () { var base=PRICE[getPlan()]; return base === null ? null : base + (F.extra.checked ? PRICE.extra : 0); };

  function onPlan() {

    $('#total').textContent = money(totalCents());
    renderReview();
  }
  function renderReview() {
    var dl = $('#review'); dl.replaceChildren();
    var rows = [
      ['Nome', F.child.value.trim() || '—', 1],
      ['Idade', F.age.value ? F.age.value + ' anos' : '—', 1],
      ['Conquista', F.deed.value.trim() || '—', 2],
      ['Gosta de', F.likes.value.trim() || '—', 2],
      ['Recado', F.note.value.trim() || 'Sem recado', 2]
    ];
    rows.forEach(function (r) {
      var item = document.createElement('div'); item.className = 'nm-review-chip';
      var dt = document.createElement('dt'), dd = document.createElement('dd');
      dt.textContent = r[0]; dd.textContent = r[1];
      var edit = document.createElement('button'); edit.type = 'button'; edit.className = 'nm-edit-field'; edit.textContent = 'Editar ' + r[0];
      edit.addEventListener('click', function () { goStep(r[2]); });
      item.append(dt, dd, edit); dl.append(item);
    });
  }

  function setErr(input, msg) {
    var e = $('#err-' + input.id); if (!e) return;
    e.textContent = msg || ''; input.setAttribute('aria-invalid', msg ? 'true' : 'false');
  }
  var validators = {
    child: function () {
      var v = F.child.value.trim();
      if (!v) return 'Digite o primeiro nome da criança.';
      if (v.length < 2 || !/^[\p{L}][\p{L}'’ -]*$/u.test(v)) return 'Use apenas letras (ex.: Sofia).';
    },
    age: function () {
      var n = Number(F.age.value);
      if (!F.age.value || !Number.isInteger(n) || n < 1 || n > 17) return 'Informe uma idade de 1 a 17 anos.';
    },
    deed: function () {
      if (F.deed.value.trim().length < 6) return 'Conte uma conquista ou boa ação (ex.: aprendeu a dividir os brinquedos).';
    },
    likes: function () {
      if (F.likes.value.trim().length < 3) return 'Conte algo de que a criança gosta (ex.: desenhar).';
    }
  };
  var byStep = { 1: ['child', 'age'], 2: ['deed', 'likes'], 3: [] };
  function validateStep(s) {
    var firstBad = null;
    byStep[s].forEach(function (k) {
      var m = validators[k](); setErr(F[k], m);
      if (m && !firstBad) firstBad = F[k];
    });
    if (firstBad) { firstBad.focus(); return false; }
    return true;
  }
  Object.keys(validators).forEach(function (k) {
    F[k].addEventListener('blur', function () { if (F[k].value) setErr(F[k], validators[k]()); });
    F[k].addEventListener('input', function () { if (F[k].getAttribute('aria-invalid') === 'true') setErr(F[k], validators[k]()); });
  });
  [['deed', 180], ['likes', 100], ['note', 300]].forEach(function (a) {
    var el = F[a[0]], out = $('#cnt-' + a[0]);
    el.addEventListener('input', function () { out.textContent = el.value.length + '/' + a[1]; });
  });

  function goStep(s, init) {
    step = s;
    panels.forEach(function (p) { p.hidden = Number(p.dataset.panel) !== s; });
    stepperItems.forEach(function (li) {
      var n = Number(li.dataset.s);
      li.className = n < s ? 'done' : n === s ? 'active' : '';
      if (n === s) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
    });
    back.hidden = s === 1;
    next.textContent = s === 3 ? 'Ver a prévia da carta ✧' : 'Continuar →';
    if (s === 3) { onPlan(); }
    result.hidden = true;
    if (init) return;
    var lg = $('[data-panel="' + s + '"] legend'); if (lg) lg.focus({ preventScroll: true });
    $('.formwrap').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  }
  form.addEventListener('input', function () {
    if (!started) { started = true; NM.track('personalization_start'); }
    if (step === 3) renderReview();
  });
  planInputs.forEach(function (r) { r.addEventListener('change', function () { onPlan(); NM.track('plan_select', { plan: getPlan(), source: 'form' }); }); });
  F.extra.addEventListener('change', function () { onPlan(); NM.track('addon_toggle', { selected: F.extra.checked, value: PRICE.extra / 100 }); });
  back.addEventListener('click', function () { if (step > 1) goStep(step - 1); });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validateStep(step)) return;
    if (step < 3) { NM.track('personalization_step', { step: step + 1 }); goStep(step + 1); return; }
    showPreview();
  });
  $$('[data-plan]').forEach(function (a) {
    a.addEventListener('click', function () { setPlan(a.dataset.plan); NM.track('plan_select', { plan: a.dataset.plan, source: 'comparison' }); });
  });

  function para(t) { var p = document.createElement('p'); p.textContent = t; return p; }
  function showPreview() {
    var name = F.child.value.trim(), deed = F.deed.value.trim().replace(/^(que\s+)?você\s+/i, '').replace(/[.!\s]+$/, ''),
        likes = F.likes.value.trim().replace(/[.!\s]+$/, ''), fam = F.note.value.trim();
    result.replaceChildren();
    var tag = document.createElement('div'); tag.className = 'tagline'; tag.textContent = 'Prévia de texto · nenhum PDF foi gerado';
    var h = document.createElement('h3'); h.textContent = 'Para ' + name + ', com carinho'; h.style.marginBottom = '14px';
    result.append(tag, h,
      para('Olá, ' + name + '!'),
      para('Chegou à minha oficina, lá no Polo Norte, uma notícia especial: você ' + deed + '. Que gesto bonito!'),
      para('Soube também que você gosta de ' + likes + '. Que o seu Natal tenha muitas brincadeiras e muitas descobertas.'));
    if (fam) result.append(para('Um recado de quem ama você: “' + fam + '”'));
    result.append(para('Um abraço bem quentinho, Papai Noel.'));

    var st = document.createElement('div'); st.className = 'status';
    var btn = document.createElement('button'); btn.type = 'button'; btn.className = 'btn red';
    var msg = document.createElement('p');
    if (getPlan() === 'foto') {
      btn.textContent = 'Compra em configuração'; btn.disabled = true;
      btn.setAttribute('aria-disabled', 'true');
      msg.textContent = 'O adicional de foto é escolhido no checkout da Cakto. Após o pagamento, o envio da foto é combinado com o suporte. Prazo: até 24 horas após o recebimento da foto.';
    } else if (NM.config.checkoutEnabled && typeof NM.config.createCheckout === 'function') {
      var label = document.createElement('label');
      label.textContent = 'E-mail do responsável'; label.htmlFor = 'checkout-email';
      var email = document.createElement('input');
      email.id = 'checkout-email'; email.type = 'email'; email.autocomplete = 'email'; email.required = true;
      email.placeholder = 'voce@exemplo.com';
      st.append(label, email);
      var phoneLabel=document.createElement('label'); phoneLabel.htmlFor='checkout-phone'; phoneLabel.textContent='Celular do responsável (com DDD)';
      var phone=document.createElement('input'); phone.id='checkout-phone'; phone.type='tel'; phone.inputMode='tel'; phone.autocomplete='tel-national'; phone.required=true; phone.maxLength=15; phone.placeholder='(31) 99999-9999'; phone.pattern='\\([0-9]{2}\\) [0-9]{5}-[0-9]{4}';
      phone.addEventListener('input',function(){var d=phone.value.replace(/\D/g,'').slice(0,11);phone.value=d.length>7?'('+d.slice(0,2)+') '+d.slice(2,7)+'-'+d.slice(7):d.length>2?'('+d.slice(0,2)+') '+d.slice(2):d.length?'('+d:'';});
      var phoneHint=document.createElement('p'); phoneHint.className='small'; phoneHint.textContent='Informe seu número com DDD para contato sobre o pedido. Após a confirmação, acesse os arquivos pela página de entrega.';
      st.append(phoneLabel,phone,phoneHint);
      var legal=document.createElement('p'); legal.className='small'; legal.innerHTML='Ao continuar, consulte a <a href="/privacidade">Privacidade</a> e os <a href="/termos">Termos de Uso</a>.';st.append(legal);
      btn.textContent = 'Continuar para o pagamento →';
      msg.textContent = 'Kit ' + money(totalCents()) + '. Confira o valor final na Cakto. Após a confirmação, acesse os PDFs na página de entrega; o link por e-mail ainda não está disponível.';
      btn.addEventListener('click', async function () {
        if (!email.reportValidity() || !phone.reportValidity()) return;
        btn.disabled = true;
        NM.track('checkout_start', { plan: getPlan(), addon: F.extra.checked, value: totalCents() === null ? null : totalCents() / 100 });
        /* Os dados da criança seguem só para a integração de pagamento, nunca para os eventos. */
        try {
          var order = await NM.config.createCheckout();
          window.location.href = order.checkoutUrl;
        } catch (err) {
          msg.textContent = err instanceof Error ? err.message : 'Não foi possível iniciar o pagamento. Tente novamente.';
          btn.disabled = false;
        }
      });
    } else {
      btn.textContent = 'Pagamento em configuração'; btn.disabled = true; btn.setAttribute('aria-disabled', 'true');
      msg.textContent = 'Estamos configurando a confirmação do pagamento e a entrega automática. A compra será liberada após os testes.';
    }
    st.append(btn, msg); result.append(st);
    result.hidden = false;
    NM.track('personalization_complete', { plan: getPlan(), addon: F.extra.checked, value: totalCents() / 100 });
    result.focus({ preventScroll: true });
    var topNav = document.querySelector('nav.top');
    result.style.scrollMarginTop = ((topNav ? topNav.getBoundingClientRect().height : 0) + 20) + 'px';
    result.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  }
  goStep(1, true);

  /* Trilha de Natal: inicia na interação e permanece sob controle do visitante. */
  var audioBtn = $('#audio'), music = new Audio('assets/trilha-natal.mp3');
  music.loop = true; music.preload = 'metadata'; music.volume = 0.32;
  music.setAttribute('playsinline', '');
  var on = false, userMuted = false, starting = false, touchStartY = null;
  function label() {
    audioBtn.setAttribute('aria-pressed', String(on));
    audioBtn.setAttribute('aria-label', on ? 'Silenciar trilha sonora' : 'Ativar trilha sonora de Natal');
  }
  function startAudio() {
    if (starting || on) return;
    starting = true;
    var result = music.play();
    if (result && result.then) result.then(function () { starting = false; if(userMuted){music.pause();return} on = true; label(); }).catch(function () { starting = false; on = false; label(); });
    else { starting = false; on = true; label(); }
  }
  function stopAudio() { music.pause(); on = false; label(); }
  function suspendAudio() { music.pause(); }
  function resumeAudio() { if (on) { var p = music.play(); if (p && p.catch) p.catch(function () { on = false; label(); }); } }
  function startOnScroll() { if (!on && !userMuted) startAudio(); }
  window.addEventListener('touchstart', function(e){if(e.touches.length===1)touchStartY=e.touches[0].clientY;}, {passive:true});
  window.addEventListener('touchend', function(e){if(touchStartY!==null && e.changedTouches.length && Math.abs(e.changedTouches[0].clientY-touchStartY)>10)startOnScroll();touchStartY=null;}, {passive:true});
  window.addEventListener('wheel', startOnScroll, {passive:true});
  window.addEventListener('keydown', function(e){if(['ArrowDown','PageDown',' '].indexOf(e.key)!==-1 && !/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName))startOnScroll();});
  audioBtn.addEventListener('click', function () { if (on || starting) { userMuted = true; stopAudio(); } else { userMuted = false; startAudio(); } });
  document.addEventListener('visibilitychange', function () { document.hidden ? suspendAudio() : resumeAudio(); });
  label();
})();


/* Découverte immédiate: interaction locale, sans stockage de données. */
(function(){var shell=document.getElementById('hero-live'),seal=document.getElementById('open-package'),name=document.getElementById('hero-name'),out=document.getElementById('live-name');if(!shell||!seal)return;seal.addEventListener('click',function(){shell.classList.add('is-open');seal.setAttribute('aria-expanded','true');/* O campo recebe foco apenas por toque para não abrir o teclado automaticamente. */});name.addEventListener('input',function(){out.textContent=name.value.trim()||'Sofia'});if(matchMedia('(hover:hover) and (prefers-reduced-motion:no-preference)').matches){shell.addEventListener('pointermove',function(e){var r=shell.getBoundingClientRect();shell.style.setProperty('--tilt-x',((.5-(e.clientY-r.top)/r.height)*6)+'deg');shell.style.setProperty('--tilt-y',(((e.clientX-r.left)/r.width-.5)*8)+'deg')});shell.addEventListener('pointerleave',function(){shell.style.setProperty('--tilt-x','0deg');shell.style.setProperty('--tilt-y','0deg')})}})();

/* Guia interativo: falas legendadas e áudio somente por solicitação. */
(function () {
  var guide = document.getElementById('elf-guide'), bubble = document.getElementById('elf-bubble');
  var toggle = document.getElementById('elf-toggle'), who = document.getElementById('elf-who'), msg = document.getElementById('elf-message');
  var spot = document.getElementById('guide-spotlight'), current = null, seen = {}, appeared = {}, spotTimer, activeTarget, entranceTimer, exitTimer, spotWait, spotCooldown = 0;
  if (!guide) return;
  var data = {
    inicio: ['Duende da oficina', 'Uma surpresa especial está chegando. Venha conhecer!'],
    carta: ['Papai Noel', 'Uma carta com o nome e a história da criança.'],
    kit: ['Duende da oficina', 'Tem certificado, desenhos e outras surpresas!'],
    pacotes: ['Duende da oficina', 'Escolha seu kit: a partir de R$ 14,90.']
  };
  var highlights = [{id:'carta', selector:'.letter'}, {id:'kit', selector:'#kit .materials figure'}, {id:'preco-kit', selector:'.offer-card-paper .offer-price'}, {id:'vantagens-kit', selector:'.offer-card-paper ul'}];
  function positionSpot() {
    if (!activeTarget) return;
    var r = activeTarget.getBoundingClientRect();
    if (r.bottom < 30 || r.top > innerHeight - 30) { clearTimeout(spotTimer); spot.classList.remove('on'); activeTarget = null; spotCooldown = Date.now() + 1000; setTimeout(spotlight, 1050); return; }
    var x = Math.max(25, Math.min(innerWidth - 25, r.left + r.width / 2));
    var y = Math.max(65, Math.min(innerHeight - 65, r.top + r.height / 2));
    spot.style.setProperty('--spot-x', x + 'px'); spot.style.setProperty('--spot-y', y + 'px');
    spot.style.setProperty('--spot-size', Math.min(200, Math.max(75, Math.min(r.width, r.height) * .65)) + 'px');
  }
  function spotlight() {
    if (!spot || activeTarget || spotWait || Date.now() < spotCooldown || document.hidden || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var options = highlights.map(function (item) {
      var el = document.querySelector(item.selector); if (!el || seen[item.id]) return null;
      var r = el.getBoundingClientRect();
      var visible = Math.min(r.bottom, innerHeight * .85) - Math.max(r.top, innerHeight * .15);
      if (visible < Math.min(r.height * .55, 80)) return null;
      return {item:item, el:el, distance:Math.abs((r.top + r.bottom) / 2 - innerHeight / 2)};
    }).filter(Boolean).sort(function(a,b){return a.distance-b.distance;});
    if (!options.length) return;
    var candidate = options[0];
    spotWait = setTimeout(function () {
      spotWait = null; var r = candidate.el.getBoundingClientRect();
      if (r.bottom < innerHeight * .25 || r.top > innerHeight * .75 || document.hidden) return;
      seen[candidate.item.id] = true; activeTarget = candidate.el; positionSpot(); spot.classList.add('on');
      spotTimer = setTimeout(function () {
        spot.classList.remove('on'); activeTarget = null; spotCooldown = Date.now() + 2400;
        setTimeout(spotlight, 2450);
      }, 2400);
    }, 650);
  }
  function leave() {
    clearTimeout(exitTimer); guide.classList.add('guide-off'); guide.setAttribute('aria-hidden', 'true');
  }
  function show(id) {
    if (!data[id] || current === id) return;
    current = id; clearTimeout(entranceTimer); leave();
    if (appeared[id]) return;
    entranceTimer = setTimeout(function () {
      if (current !== id) return;
      appeared[id] = true; who.textContent = '✦ ' + data[id][0]; msg.textContent = data[id][1];
      bubble.hidden = false; toggle.setAttribute('aria-expanded', 'true');
      guide.classList.toggle('is-santa', id === 'carta'); guide.dataset.scene = id;
      guide.classList.remove('guide-off'); guide.removeAttribute('aria-hidden');
      guide.classList.remove('scene-enter'); void guide.offsetWidth; guide.classList.add('scene-enter');
      spotlight(); exitTimer = setTimeout(leave, 5200);
    }, id === 'inicio' ? 700 : 1400);
  }
  function visibility() {
    var ids = ['pacotes', 'kit', 'carta'], selected = 'inicio';
    for (var i = 0; i < ids.length; i++) { var section = document.getElementById(ids[i]), r = section.getBoundingClientRect(); if (r.top < innerHeight * .58 && r.bottom > innerHeight * .3) { selected = ids[i]; break; } }
    show(selected); positionSpot(); spotlight();
  }
  var ticking = false; addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(function () { visibility(); ticking = false; }); } }, {passive: true});
  addEventListener('resize', positionSpot);
  toggle.addEventListener('click', leave);
  document.getElementById('elf-close').addEventListener('click', leave);
  leave(); visibility();
})();

/* Sugestões editáveis, sem preencher dados automaticamente. */
document.querySelectorAll('[data-suggest]').forEach(function(button){button.addEventListener('click',function(){var field=document.getElementById(button.dataset.suggest);if(!field)return;field.value=button.dataset.value;field.dispatchEvent(new Event('input',{bubbles:true}));field.focus();});});

/* A cena responde à rolagem sem interferir nos campos do formulário. */
(function(){
  var scenes=Array.from(document.querySelectorAll('.story-travel'));
  if(!scenes.length || matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var busy=false;function render(){busy=false;scenes.forEach(function(scene){var r=scene.getBoundingClientRect(),range=scene.offsetHeight-innerHeight;if(r.bottom<0||r.top>innerHeight)return;var progress=Math.max(0,Math.min(1,-r.top/Math.max(1,range)));scene.style.setProperty('--story-scale',(1+progress*.55).toFixed(3));scene.style.setProperty('--story-progress',progress.toFixed(3));});}
  addEventListener('scroll',function(){if(!busy){busy=true;requestAnimationFrame(render)}},{passive:true});addEventListener('resize',render);render();
  if('IntersectionObserver' in window){var obs=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('story-enter');obs.unobserve(entry.target)}})},{threshold:.15});document.querySelectorAll('.story-copy,#como .steps>div,#pacotes .offer-card,#personalizar .formwrap').forEach(function(el){obs.observe(el)});}
})();

/* Cenários se movem discretamente conforme a página avança. */
(function(){if(matchMedia('(prefers-reduced-motion: reduce), (max-width:700px)').matches)return;var scenes=Array.from(document.querySelectorAll('#carta,#kit,#como,#pacotes,#personalizar,#duvidas'));var ticking=false;function paint(){ticking=false;scenes.forEach(function(scene){var r=scene.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;var p=Math.max(0,Math.min(1,(innerHeight-r.top)/(innerHeight+r.height)));scene.style.setProperty('--scene-y',(45+p*10).toFixed(1)+'%')})}addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(paint)}},{passive:true});addEventListener('resize',paint);paint()})();

/* Animações diferentes ligadas à rolagem, sem mover os campos editáveis. */
(function(){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var nodes=Array.from(document.querySelectorAll('.letter-stage,.materials .mat,#como .steps>div,.offer-cards,.story-frame'));
  nodes.forEach(function(el){el.classList.add('scroll-magic')});
  var waiting=false, active=new Set(nodes), observer;
  if('IntersectionObserver' in window){active.clear();observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting)active.add(entry.target);else active.delete(entry.target);});schedule();},{rootMargin:'100px 0px'});nodes.forEach(function(el){observer.observe(el)});}
  function schedule(){if(!waiting){waiting=true;requestAnimationFrame(frame)}}
  function frame(){waiting=false;var height=innerHeight||document.documentElement.clientHeight;active.forEach(function(el){var r=el.getBoundingClientRect();if(r.bottom < -100 || r.top > height+100)return;var progress=Math.max(0,Math.min(1,(height*.92-r.top)/Math.max(120,Math.min(height*.56,r.height*.75)))).toFixed(3);if(el.dataset.magicProgress!==progress){el.dataset.magicProgress=progress;el.style.setProperty('--magic',progress);}});}
  addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);schedule();
})();

(function(){
  var section=document.querySelector('.gift-reveal'),button=document.querySelector('.gift-button'),message=document.getElementById('gift-message');
  if(!section||!button||!message)return;
  var shown=false, reduced=matchMedia('(prefers-reduced-motion: reduce)').matches, queued=false;
  function reveal(){if(shown)return;shown=true;section.classList.add('gift-open');button.setAttribute('aria-expanded','true');message.hidden=false;button.querySelector('.gift-label').textContent='Presente aberto';}
  button.addEventListener('click',reveal);
  function frame(){queued=false;if(reduced)return;var r=section.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;var range=section.offsetHeight-innerHeight;var p=Math.max(0,Math.min(1,-r.top/Math.max(range,1)));section.style.setProperty('--gift-progress',p.toFixed(3));var chimney=section.querySelector('.chimney-transition');if(chimney){var opacity=Math.max(0,Math.min(1,p/.12,(.65-p)/.25));chimney.style.opacity=opacity.toFixed(3);chimney.style.setProperty('--descent',p.toFixed(3));}if(p>.48)reveal();}
  addEventListener('scroll',function(){if(!queued){queued=true;requestAnimationFrame(frame)}},{passive:true});addEventListener('resize',frame);frame();
})();

/* Pequenos focos de luz acompanham apenas as cenas próximas da tela. */
(function () {
  var reduced = matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced.matches) return;
  var targets = document.querySelectorAll('.hero, .story-frame, .letter-stage, .gift-pin');
  var observer = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) { entry.target.classList.toggle('light-awake', entry.isIntersecting); });
  }, { rootMargin: '80px 0px' }) : null;
  targets.forEach(function (target) {
    var layer = document.createElement('div');
    layer.className = 'magic-light';
    layer.setAttribute('aria-hidden', 'true');
    layer.innerHTML = '<span></span><i></i><i></i><i></i>';
    target.appendChild(layer);
    if (observer) observer.observe(target); else target.classList.add('light-awake');
  });
})();

/* A entrada de cada detalhe acompanha a rolagem sem bloquear toques ou campos. */
(function () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  var elements = document.querySelectorAll('.trust li,.moment-strip>div,#como .steps>div,#kit .mat,.offer-benefits li');
  document.documentElement.classList.add('cinema-ready');
  var reveal = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) { entry.target.classList.add('cinema-visible'); reveal.unobserve(entry.target); }
    });
  }, {rootMargin:'0px 0px -5% 0px',threshold:0.08});
  elements.forEach(function(el) {el.classList.add('cinema-reveal');reveal.observe(el);});
  var scene=document.querySelector('#carta'), ticking=false;
  if (!scene) return;
  function render(){ticking=false;var r=scene.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;var p=Math.max(0,Math.min(1,(innerHeight-r.top)/(innerHeight+r.height)));scene.style.setProperty('--cinema-lift',((.5-p)*22).toFixed(1)+'px');scene.style.setProperty('--cinema-scale',(0.98+p*.04).toFixed(3));}
  addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(render);}},{passive:true});
  addEventListener('resize',render);render();
})();


/* Activate the photographic gift scene only after the asset successfully loads.
   Keeps the existing Santa scene visible while the asset is not deployed. */
(function(){
  var section=document.querySelector('.gift-reveal');
  if(!section)return;
  var photo=new Image();
  photo.onload=function(){if(photo.naturalWidth>0)section.classList.add('has-cinematic-photo');};
  photo.onerror=function(){section.classList.remove('has-cinematic-photo');};
  photo.src='assets/papai-noel-presente-cinematico.webp';
})();
