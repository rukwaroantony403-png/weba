const productFilters = document.querySelectorAll('.ps-filter');
const productCards = document.querySelectorAll('.ps-product');
const productCount = document.querySelector('.ps-result-count');

productFilters.forEach((filter) => {
  filter.addEventListener('click', () => {
    const selected = filter.dataset.filter;
    let visibleCount = 0;

    productFilters.forEach((button) => {
      const isActive = button === filter;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });

    productCards.forEach((card) => {
      const isVisible = selected === 'all' || card.dataset.category === selected;
      card.hidden = !isVisible;
      visibleCount += Number(isVisible);
    });

    const label = {
      generation: 'standby and prime power option',
      quiet: 'noise-control option',
      quality: 'voltage-stability option',
      mobile: 'mobile power option'
    }[selected];
    productCount.textContent = selected === 'all'
      ? `Showing all ${visibleCount} equipment options`
      : `Showing ${visibleCount} ${label}`;
  });
});