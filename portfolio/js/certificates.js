const certs = [
  { title: 'Data Structures & Algorithms',  issuer: 'NPTEL',    badge: '🏅', year: '2024',  },
  { title: 'Full Stack Web Development',    issuer: 'Udemy',    badge: '🎖️', year: '2024' },
  { title: 'Machine Learning Fundamentals', issuer: 'Coursera', badge: '⭐', year: '2023' },
  { title: 'Introduction to Machine Learning', issuer: 'NPTEL',    badge: '🔖', year: '2025', image:"images/certificates/mlnptel.png" },
  { title: 'Deloitte Job Simulation',   issuer: 'Forage',    badge: '🏆', year: '2025',image: "images/certificates/deloitte.png" },
];


  const ROTS          = [-3, 2.2, -1.8, 3.4, -2.6];
  const TXS           = [-10, 7, -5, 12, 0];
  const TYS           = [0, -5, 7, -3, 0];
  const CARD_SCROLL_PX = 140;
  const ENTRY_PX       = 120;

function initCertPile() {
  const pile   = document.getElementById('certPile');
  const dotsEl = document.getElementById('certDots');
  const hint   = document.getElementById('certHint');
  if (!pile) return;

  const cardEls = [];
  const dotEls  = [];
  let virtualScroll = 0;          // our own scroll counter, not window.scrollY
  const TOTAL_SCROLL = certs.length * CARD_SCROLL_PX;
  let isHovering = false;

  function lockScroll() {
  document.body.style.overflow = 'hidden';
  }

  function unlockScroll() {
  document.body.style.overflow = '';
  }
  /* Build cards — same as before */
  certs.forEach((c, i) => {
    const card = document.createElement('div');
    card.className = 'ccard';
    card.style.zIndex = i + 1;
    card.innerHTML = `
      <div class="ccard-inner">
      <div class="ccardimg-cont">
        <img class="ccard-img"  src=${c.image}>
      </div>
        <div class="cmeta">
          <div class="cbadge">${c.badge}</div>
          <span class="cissuer">${c.issuer} · ${c.year}</span>
        </div>
        <div class="ctitle">${c.title}</div>
        <div class="cbar"></div>
      </div>`;
    card.addEventListener('mouseenter', () => { card.style.zIndex = 20; });
    card.addEventListener('mouseleave', () => { card.style.zIndex = i + 1; });
    pile.appendChild(card);
    cardEls.push(card);

    const dot = document.createElement('span');
    dot.className = 'cdot';
    dotsEl.appendChild(dot);
    dotEls.push(dot);
  });

  /* Render cards based on virtualScroll instead of window.scrollY */
  function render() {
    let allLanded = true;

    certs.forEach((_, i) => {
      const card = cardEls[i];
      const dot  = dotEls[i];
      const rot  = ROTS[i];
      const tx   = TXS[i];
      const ty   = TYS[i];

      const windowStart = i * CARD_SCROLL_PX;
      const local       = virtualScroll - windowStart;

      if (local <= 0) {
        card.style.opacity   = '0';
        card.style.transform = `translate(${tx}px, -120%) rotate(0deg)`;
        card.classList.remove('landed');
        dot.classList.remove('lit');
        allLanded = false;
      } else if (local < ENTRY_PX) {
        const t = local / ENTRY_PX;
        const e = 1 - Math.pow(1 - t, 3);
        const y = -120 + (120 + ty) * e;
        card.style.opacity   = String(Math.min(1, t * 2));
        card.style.transform = `translate(${tx}px, ${y}%) rotate(${rot * e}deg)`;
        card.classList.remove('landed');
        dot.classList.remove('lit');
        allLanded = false;
      } else {
        card.style.opacity   = '1';
        card.style.transform = `translate(${tx}px, ${ty}px) rotate(${rot}deg)`;
        card.classList.add('landed');
        dot.classList.add('lit');
      }
    });

    if (hint) hint.classList.toggle('hidden', allLanded);
    return allLanded;
  }

  /* Wheel handler — hijacks scroll while hovering over the section */
  const pilearea = document.getElementById('certPile');
  

  pilearea.addEventListener('wheel', (e) => {
    const stackDone = virtualScroll >= TOTAL_SCROLL;
    const stackStart = virtualScroll <= 0;

    /* Let page scroll normally if:
       - scrolling UP and stack is already at start
       - scrolling DOWN and stack is already fully done */
    if ((e.deltaY > 0 && stackDone) || (e.deltaY < 0 && stackStart)) {
      unlockScroll();
      return;
    }

    /* Otherwise consume the wheel event for stacking */
    e.preventDefault();
    virtualScroll = Math.max(0, Math.min(TOTAL_SCROLL, virtualScroll + e.deltaY));
    render();

  }, { passive: false }); // passive:false so preventDefault works

  /* Lock/unlock page scroll on hover */
  section.addEventListener('mouseenter', () => {
    isHovering = true;
    lockScroll();
  });
  section.addEventListener('mouseleave', () => {
    isHovering = false;
    unlockScroll();
  });

  render(); // initial state
}

initCertPile();