/* ─── WHATSAPP ─── */
var WA_NUMBERS = ['543493495825', '543493440025'];

function getWALink(message) {
  var num = WA_NUMBERS[Math.random() < 0.5 ? 0 : 1];
  if (message) {
    return 'https://wa.me/' + num + '?text=' + encodeURIComponent(message);
  }
  return 'https://wa.me/' + num;
}

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded', function () {

  /* ── Floating WA button ── */
  var waFloat = document.getElementById('wa-float');
  if (waFloat) {
    waFloat.href = getWALink('');
  }

  /* ── Plan detail WA select button ── */
  var waSelect = document.getElementById('wa-select');
  if (waSelect) {
    var msg = waSelect.getAttribute('data-message') || '';
    waSelect.href = getWALink(msg);
  }

  /* ── Scroll animations (IntersectionObserver) ── */
  var animEls = document.querySelectorAll('.animate-in');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    animEls.forEach(function (el) { observer.observe(el); });
  } else {
    /* Fallback: show all immediately */
    animEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ── Hero bg subtle parallax / load trigger ── */
  var heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    setTimeout(function () { heroBg.classList.add('loaded'); }, 100);
  }

  /* ── Sticky header shrink ── */
  var header = document.getElementById('header');
  function onScroll() {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 60);
    }
    highlightNav();
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Active nav pill ── */
  function highlightNav() {
    var sections = document.querySelectorAll('section[id]');
    var scrollY = window.scrollY + 120;
    var current = '';
    sections.forEach(function (sec) {
      if (scrollY >= sec.offsetTop) current = sec.id;
    });
    document.querySelectorAll('nav ul li a').forEach(function (a) {
      var href = a.getAttribute('href');
      a.classList.toggle('active', href === '#' + current);
    });
  }

  /* ── Mobile menu toggle ── */
  var toggle = document.getElementById('menu-toggle');
  var navList = document.getElementById('nav-list');

  if (toggle && navList) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('open');
      navList.classList.toggle('open');
      document.body.style.overflow = navList.classList.contains('open') ? 'hidden' : '';
    });

    navList.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('open');
        navList.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var id = anchor.getAttribute('href').slice(1);
      if (!id) return;
      var target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
