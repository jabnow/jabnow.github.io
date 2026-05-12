(() => {
  const buttons = Array.from(document.querySelectorAll('.folder-btn'));
  const cards = Array.from(document.querySelectorAll('.desktop-card'));
  const search = document.getElementById('project-search');
  const sort = document.getElementById('project-sort');
  const results = document.getElementById('results-count');
  const pathLine = document.getElementById('current-path');
  const grid = document.getElementById('project-grid');

  if (!buttons.length || !cards.length || !search || !sort || !results || !pathLine || !grid) {
    return;
  }

  let currentFilter = 'all';
  let currentLabel = 'All files';
  const desktopRoot = 'Desktop';

  const sortCards = () => {
    const sorted = [...cards].sort((a, b) => {
      if (sort.value === 'title') {
        return (a.dataset.title || '').localeCompare(b.dataset.title || '');
      }

      return (b.dataset.updated || '').localeCompare(a.dataset.updated || '');
    });

    sorted.forEach((card) => grid.appendChild(card));
  };

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

    pathLine.textContent = `Path: ${desktopRoot} / ${currentLabel}`;
    results.textContent = `Showing ${visibleCount} project${visibleCount === 1 ? '' : 's'}`;
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      currentFilter = button.dataset.filter || 'all';
      currentLabel = button.dataset.label || 'All files';
      buttons.forEach((item) => {
        item.setAttribute('aria-pressed', String(item === button));
      });
      update();
    });
  });

  sort.addEventListener('change', () => {
    sortCards();
    update();
  });

  search.addEventListener('input', update);
  sortCards();
  update();
})();
