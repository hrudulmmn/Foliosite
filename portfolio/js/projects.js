/* ── PROJECTS DATA ── */
const projects = [
  {
    name: 'CampusCart',
    desc: 'Campus marketplace with Razorpay integration, JWT auth & atomic stock management.',
    tags: ['React', 'Node.js', 'MongoDB', 'Razorpay'],
    icon: '🛒',
    grad: 'linear-gradient(135deg,#1a3a6e 0%,#0e5f6e 100%)',
    link: 'https://github.com/hrudulmmn/campusCart',
    video: "images/video/campuscart.mp4"
  },
  {
    name: 'Moodilist',
    desc: 'Mood-based music recommendation with ML model, FastAPI backend & Supabase.',
    tags: ['FastAPI', 'React', 'Supabase', 'ML'],
    icon: '🎵',
    grad: 'linear-gradient(135deg,#2a1a6e 0%,#6e1a5f 100%)',
    link: 'https://github.com/hrudulmmn/Moodilist',
    video: "images/video/moodilist.mp4"
  },
  {
    name: 'Kara',
    desc: 'Gesture-based PDF viewer using OpenCV & MediaPipe. Control docs with hand gestures and summarise pages with AI.',
    tags: ['Python', 'OpenCV', 'MediaPipe', 'PyQt6'],
    icon: '👋',
    grad: 'linear-gradient(135deg,#1a6e3a 0%,#5a6e1a 100%)',
    link: 'https://github.com/hrudulmmn/Kara',
    video: "images/video/kara.mp4"
  },
  {
    name: 'Tars Chat',
    desc: 'Real-time chat with typing indicators, reactions & online status using Convex.',
    tags: ['Next.js', 'TypeScript', 'Convex', 'Clerk'],
    icon: '💬',
    grad: 'linear-gradient(135deg,#1a4a6e 0%,#6e3a1a 100%)',
    link: 'https://github.com/hrudulmmn/Tarschat',
    video: "images/video/tarschat.mp4"
  },
];

/* ── BUILD CARD HTML ── */
function makeProjectCard(p) {
  const tags = p.tags.map(t => `<span class="ptag">${t}</span>`).join('');
  return `
    <div class="pcard">
      <div class="pcard-thumb" style="background:${p.grad}">
        <span class="pthumb-icon" style="position:relative;z-index:1;">${p.icon}</span>
        <video src="${p.video}" muted loop preload="metadata" playsinline class="pcard-video"></video>
      </div>
      <div class="pcard-body">
        <div class="pcard-name">${p.name}</div>
        <div class="pcard-desc">${p.desc}</div>
        <div class="ptags">${tags}</div>
        <div class="plinks">
          <a href="${p.link}" target="_blank" class="plink">GitHub →</a>
        </div>
      </div>
    </div>`;
}

/* ── ATTACH HOVER VIDEO LISTENERS ── */
function attachHoverListeners(container) {
  container.querySelectorAll('.pcard').forEach(card => {
    const video = card.querySelector('.pcard-video');
    const icon  = card.querySelector('.pthumb-icon');
    if (!video) return;
    card.addEventListener('mouseenter', () => {
      video.play();
      if (icon) icon.style.opacity = '0';
    });
    card.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
      if (icon) icon.style.opacity = '1';
    });
  });
}

/* ── DESKTOP STREAM ── */
function initProjectStream() {
  const track = document.getElementById('streamTrack');
  if (!track) return;

  const CARD_WIDTH  = 268;
  const CARD_GAP    = 22;
  const totalWidth  = projects.length * (CARD_WIDTH + CARD_GAP) - CARD_GAP;
  const fitsScreen  = totalWidth <= window.innerWidth - 80; // 80 = section padding

  if (fitsScreen) {
    // Cards fit — show as static centered row, no animation
    track.classList.add('no-scroll');
    track.innerHTML = projects.map(makeProjectCard).join('');
  } else {
    // Cards overflow — duplicate for seamless infinite loop
    track.classList.remove('no-scroll');
    track.innerHTML = [...projects, ...projects].map(makeProjectCard).join('');
    // Pause stream on hover so user can read cards
    track.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
    track.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
  }

  attachHoverListeners(track);
}

/* ── MOBILE SWIPE CAROUSEL ── */
function initSwipeCarousel() {
  const swipeTrack = document.getElementById('swipeTrack');
  const swipeDots  = document.getElementById('swipeDots');
  const swipeWrap  = document.getElementById('swipeWrap');
  if (!swipeTrack || !swipeDots || !swipeWrap) return;

  // Build cards
  swipeTrack.innerHTML = projects.map(makeProjectCard).join('');

  // Build dots
  swipeDots.innerHTML = '';
  projects.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'swipe-dot' + (i === 0 ? ' active' : '');
    swipeDots.appendChild(d);
  });

  // Scroll → update dots + play video of centered card
  swipeWrap.addEventListener('scroll', () => {
    const cards = swipeWrap.querySelectorAll('.pcard');
    if (!cards.length) return;

    const cardW = cards[0].offsetWidth + 16; // 16 = gap
    const idx   = Math.round(swipeWrap.scrollLeft / cardW);

    // Update active dot
    swipeDots.querySelectorAll('.swipe-dot')
      .forEach((d, i) => d.classList.toggle('active', i === idx));

    // Play centered card video, pause others
    cards.forEach((card, i) => {
      const vid = card.querySelector('.pcard-video');
      if (!vid) return;
      if (i === idx) {
        vid.play().catch(() => {});
        card.classList.add('playing');    // triggers CSS opacity via .playing class
      } else {
        vid.pause();
        vid.currentTime = 0;
        card.classList.remove('playing');
      }
    });
  }, { passive: true });
}

/* ── INIT ── */
initProjectStream();
initSwipeCarousel();