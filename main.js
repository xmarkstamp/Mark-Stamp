// Mobile menu
const hamb=document.querySelector('.hamb');const menuWrap=document.querySelector('.menu-wrap');
if(hamb){hamb.addEventListener('click',()=>{hamb.classList.toggle('open');menuWrap.classList.toggle('open');const exp=hamb.classList.contains('open');hamb.setAttribute('aria-expanded',exp)});}

// WhatsApp behavior
const WA="https://wa.me/5561981254726";
function waMessage(custom){const base=custom||"Olá! Vi o site da MarkStamp e quero um orçamento. Pode me ajudar?";window.open(WA+"?text="+encodeURIComponent(base),'_blank');}
document.querySelectorAll('[data-wa], .whatsapp').forEach(el=>{el.addEventListener('click',e=>{e.preventDefault();waMessage();})});

// Tilt follow mouse for .tilt
document.querySelectorAll('.tilt').forEach(card=>{
  card.addEventListener('mousemove',e=>{const r=card.getBoundingClientRect();const x=e.clientX-r.left, y=e.clientY-r.top;const rx=((y/r.height)-0.5)*6;const ry=((x/r.width)-0.5)*-6;card.style.transform=`rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;});
  card.addEventListener('mouseleave',()=>{card.style.transform='translateY(0)';});
});

// Parallax light
document.querySelectorAll('.parallax').forEach(w=>{
  w.addEventListener('mousemove',e=>{const img=w.querySelector('img');if(!img) return;const r=w.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-0.5;const y=(e.clientY-r.top)/r.height-0.5;img.style.transform=`translate3d(${x*6}px, ${y*6}px, 0) scale(1.03)`;});
  w.addEventListener('mouseleave',()=>{const img=w.querySelector('img');if(img) img.style.transform='translate3d(0,0,0)';});
});

// Form -> WhatsApp with formatted brief
const form=document.getElementById('msForm');
if(form){
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const d=new FormData(form);
    const serv=d.getAll('servicos').join(', ');
    const msg=`Olá, sou ${d.get('nome')} (${d.get('empresa')||'Pessoa Física'}).
WhatsApp: ${d.get('telefone')} | E-mail: ${d.get('email')||'-'}
Cidade/UF: ${d.get('cidade')||'-'} | Site: ${d.get('site')||'-'}

Interesse: ${serv||'-'}
Objetivo: ${d.get('objetivo')} | Orçamento: ${d.get('orcamento')} | Prazo: ${d.get('prazo')}

Detalhes: ${d.get('mensagem')||'-'}`;
    waMessage(msg);
  });
}
