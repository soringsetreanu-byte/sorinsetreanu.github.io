// Meniu mobil
const toggle = document.querySelector('.menu-toggle');
const panel = document.querySelector('.control-panel');
if (toggle && panel) {
  toggle.addEventListener('click', () => {
    const open = panel.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open);
  });
  panel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    panel.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

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
    e.target.classList.add(e.target.classList.contains('vu') ? 'is-on' : 'is-visible');
    io.unobserve(e.target);
  });
}, { threshold: .2 });
document.querySelectorAll('.reveal, .vu').forEach(el => io.observe(el));

// Anul curent în footer
document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

// Comutatoarele de pe carduri: pornești cardul
document.querySelectorAll('.feature .toggle').forEach(btn => btn.addEventListener('click', () => {
  const on = btn.getAttribute('aria-pressed') !== 'true';
  btn.setAttribute('aria-pressed', on);
  btn.closest('.feature').classList.toggle('is-on', on);
}));
