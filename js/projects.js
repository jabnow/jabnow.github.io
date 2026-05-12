(() => {
  const buttons = Array.from(document.querySelectorAll('.folder-btn'));
  const cards = Array.from(document.querySelectorAll('.desktop-card'));
  const search = document.getElementById('project-search');
  const results = document.getElementById('results-count');

  if (!buttons.length || !cards.length || !search || !results) {
    return;
  }

  let currentFilter = 'all';

  const update = () => {
    const query = search.value.trim().toLowerCase();
    let visibleCount = 0;

    cards.forEach((card) => {
      const category = card.dataset.category || '';
      const searchable = (card.dataset.search || '').toLowerCase();
      const matchesCategory = currentFilter === 'all' || currentFilter === category;
      const matchesQuery = !query || searchable.includes(query);
      const isVisible = matchesCategory && matchesQuery;

      card.classList.toggle('hidden', !isVisible);
      if (isVisible) {
        visibleCount += 1;
      }
    });

    results.textContent = `Showing ${visibleCount} project${visibleCount === 1 ? '' : 's'}`;
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      currentFilter = button.dataset.filter || 'all';
      buttons.forEach((item) => {
        item.setAttribute('aria-pressed', String(item === button));
      });
      update();
    });
  });

  search.addEventListener('input', update);
  update();
})();
