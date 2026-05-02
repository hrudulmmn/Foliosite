/* ══════════════════════════════════════════
   SERVICES DATA
   category: 'web' | 'ml' | 'cv'
   For recruiter context — desc explains the skill
   For client context  — deliverables explain the outcome
══════════════════════════════════════════ */
const services = [
    {
      category:"web",
      name: 'Full-Stack Web Apps',
      icon: '⚡',
      desc: 'Modern, responsive web applications built end-to-end — from real-time chat systems to college marketplaces. React frontend with Node.js, FastAPI, or Convex on the backend.',
      deliverables: [
        'Responsive React UI with smooth UX',
        'REST or real-time backend (FastAPI / Node.js / Convex)',
        'Authentication & role-based access (Clerk / JWT)',
        'Database design and integration',
        'Deployment-ready, documented codebase',
      ],
      tags: ['React', 'FastAPI', 'Node.js', 'Convex', 'Clerk', 'MongoDB', 'SQL'],
      delivery: '2–4 weeks',
    },
    {
      category: "ml",
      name: 'AI & ML Integration',
      icon: '🧠',
      desc: 'Add intelligence to your product — emotion detection from voice, mood-adaptive recommendations, and custom ML pipelines. Models built for production, not just notebooks.',
      deliverables: [
        'Custom ML model training and evaluation',
        'Voice / audio feature extraction (MFCCs)',
        'Sliding-window inference for real-world robustness',
        'FastAPI endpoint to serve predictions',
        'React frontend to consume and display results',
      ],
      tags: ['Python', 'Scikit-learn', 'TensorFlow', 'Librosa', 'FastAPI', 'React'],
      delivery: '3–5 weeks',
    },
    {
      category:"cv",
      name: 'Computer Vision Solutions',
      icon: '👁️',
      desc: 'Real-time gesture recognition, hands-free interfaces, and video processing pipelines. Optimised for performance — <100ms latency and ~60 FPS under load.',
      deliverables: [
        'Gesture detection and classification pipeline',
        'Hands-free UI controls (swipe, pinch, zoom)',
        'Multi-threaded video processing for ~60 FPS',
        'False-trigger reduction (~70% improvement)',
        'Desktop app packaging with PyQt6',
      ],
      tags: ['Python', 'OpenCV', 'MediaPipe', 'PyQt6', 'Multithreading'],
      delivery: '1–3 weeks',
    },
    {
      category:"mvp",
      name: 'Rapid MVP Prototypes',
      icon: '🚀',
      desc: 'Need to validate an idea fast? I build working prototypes in days — not months. Clean enough to demo to investors or clients, functional enough to test with real users.',
      deliverables: [
        'Core feature implementation (no fluff)',
        'Basic auth and user flows',
        'Mobile-responsive UI',
        'Live deployment (Vercel / Render)',
        'Handoff-ready code with documentation',
      ],
      tags: ['React', 'FastAPI', 'Node.js', 'MongoDB', 'Vercel'],
      delivery: '~1 week',
    },
  ];

/* ══════════════════════════════════════════
   BUILD CARD
══════════════════════════════════════════ */
services.forEach(s=>{
  const grid = document.getElementById('servGrid');
  const deliverables = s.deliverables
    .map(d => `<li>${d}</li>`)
    .join('');

  const tagitems = s.tags.map(d => `<span class="serv-tag">${d}</span>`).join('');

  const card  = document.createElement('div');
  card.innerHTML=`
    <div class="serv-card visible">
      <span class="serv-badge ${s.icon}">
      </span>
      <span class="delivery">⏱ ${s.delivery}</span>
      <div class="serv-name">${s.name}</div>
      <p class="serv-desc">${s.desc}</p>
      <ul class="serv-list">${deliverables}</ul>
      <div class="serv-tags">${tagitems}</div>
    </div>`;
    grid.appendChild(card);
});

/* ══════════════════════════════════════════
   INIT GRID
══════════════════════════════════════════ */
