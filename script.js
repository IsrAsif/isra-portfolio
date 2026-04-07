// ============================================
//   ISRA ASIF — PORTFOLIO SCRIPTS
// ============================================

// === PRELOADER ===
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('hide');
    setTimeout(() => preloader.style.display = 'none', 600);
  }, 900);

  document.getElementById('year').textContent = new Date().getFullYear();
  updateTime();
  setInterval(updateTime, 1000);
});

// === LOCAL TIME (PKT = UTC+5) ===
function updateTime() {
  const el = document.getElementById('local-time');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleTimeString('en-US', {
    timeZone: 'Asia/Karachi',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}

// === DARK MODE ===
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  html.classList.add('dark');
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
  html.classList.remove('dark');
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

themeToggle.addEventListener('click', () => {
  html.classList.toggle('dark');
  if (html.classList.contains('dark')) {
    localStorage.theme = 'dark';
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    localStorage.theme = 'light';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
});

// === MOBILE MENU ===
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu    = document.getElementById('mobile-menu');
const closeMenuBtn  = document.getElementById('close-menu');
const mobileLinks   = document.querySelectorAll('.mobile-link');

function openMobileMenu() {
  mobileMenu.style.opacity = '1';
  mobileMenu.style.pointerEvents = 'auto';
}
function closeMobileMenu() {
  mobileMenu.style.opacity = '0';
  mobileMenu.style.pointerEvents = 'none';
}

mobileMenuBtn.addEventListener('click', openMobileMenu);
closeMenuBtn.addEventListener('click', closeMobileMenu);
mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

// === SCROLL TO TOP & SCROLL SPY ===
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
const sections = document.querySelectorAll('.section-spy');
const navLinks  = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  // Scroll to top button
  if (window.scrollY > 400) {
    scrollToTopBtn.classList.remove('translate-y-20', 'opacity-0');
  } else {
    scrollToTopBtn.classList.add('translate-y-20', 'opacity-0');
  }

  // Scroll spy
  let current = '';
  sections.forEach(section => {
    if (pageYOffset >= section.offsetTop - 220) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('text-primary', 'font-bold');
    link.classList.add('text-slate-600', 'dark:text-slate-400');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('text-primary', 'font-bold');
      link.classList.remove('text-slate-600');
    }
  });
});

scrollToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// === PROJECT FILTER ===
const filterBtns = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');

    projectItems.forEach(item => {
      const cats = item.getAttribute('data-filter-category').split(' ');
      if (filter === 'all' || cats.includes(filter)) {
        item.style.display = 'block';
        item.classList.add('is-visible');
      } else {
        item.style.display = 'none';
        item.classList.remove('is-visible');
      }
    });
  });
});

// === 3D TILT ON PROJECT CARDS ===
if (window.matchMedia('(min-width: 768px)').matches) {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const cx = r.width / 2, cy = r.height / 2;
      const rx = ((y - cy) / cy) * -4;
      const ry = ((x - cx) / cx) * 4;
      card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)';
    });
  });
}

// === PROJECT MODAL ===
const modal         = document.getElementById('project-modal');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalContent  = document.getElementById('modal-content');
const closeModalBtn = document.getElementById('close-modal');

function openModal(data) {
  document.getElementById('modal-title').textContent    = data.title;
  document.getElementById('modal-category').textContent = data.category;
  document.getElementById('modal-desc').textContent     = data.desc;
  document.getElementById('modal-year').textContent     = data.year;

  // Modal header — real screenshot or gradient fallback
  const imgWrap = document.getElementById('modal-img-wrap');
  if (data.preview) {
    imgWrap.innerHTML = `<img src="${data.preview}" alt="${data.title}" style="display:block; width:100%; max-height:400px; object-fit:cover; object-position:top;">`;
  } else {
    imgWrap.innerHTML = `<div class="h-56 md:h-72 flex items-center justify-center bg-gradient-to-br from-indigo-500/20 to-purple-500/20"><i class="fas fa-code text-8xl text-primary/30"></i></div>`;
  }
  const techContainer = document.getElementById('modal-tech');
  techContainer.innerHTML = '';
  data.tech.split(',').forEach(t => {
    const span = document.createElement('span');
    span.className = 'px-3 py-1 bg-slate-100 dark:bg-white/10 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300';
    span.textContent = t.trim();
    techContainer.appendChild(span);
  });

  modal.classList.remove('hidden');
  requestAnimationFrame(() => {
    modalBackdrop.classList.remove('opacity-0');
    modalContent.classList.remove('scale-95', 'opacity-0');
    modalContent.classList.add('scale-100', 'opacity-100');
  });
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalBackdrop.classList.add('opacity-0');
  modalContent.classList.remove('scale-100', 'opacity-100');
  modalContent.classList.add('scale-95', 'opacity-0');
  setTimeout(() => {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }, 300);
}

document.querySelectorAll('.project-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    openModal({
      title:    trigger.dataset.title,
      category: trigger.dataset.category,
      desc:     trigger.dataset.desc,
      tech:     trigger.dataset.tech,
      year:     trigger.dataset.year,
      preview:  trigger.dataset.modalImg || trigger.dataset.preview || '',
    });
  });
});

closeModalBtn.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// === TOAST NOTIFICATION ===
const toastContainer = document.getElementById('toast-container');

function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  const icon  = type === 'success' ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-exclamation-circle"></i>';
  const color = type === 'success' ? 'bg-slate-900 text-white dark:bg-white dark:text-black' : 'bg-red-500 text-white';
  toast.className = `flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl font-medium text-sm toast-enter toast-enter-active ${color} pointer-events-auto`;
  toast.innerHTML = `${icon}<span>${message}</span>`;
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.classList.remove('toast-enter-active');
    toast.classList.add('toast-exit-active');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const orig = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-circle-notch animate-spin mr-2"></i>Sending...';
  btn.disabled = true;
  setTimeout(() => {
    showToast('Message sent! I\'ll get back to you soon. ✨');
    e.target.reset();
    btn.innerHTML = orig;
    btn.disabled = false;
  }, 1500);
});

// === SCROLL REVEAL ===
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal-on-scroll').forEach(el => revealObserver.observe(el));

// === MAGNETIC BUTTONS ===
if (window.matchMedia('(min-width: 768px)').matches) {
  document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width  / 2;
      const y = e.clientY - r.top  - r.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0,0)';
    });
  });
}

// === SPOTLIGHT EFFECT ===
document.querySelectorAll('.spotlight-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - r.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - r.top}px`);
  });
});

// === SMOOTH SCROLL (anchor links) ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = document.querySelector('header').offsetHeight + 16;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      closeMobileMenu();
    }
  });
});