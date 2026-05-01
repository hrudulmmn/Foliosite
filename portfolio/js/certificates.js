const certs = [
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
    card.addEventListener('click',()=>{
      if(c.image){
      window.open(c.image,'_blank');
      }
    });
    pile.appendChild(card);
    cardEls.push(card);

    const dot = document.createElement('span');
    dot.className = 'cdot';
    dotsEl.appendChild(dot);
    dotEls.push(dot);
  });

  const certRows = document.getElementById('certRows');
  certs.forEach((c,i)=>{
    const row = document.createElement('div');
    row.className = 'cert-row-card';
    row.innerHTML = `
      <div class="cert-row-badge">${c.badge}</div>
    <div class="cert-row-info">
      <div class="cert-row-title">${c.title}</div>
      <div class="cert-row-issuer">${c.issuer} · ${c.year}</div>
        <span class="cert-row-status-done">✓ Verified</span>
    </div>
    <div class="cert-row-arrow">›</div>`;    

    row.addEventListener('click',()=>openModal(c));
    certRows.appendChild(row);
  });

const modal=document.getElementById('certModal');
const modalImg=document.getElementById('certModalImg');
const modalTitle=document.getElementById('certModalTitle');
const modalIssuer=document.getElementById('certModalIssuer');
const modalDetails=document.getElementById('certModalDetails');
const modalActions=document.getElementById('certModalActions');
const modalNote=document.getElementById('certModalNote');
const modalClose=document.getElementById('certModalClose');

function openModal(c){
  if(c.image){
    modalImg.src=c.image;
    modalImg.style.display='block';
  } else {
    modalImg.style.display='none';
  }
  modalTitle.textContent=c.title;
  modalIssuer.textContent=`${c.issuer} · ${c.year}`;
    modalActions.innerHTML=`
      ${c.verifyUrl?`<a href="" target="_blank" class="cert-modal-btn primary">🔗 Verify Certificate</a>`:''}
      ${c.image?`<button class="cert-modal-btn secondary" onclick="window.open('${c.image}','_blank')">🔍 Full Image</button>`:''}`;
    modalNote.style.display='none';
  modal.classList.add('open');
  document.body.style.overflow='hidden';
}

function closeCertModal(){
  modal.classList.remove('open');
  document.body.style.overflow='';
}
modalClose.addEventListener('click',closeCertModal);
modal.addEventListener('click',e=>{if(e.target===modal)closeCertModal();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeCertModal();});


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