// Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const navList = document.getElementById('navList');

menuBtn.addEventListener('click', () => {
  const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
  menuBtn.setAttribute('aria-expanded', String(!expanded));
  navList.classList.toggle('open');
  // Simple animation: slide
  if (navList.classList.contains('open')) {
    navList.style.display = 'flex';
    navList.style.flexDirection = 'column';
    navList.style.position = 'absolute';
    navList.style.right = '18px';
    navList.style.top = '62px';
    navList.style.background = 'rgba(8,10,12,0.9)';
    navList.style.padding = '12px';
    navList.style.borderRadius = '10px';
    navList.style.gap = '10px';
  } else {
    navList.style.display = '';
    navList.style.position = '';
    navList.style.right = '';
    navList.style.top = '';
    navList.style.background = '';
    navList.style.padding = '';
    navList.style.borderRadius = '';
    navList.style.gap = '';
  }
});

// Intersection Observer for smooth fade (no sudden pop)
const ioOptions = { root: null, rootMargin: '0px', threshold: 0.12 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      // optional: unobserve to keep performance
      observer.unobserve(entry.target);
    }
  });
}, ioOptions);

// observe all sections & key elements
document.querySelectorAll('.section, .card, .profile-frame').forEach(el => observer.observe(el));

// Improve internal anchor scrolling offset for fixed nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e){
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
      e.preventDefault();
      const navHeight = document.querySelector('.nav-wrap').offsetHeight;
      const y = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 12;
      window.scrollTo({ top: y, behavior: 'smooth' });
      // close mobile menu if open
      if(navList.classList.contains('open')){
        navList.classList.remove('open');
        menuBtn.setAttribute('aria-expanded','false');
        // reset inline styles (same as toggle handler)
        navList.style.display = '';
        navList.style.position = '';
        navList.style.right = '';
        navList.style.top = '';
        navList.style.background = '';
        navList.style.padding = '';
        navList.style.borderRadius = '';
        navList.style.gap = '';
      }
    }
  });
});
