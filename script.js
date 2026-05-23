// =============================================
//  PRO ECOLOGIST — JAVASCRIPT
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- NAVBAR SCROLL ----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ---- HAMBURGER MENU ----
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    const isOpen = navLinks.classList.contains('open');
    spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity   = isOpen ? '0' : '1';
    spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity   = '1';
      });
    });
  });

  // ---- SCROLL REVEAL ----
  const revealEls = document.querySelectorAll(
    '.section-header, .quienes-text, .quienes-cards, .service-card, ' +
    '.mas-text, .mas-images, .beneficios-left, .beneficios-right, ' +
    '.exp-card, .contact-card, .mas-item, .benefit-card, .stat-item, ' +
    '.footer-brand, .footer-links-col, .footer-contact-col'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, entry.target.dataset.delay ? parseInt(entry.target.dataset.delay) : 0);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  // Assign reveal classes and staggered delays
  revealEls.forEach((el, i) => {
    el.classList.add('reveal');
    el.dataset.delay = (i % 4) * 80;
    observer.observe(el);
  });

  // Left/right reveal for paired sections
  const quienesText = document.querySelector('.quienes-text');
  const quienesCards = document.querySelector('.quienes-cards');
  if (quienesText) quienesText.classList.replace('reveal', 'reveal-left');
  if (quienesCards) quienesCards.classList.replace('reveal', 'reveal-right');

  const masText = document.querySelector('.mas-text');
  const masImages = document.querySelector('.mas-images');
  if (masText) masText.classList.replace('reveal', 'reveal-left');
  if (masImages) masImages.classList.replace('reveal', 'reveal-right');

  const bLeft = document.querySelector('.beneficios-left');
  const bRight = document.querySelector('.beneficios-right');
  if (bLeft) bLeft.classList.replace('reveal', 'reveal-left');
  if (bRight) bRight.classList.replace('reveal', 'reveal-right');

  // Re-observe after class change
  document.querySelectorAll('.reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
  });

  // ---- SERVICE CARDS STAGGER ----
  document.querySelectorAll('.service-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 80}ms`;
  });

  // ---- EXP CARDS STAGGER ----
  document.querySelectorAll('.exp-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 100}ms`;
  });

  // ---- SMOOTH ACTIVE NAV LINK ----
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

  // ---- FLOATING CTA HIDE ON HERO ----
  const floatingCta = document.getElementById('floating-cta');
  const heroSection = document.getElementById('hero');

  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      floatingCta.style.opacity = entry.isIntersecting ? '0' : '1';
      floatingCta.style.pointerEvents = entry.isIntersecting ? 'none' : 'all';
    });
  }, { threshold: 0.3 });

  heroObserver.observe(heroSection);

  // ---- COUNTER ANIMATION ----
  function animateCounter(el, target, duration = 2000, suffix = '') {
    const start = performance.now();
    const update = (time) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target + suffix;
    };
    requestAnimationFrame(update);
  }

  // Years counter in hero
  const yearsNumberEl = document.querySelector('.years-number');
  if (yearsNumberEl) {
    const yearsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(yearsNumberEl, 35, 1800, '+');
          yearsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    yearsObserver.observe(yearsNumberEl);
  }

  // ---- NAV ACTIVE STYLE ----
  const styleEl = document.createElement('style');
  styleEl.textContent = `.nav-links a.active { color: var(--green-300) !important; }`;
  document.head.appendChild(styleEl);

  console.log('🌿 Pro Ecologist website loaded successfully!');
});
