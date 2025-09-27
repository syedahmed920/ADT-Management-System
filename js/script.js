// Navbar hamburger toggle
(function(){
  const hamburger = document.querySelector('.hamburger');
  const nav = document.getElementById('nav-links');
  if(hamburger && nav){
    hamburger.addEventListener('click', ()=>{
      const open = nav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(open));
    });
  }
})();

// Reveal on scroll
(function(){
  const sections = document.querySelectorAll('.reveal, .tables');
  if(!('IntersectionObserver' in window)){
    sections.forEach(s=>s.classList.add('in-view'));
    return;
  }
  const io = new IntersectionObserver((entries)=>{
    for(const e of entries){
      if(e.isIntersecting){
        e.target.classList.add('in-view');
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.15 });
  sections.forEach(s=> io.observe(s));
})();

// Modal handling
(function(){
  const openModal = (id)=>{
    const modal = document.querySelector(id);
    if(!modal) return;
    modal.classList.remove('closing');
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
  };
  const closeModal = (modal)=>{
    if(!modal) return;
    modal.classList.add('closing');
    modal.setAttribute('aria-hidden','true');
    setTimeout(()=>{ modal.classList.remove('open','closing'); }, 210);
  };

  // Open from cards
  document.querySelectorAll('.card.clickable[data-modal]').forEach(card=>{
    card.addEventListener('click', ()=>{
      const id = card.getAttribute('data-modal');
      openModal(id);
    });
  });

  // Close buttons
  document.querySelectorAll('.modal [data-close]').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const modal = e.target.closest('.modal');
      closeModal(modal);
    });
  });

  // Click outside content to close
  document.querySelectorAll('.modal').forEach(modal=>{
    modal.addEventListener('click', (e)=>{
      if(e.target === modal){ closeModal(modal); }
    });
  });

  // ESC to close
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape'){
      document.querySelectorAll('.modal.open').forEach(m=> closeModal(m));
    }
  });
})();

// ------------------------------------------------------------------------------ GSAP Animations -----------------------------------------------------------------------------

let tl = gsap.timeline();

tl.from(".brand",{
  y: -100,
  opacity: 0,
  delay: 0.3,
})