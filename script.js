document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll shrink + active link ── */
  const navbar   = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id], div[id="education"]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 160) current = sec.id;
    });
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
  }, { passive: true });

  /* ── Project filter tabs ── */
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('.project-card').forEach(card => {
        const tags = (card.dataset.tags || '').split(' ');
        card.classList.toggle('hidden', f !== 'all' && !tags.includes(f));
      });
    });
  });

  /* ── Project expand/collapse ── */
  document.querySelectorAll('.card-expand-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const detail = btn.nextElementSibling;
      const open   = detail.classList.toggle('open');
      btn.textContent = open ? '‹ Hide details' : '› Show details';
    });
  });

  /* ── Fade-up on scroll ── */
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 60);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.07 });
  document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));

});