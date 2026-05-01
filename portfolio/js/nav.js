/* ── SCROLL REVEAL ── */
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting)
        setTimeout(() => e.target.classList.add('visible'), i * 80);
    });
  }, { threshold: 0.1 });
  items.forEach(r => obs.observe(r));
}

/* ── ACTIVE NAV LINK ── */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');
  const mnavlink = document.querySelectorAll('.mobnav a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 140) current = s.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
    mnavlink.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  });
}


  const ham = document.querySelector('.hamburger');
  const mobilenav = document.querySelector('.mobnav');

  ham.addEventListener('click',()=>{
    ham.classList.toggle('open');
    mobilenav.classList.toggle('open');


  });

  mobilenav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    ham.classList.remove('open');
    mobilenav.classList.remove('open');
  });
});

initReveal();
initActiveNav();

