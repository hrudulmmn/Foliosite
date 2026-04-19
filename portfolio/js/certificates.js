/* ── CERTIFICATES DATA ── */
const certs = [
  { title: 'Data Structures & Algorithms', issuer: 'NPTEL',    badge: '🏅' },
  { title: 'Full Stack Web Development',   issuer: 'Udemy',    badge: '🎖️' },
  { title: 'Machine Learning Fundamentals',issuer: 'Coursera', badge: '⭐' },
  { title: 'Python Programming',           issuer: 'NPTEL',    badge: '🔖' },
  { title: 'Database Management Systems',  issuer: 'NPTEL',    badge: '🏆' },
];

/* ── SEEDED RNG — stable random layout every load ── */
function seededRNG(seed) {
  let s = seed;
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
}

/* ── BUILD & ANIMATE PILE ── */
function initCertPile() {
  const pile = document.getElementById('certPile');
  if (!pile) return;

  certs.forEach((c, i) => {
    const rng = seededRNG(i * 173 + 61);
    const rot =  (rng() - 0.5) * 26;   // -13 → +13 deg
    const tx  =  (rng() - 0.5) * 40;   // horizontal jitter
    const ty  =  (rng() - 0.5) * 30;   // vertical jitter

    const finalTransform =
      `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) rotate(${rot}deg)`;
    const dropTransform  =
      `translate(calc(-50% + ${tx}px), calc(-120px + ${ty}px)) rotate(${rot}deg)`;

    const card = document.createElement('div');
    card.className   = 'ccard';
    card.style.zIndex    = i + 1;
    card.style.opacity   = '0';
    card.style.transform = dropTransform; // start above viewport
    card.style.left = '50%';
    card.style.top  = '50%';

    card.innerHTML = `
      <div class="cbadge">${c.badge}</div>
      <div class="ctitle">${c.title}</div>
      <div class="cissuer">${c.issuer}</div>
    `;

    // Staggered drop-in: each card falls in one after another
    setTimeout(() => {
      card.style.transition = 'opacity .15s, transform .7s cubic-bezier(.34,1.56,.64,1)';
      card.style.opacity    = '1';
      // Two rAF to let the browser paint the start state first
      requestAnimationFrame(() => requestAnimationFrame(() => {
        card.style.transform = finalTransform;
      }));
    }, 300 + i * 220);

    // Hover: bring to top; leave: restore original z
    card.addEventListener('mouseenter', () => { card.style.zIndex = 30; });
    card.addEventListener('mouseleave', () => { card.style.zIndex = i + 1; });

    pile.appendChild(card);
  });
}

initCertPile();
