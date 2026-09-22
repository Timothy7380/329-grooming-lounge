/* =============================================================================
   Legends Barbershop — interactions
   Scroll reveals, FAQ accordion, marquee sizing, hero video guard.
   ========================================================================== */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------- reveal on scroll -- */
  var revealables = document.querySelectorAll('.reveal');

  if (reduced || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    revealables.forEach(function (el, i) {
      // Stagger siblings slightly so rows animate in sequence, as on the original.
      var parent = el.parentElement;
      var sibs = parent ? Array.prototype.filter.call(parent.children, function (c) {
        return c.classList && c.classList.contains('reveal');
      }) : [];
      var idx = sibs.indexOf(el);
      if (idx > 0) el.style.transitionDelay = Math.min(idx * 90, 360) + 'ms';
      io.observe(el);
    });
  }

  /* --------------------------------------------------------- FAQ accordion -- */
  var items = Array.prototype.slice.call(document.querySelectorAll('.faq__item'));

  function collapse(item) {
    var panel = item.querySelector('.faq__a');
    if (!panel) { item.open = false; return; }
    var start = panel.scrollHeight;
    panel.style.height = start + 'px';
    requestAnimationFrame(function () {
      panel.style.transition = 'height .38s cubic-bezier(.22,1,.36,1)';
      panel.style.height = '0px';
    });
    panel.addEventListener('transitionend', function done() {
      panel.removeEventListener('transitionend', done);
      panel.style.transition = '';
      panel.style.height = '';
      item.open = false;
    });
  }

  function expand(item) {
    var panel = item.querySelector('.faq__a');
    item.open = true;
    if (!panel) return;
    var target = panel.scrollHeight;
    panel.style.height = '0px';
    requestAnimationFrame(function () {
      panel.style.transition = 'height .38s cubic-bezier(.22,1,.36,1)';
      panel.style.height = target + 'px';
    });
    panel.addEventListener('transitionend', function done() {
      panel.removeEventListener('transitionend', done);
      panel.style.transition = '';
      panel.style.height = '';
    });
  }

  items.forEach(function (item) {
    var summary = item.querySelector('.faq__q');
    if (!summary) return;
    summary.addEventListener('click', function (e) {
      e.preventDefault();
      var isOpen = item.open;
      // Single-open accordion, matching the original.
      items.forEach(function (other) {
        if (other !== item && other.open) reduced ? (other.open = false) : collapse(other);
      });
      if (isOpen) { reduced ? (item.open = false) : collapse(item); }
      else        { reduced ? (item.open = true)  : expand(item); }
    });
  });

  /* ------------------------------------------------------------- marquees -- */
  // Each .marquee holds two identical tracks; the animation translates one full
  // track width, so the loop is seamless regardless of content width.
  document.querySelectorAll('.marquee').forEach(function (m) {
    var tracks = m.querySelectorAll('.marquee__track');
    if (tracks.length < 2) return;
    var dur = getComputedStyle(m).getPropertyValue('--marquee-dur').trim() || '30s';
    tracks.forEach(function (t) { t.style.animationDuration = dur; });
  });

  /* --------------------------------------------------------- mobile menu -- */
  var menuBtn = document.querySelector('.nav__menu');
  var menu = document.getElementById('mobile-menu');

  if (menuBtn && menu) {
    var lastFocus = null;

    var openMenu = function () {
      lastFocus = document.activeElement;
      menu.hidden = false;
      // let the browser paint the hidden state before transitioning in
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { menu.classList.add('is-open'); });
      });
      document.body.classList.add('mnav-open');
      menuBtn.setAttribute('aria-expanded', 'true');
      var first = menu.querySelector('.mnav__close');
      if (first) first.focus();
    };

    var closeMenu = function () {
      menu.classList.remove('is-open');
      document.body.classList.remove('mnav-open');
      menuBtn.setAttribute('aria-expanded', 'false');
      var done = function () { menu.hidden = true; };
      if (reduced) { done(); }
      else {
        var panel = menu.querySelector('.mnav__panel');
        var fired = false;
        var once = function () { if (!fired) { fired = true; done(); } };
        panel.addEventListener('transitionend', once, { once: true });
        setTimeout(once, 400);
      }
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    };

    menuBtn.addEventListener('click', function () {
      if (menu.hidden) openMenu(); else closeMenu();
    });

    menu.addEventListener('click', function (e) {
      if (e.target.closest('[data-close]')) { closeMenu(); return; }
      // an in-page anchor should close the overlay so the target is visible
      var link = e.target.closest('a[href^="#"]');
      if (link) closeMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hidden) closeMenu();
    });

    // Leaving the mobile range with the panel open would strand it on screen.
    var mq = window.matchMedia('(min-width: 1440px)');
    var onChange = function (ev) { if (ev.matches && !menu.hidden) closeMenu(); };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }

  /* ------------------------------------------------------- review swipe -- */
  var reviewTrack = document.getElementById('reviewTrack');
  if (reviewTrack) {
    var reviewBtns = document.querySelectorAll('.review-nav__btn');
    reviewBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var card = reviewTrack.querySelector('.review-card');
        var step = card ? card.getBoundingClientRect().width + 16 : 300;
        reviewTrack.scrollBy({ left: step * Number(btn.dataset.dir), behavior: 'smooth' });
      });
    });
    var updateReviewNav = function () {
      var atStart = reviewTrack.scrollLeft <= 4;
      var atEnd = reviewTrack.scrollLeft >= reviewTrack.scrollWidth - reviewTrack.clientWidth - 4;
      reviewBtns.forEach(function (btn) {
        btn.disabled = (btn.dataset.dir === '-1' && atStart) || (btn.dataset.dir === '1' && atEnd);
      });
    };
    reviewTrack.addEventListener('scroll', updateReviewNav);
    window.addEventListener('resize', updateReviewNav);
    updateReviewNav();
  }

  /* ---------------------------------------------------------- hero video -- */
  var video = document.querySelector('.hero__video');
  if (video) {
    video.muted = true;
    video.setAttribute('muted', '');
    var play = video.play();
    if (play && typeof play.catch === 'function') {
      play.catch(function () {
        // Autoplay blocked — start on the first interaction instead.
        var kick = function () {
          video.play().catch(function () {});
          window.removeEventListener('pointerdown', kick);
          window.removeEventListener('touchstart', kick);
        };
        window.addEventListener('pointerdown', kick, { once: true });
        window.addEventListener('touchstart', kick, { once: true });
      });
    }
  }
})();
