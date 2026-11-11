// Meniu mobil
const toggle = document.querySelector('.menu-toggle');
const panel = document.querySelector('.control-panel');
if (toggle && panel) {
  const isOpen = () => panel.classList.contains('is-open');
  const setOpen = open => {
    panel.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open);
  };
  toggle.addEventListener('click', () => setOpen(!isOpen()));
  panel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  // se închide și cu Esc sau cu un click în afara lui
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen()) { setOpen(false); toggle.focus(); }
  });
  document.addEventListener('click', e => {
    if (isOpen() && !panel.contains(e.target) && !toggle.contains(e.target)) setOpen(false);
  });
}

const reveals = document.querySelectorAll('.reveal, .vu');
const show = el => el.classList.add(el.classList.contains('vu') ? 'is-on' : 'is-visible');

if ('IntersectionObserver' in window) {
  // Knob-ul secțiunii vizibile se dă „la maxim”
  const links = [...document.querySelectorAll('.knob-link[href^="#"]')];
  const sections = links.map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);
  if (sections.length) {
    const setActive = id => links.forEach(l => {
      const on = l.getAttribute('href') === '#' + id;
      l.classList.toggle('is-active', on);
      if (on) l.setAttribute('aria-current', 'true'); else l.removeAttribute('aria-current');
    });
    const spy = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => spy.observe(s));
  }

  // Apariție la scroll + acul VU-metrului
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      show(e.target);
      io.unobserve(e.target);
    });
  }, { threshold: .2 });
  reveals.forEach(el => io.observe(el));
} else {
  // browser vechi: arătăm totul direct, fără animații la scroll
  reveals.forEach(show);
}

// Anul curent în footer
document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

// Comutatoarele de pe carduri: pornești cardul
document.querySelectorAll('.feature .toggle').forEach(btn => btn.addEventListener('click', () => {
  const on = btn.getAttribute('aria-pressed') !== 'true';
  btn.setAttribute('aria-pressed', on);
  btn.closest('.feature').classList.toggle('is-on', on);
}));
