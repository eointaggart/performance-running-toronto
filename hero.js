'use strict';
(() => {
  const gallery = document.querySelector('.hero-gallery');
  if (!gallery) return;
  const slides = [...gallery.querySelectorAll('.hero-slide')];
  const controls = gallery.querySelector('.hero-gallery-controls');
  const pauseButton = gallery.querySelector('[data-hero-pause]');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let paused = motion.matches || Boolean(navigator.connection?.saveData);
  let hovering = false;
  let timer;
  controls.hidden = false;
  function suspended() {
    return paused || hovering || document.hidden || gallery.contains(document.activeElement);
  }
  function sync() {
    clearTimeout(timer);
    slides.forEach((slide, i) => {
      const video = slide.querySelector('video');
      if (!video) return;
      if (i !== current || paused || document.hidden) { video.pause(); return; }
      const source = video.querySelector('source');
      if (!source.src) { source.src = source.dataset.src; video.load(); }
      video.play().catch(() => {}); // The poster remains visible if autoplay is unavailable.
    });
    pauseButton.textContent = paused ? 'Play' : 'Pause';
    pauseButton.setAttribute('aria-label', paused ? 'Play slideshow and videos' : 'Pause slideshow and videos');
    if (!suspended()) timer = setTimeout(() => show(current + 1), slides[current].querySelector('video') ? 10000 : 6500);
  }
  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== current; });
    gallery.querySelector('[data-hero-count]').textContent = `${current + 1} / ${slides.length}`;
    sync();
  }
  gallery.querySelector('[data-hero-prev]').addEventListener('click', () => show(current - 1));
  gallery.querySelector('[data-hero-next]').addEventListener('click', () => show(current + 1));
  pauseButton.addEventListener('click', () => { paused = !paused; sync(); });
  gallery.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault(); show(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  gallery.addEventListener('mouseenter', () => { hovering = true; sync(); });
  gallery.addEventListener('mouseleave', () => { hovering = false; sync(); });
  gallery.addEventListener('focusin', sync);
  gallery.addEventListener('focusout', () => setTimeout(sync, 0));
  document.addEventListener('visibilitychange', sync);
  motion.addEventListener('change', () => { paused = motion.matches; sync(); });
  sync();
})();
