/* ================================
   MarkStamp • main.js
   - Menu mobile (toggle + fechar ao clicar)
   - Rolagem suave para âncoras internas
   - WhatsApp (data-wa) + chips com mensagem contextual
   - Tilt (cards) e Parallax (imagens)
   - Formulário -> WhatsApp com brief formatado
   ================================ */

/* ------- Helpers ------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* ------- Menu Mobile ------- */
const hamb = $('.hamb');
const menuWrap = $('.menu-wrap');

if (hamb && menuWrap) {
  hamb.addEventListener('click', () => {
    const isOpen = hamb.classList.toggle('open');
    menuWrap.classList.toggle('open', isOpen);
    hamb.setAttribute('aria-expanded', String(isOpen));
  });

  // Fechar o menu ao clicar em um link
  $$('.menu a', menuWrap).forEach(a => {
    a.addEventListener('click', () => {
      hamb.classList.remove('open');
      menuWrap.classList.remove('open');
      hamb.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ------- Rolagem Suave para Âncoras Internas ------- */
$$('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href');
    if (!id || id === '#') return;
    const target = $(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ------- WhatsApp ------- */
const WA = "https://wa.me/5561981254726";
function waMessage(custom) {
  const base = custom || "Olá! Vi o site da MarkStamp e quero um orçamento. Pode me ajudar?";
  window.open(WA + "?text=" + encodeURIComponent(base), '_blank', 'noopener');
}

// Elementos com data-wa (inclui botões principais e imagens clicáveis)
$$('[data-wa], .whatsapp').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    const msg = el.getAttribute('data-wa-msg') || null;
    waMessage(msg);
  });
});

// Chips dos cards: mensagem contextual automática
$$('.card').forEach(card => {
  const chip = $('.chip', card);
  if (!chip) return;
  const title = $('h3', card)?.textContent?.trim() || 'Serviço';
  const desc = $('p', card)?.textContent?.trim() || '';
  chip.addEventListener('click', (e) => {
    e.preventDefault();
    const msg = `Olá! Tenho interesse em "${title}".\n\nDescrição do interesse: ${desc}\n\nPodemos falar sobre orçamento?`;
    waMessage(msg);
  });
});

/* ------- Tilt (seguir mouse) ------- */
$$('.tilt').forEach(card => {
  let raf = null;

  function reset() {
    card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
  }

  function onMove(e) {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const rx = ((y / r.height) - 0.5) * 6;
    const ry = ((x / r.width) - 0.5) * -6;

    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    });
  }

  card.addEventListener('mousemove', onMove);
  card.addEventListener('mouseleave', reset);
  card.addEventListener('blur', reset);
  card.addEventListener('touchend', reset, { passive: true });
});

/* ------- Parallax leve nas imagens ------- */
$$('.parallax').forEach(w => {
  const img = $('img', w);
  if (!img) return;

  let raf = null;

  function onParallax(e) {
    const r = w.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;

    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      img.style.transform = `translate3d(${x * 6}px, ${y * 6}px, 0) scale(1.03)`;
    });
  }

  function reset() { img.style.transform = 'translate3d(0,0,0)'; }

  w.addEventListener('mousemove', onParallax);
  w.addEventListener('mouseleave', reset);
  w.addEventListener('blur', reset);
});

/* ------- Formulário -> WhatsApp com Brief ------- */
const form = $('#msForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const d = new FormData(form);
    const serv = d.getAll('servicos').join(', ');
    const nome = d.get('nome') || '';
    const empresa = d.get('empresa') || 'Pessoa Física';
    const telefone = d.get('telefone') || '-';
    const email = d.get('email') || '-';
    const cidade = d.get('cidade') || '-';
    const site = d.get('site') || '-';
    const objetivo = d.get('objetivo') || '-';
    const orcamento = d.get('orcamento') || '-';
    const prazo = d.get('prazo') || '-';
    const mensagem = d.get('mensagem') || '-';

    const msg = `Olá, sou ${nome} (${empresa}).
WhatsApp: ${telefone} | E-mail: ${email}
Cidade/UF: ${cidade} | Site: ${site}

Interesse: ${serv || '-'}
Objetivo: ${objetivo} | Orçamento: ${orcamento} | Prazo: ${prazo}

Detalhes: ${mensagem}`;
    waMessage(msg);
  });
}

/* ------- Acessibilidade: prefer-reduced-motion ------- */
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // Desabilita transforms extras para reduzir movimento
  $$('.tilt, .parallax img').forEach(el => { el.style.transition = 'none'; });
}
