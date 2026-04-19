/* ── PROJECTS DATA ── */
const projects = [
  {
    name: 'CampusCart',
    desc: 'Campus marketplace with Razorpay integration, JWT auth & atomic stock management.',
    tags: ['React', 'Node.js', 'MongoDB', 'Razorpay'],
    icon: '🛒',
    grad: 'linear-gradient(135deg,#1a3a6e 0%,#0e5f6e 100%)',
    link: 'https://github.com/hrudulmmn/campusCart'
  },
  {
    name: 'Moodilist',
    desc: 'Mood-based music recommendation with ML model, FastAPI backend & Supabase.',
    tags: ['FastAPI', 'React', 'Supabase', 'ML'],
    icon: '🎵',
    grad: 'linear-gradient(135deg,#2a1a6e 0%,#6e1a5f 100%)',
    link: 'https://github.com/hrudulmmn'
  },
  {
    name: 'Kara',
    desc: 'Gesture-based PDF viewer using OpenCV & MediaPipe. Control docs with hand gestures.',
    tags: ['Python', 'OpenCV', 'MediaPipe', 'PyQt6'],
    icon: '👋',
    grad: 'linear-gradient(135deg,#1a6e3a 0%,#5a6e1a 100%)',
    link: 'https://github.com/hrudulmmn'
  },
  {
    name: 'Tars Chat',
    desc: 'Real-time chat with typing indicators, reactions & online status using Convex.',
    tags: ['Next.js', 'TypeScript', 'Convex', 'Clerk'],
    icon: '💬',
    grad: 'linear-gradient(135deg,#1a4a6e 0%,#6e3a1a 100%)',
    link: 'https://github.com/hrudulmmn'
  },
  {
    name: 'OS Scheduler',
    desc: "Round Robin, Priority Scheduling with Aging & Banker's Algorithm implemented in C.",
    tags: ['C', 'OS', 'Algorithms'],
    icon: '⚙️',
    grad: 'linear-gradient(135deg,#3a1a6e 0%,#1a3a6e 100%)',
    link: 'https://github.com/hrudulmmn'
  },
];

/* ── BUILD CARD HTML ── */
function makeProjectCard(p) {
  const tags  = p.tags.map(t => `<span class="ptag">${t}</span>`).join('');
  return `
    <div class="pcard">
      <div class="pcard-thumb" style="background:${p.grad}">
        <span style="position:relative;z-index:1;">${p.icon}</span>
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

/* ── INIT STREAM ── */
function initProjectStream() {
  const track = document.getElementById('streamTrack');
  if (!track) return;

  // Duplicate cards for seamless infinite loop
  track.innerHTML = [...projects, ...projects].map(makeProjectCard).join('');

  // Pause whole stream on hover so user can interact
  track.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
  track.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
}

initProjectStream();
