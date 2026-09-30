const signatureFont = document.createElement('link');
signatureFont.rel = 'stylesheet';
signatureFont.href = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500;600&display=swap';
document.head.appendChild(signatureFont);

const hero = document.querySelector('.home-hero');

if (hero) {
  const slides = [
    {
      label: 'WELCOME TO ACTIVE POWER LTD',
      title: '<span>Stand-by Power Solutions</span><br>across <em>East Africa</em>',
      points: ['Reliable. Efficient. Always On.', 'Customized power systems for your operation', 'Equipment, installation and ongoing support'],
      outcome: 'Reliable power, ready when you need it',
      cta: 'Explore our solutions',
      href: 'products.html',
      icon: '⚡'
    },
    {
      label: 'GENERATOR SETS / 5 KVA TO 2,500 KVA',
      title: 'The right power<br><em>for every demand.</em>',
      points: ['Diesel and petrol generator sets', 'Cummins, Perkins and Doosan engine options', 'Soundproof canopies for quieter operation'],
      outcome: 'Configured for your site and load',
      cta: 'View generator range',
      href: 'products.html',
      icon: '⚡'
    },
    {
      label: 'INTEGRATED SOLUTIONS / EAST AFRICA',
      title: 'Power, planned<br><em>around you.</em>',
      points: ['Automatic Voltage Regulators for stable output', 'Mobile trailer sets for flexible power', 'Tailor-made projects from specification to commissioning'],
      outcome: 'One partner from planning to power-on',
      cta: 'Plan a project',
      href: 'contact.html',
      icon: '↗'
    },
    {
      label: 'TECHNICAL SUPPORT / 24 HOURS',
      title: 'Keep operations<br><em>ready to run.</em>',
      points: ['24/7 technical support and scheduled maintenance', 'Genuine spare parts and responsive service', 'Support for your power system throughout its life'],
      outcome: 'Dependable support when it matters',
      cta: 'Explore our services',
      href: 'services.html',
      icon: '✓'
    }
  ];

  const content = hero.querySelector('.hero-grid');
  const controls = document.createElement('div');
  controls.className = 'hero-controls';
  controls.innerHTML = `<button type="button" class="hero-control hero-prev" aria-label="Previous slide">←</button><button type="button" class="hero-control hero-next" aria-label="Next slide">→</button><span class="hero-counter" aria-live="polite">01 / ${String(slides.length).padStart(2, '0')}</span>`;
  hero.appendChild(controls);

  const mobileCta = document.createElement('div');
  mobileCta.className = 'mobile-cta-bar';
  mobileCta.innerHTML = '<a href="contact.html"><span class="mobile-cta-icon">↗</span><span class="mobile-cta-text">Recover overdue accounts</span></a>';
  document.body.appendChild(mobileCta);

  const quickActions = document.createElement('div');
  quickActions.className = 'mobile-quick-actions';
  quickActions.innerHTML = '<a href="products.html"><div class="tile-icon">⚡</div><span>Generators</span></a><a href="products.html"><div class="tile-icon">◈</div><span>AVRs</span></a><a href="services.html"><div class="tile-icon">◷</div><span>Service</span></a><a href="contact.html"><div class="tile-icon">↗</div><span>Contact</span></a>';
  hero.insertAdjacentElement('afterend', quickActions);

  const render = (slide, index) => {
    content.innerHTML = `<div class="hero-slide-content"><p class="hero-kicker">${slide.label}</p><h1>${slide.title}</h1><p class="hero-slide-intro">Stand-by Power Solutions across East Africa.</p><ul class="hero-slide-points">${slide.points.map(point => `<li>${point}</li>`).join('')}</ul><p class="hero-outcome"><strong>Our promise:</strong> ${slide.outcome}</p><div class="hero-actions"><a class="home-btn" href="${slide.href}">${slide.cta} &nbsp;→</a><a class="hero-text-link" href="services.html">24/7 technical support <b>→</b></a></div></div><div class="hero-proof"><div><i data-lucide="zap"></i><span><b>Stand-by power specialists</b>Integrated power solutions</span></div><div><i data-lucide="map-pin"></i><span><b>East Africa</b>Local support, regional reach</span></div></div>`;
    hero.dataset.slide = index + 1;
    const ctaLink = mobileCta.querySelector('a');
    if (ctaLink) {
      ctaLink.href = slide.href;
      ctaLink.querySelector('.mobile-cta-icon').textContent = slide.icon;
      ctaLink.querySelector('.mobile-cta-text').textContent = slide.cta;
    }
    if (window.lucide) window.lucide.createIcons({ attrs: { 'stroke-width': 2.7 } });
    if (window.innerWidth <= 800) {
      const mobileBtn = hero.querySelector('.home-btn');
      if (mobileBtn) {
        mobileBtn.setAttribute('aria-label', slide.cta);
      }
    }
  };

  let current = 0;
  let playing = true;
  let timer;
  let touchStartX = 0;
  let touchEndX = 0;

  const advance = (direction = 1) => {
    current = (current + direction + slides.length) % slides.length;
    hero.classList.add('is-changing');
    window.setTimeout(() => {
      render(slides[current], current);
      controls.querySelector('.hero-counter').textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
      hero.classList.remove('is-changing');
    }, 220);
  };

  const resetTimer = () => {
    window.clearInterval(timer);
    if (playing) timer = window.setInterval(() => advance(), 10000);
  };

  const handleTouchStart = (event) => {
    touchStartX = event.changedTouches[0].screenX;
  };

  const handleTouchEnd = (event) => {
    touchEndX = event.changedTouches[0].screenX;
    const distance = touchStartX - touchEndX;
    if (Math.abs(distance) > 45 && window.innerWidth <= 800) {
      advance(distance > 0 ? 1 : -1);
      resetTimer();
    }
  };

  render(slides[current], current);
  controls.querySelector('.hero-prev').addEventListener('click', () => { advance(-1); resetTimer(); });
  controls.querySelector('.hero-next').addEventListener('click', () => { advance(); resetTimer(); });
  hero.addEventListener('touchstart', handleTouchStart, { passive: true });
  hero.addEventListener('touchend', handleTouchEnd, { passive: true });
  resetTimer();
}
