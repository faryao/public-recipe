(function () {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const readingContainers = document.querySelectorAll('.recipe-content, .recipe-card-excerpt');
  const cjkBoundary = /[\u3000-\u303f\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/;
  const ignoredLinkifyTags = 'a, code, pre, script, style, textarea, iframe, input';

  function linkifyBareUrls(container) {
    if (!window.linkify || typeof window.linkify.find !== 'function') return;

    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    let textNode;

    while ((textNode = walker.nextNode())) textNodes.push(textNode);

    textNodes.forEach((node) => {
      if (node.parentElement.closest(ignoredLinkifyTags)) return;

      const matches = window.linkify.find(node.data).filter((match) => (
        match.type === 'url' && /^https?:\/\//i.test(match.value)
      ));
      if (matches.length === 0) return;

      const fragment = document.createDocumentFragment();
      let cursor = 0;

      matches.forEach((match) => {
        const boundaryIndex = match.value.search(cjkBoundary);
        const value = boundaryIndex < 0 ? match.value : match.value.slice(0, boundaryIndex);
        if (!value) return;

        const link = document.createElement('a');
        link.href = value;
        link.textContent = value;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';

        fragment.append(node.data.slice(cursor, match.start), link);
        cursor = match.start + value.length;
      });

      fragment.append(node.data.slice(cursor));
      node.replaceWith(fragment);
    });
  }

  readingContainers.forEach((container) => {
    linkifyBareUrls(container);

    if (window.pangu && typeof window.pangu.spacingNodeSync === 'function') {
      window.pangu.spacingNodeSync(container);
    }
  });

  const grid = document.getElementById('recipes-grid');
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll('.recipe-card'));
  const count = document.getElementById('recipe-count');
  if (count) {
    count.textContent = `${cards.length} 道食谱`;
  }

  cards.forEach((card) => {
    const excerpt = card.querySelector('.recipe-card-excerpt');
    if (!excerpt) return;

    const images = Array.from(excerpt.querySelectorAll('img'));
    if (images.length === 0) return;

    const image = images[0];
    const imageAlt = (image.getAttribute('alt') || '').trim();
    const recipeUrl = card.dataset.recipeUrl;

    image.removeAttribute('width');
    image.removeAttribute('height');
    image.alt = imageAlt && imageAlt.toLowerCase() !== 'image' ? imageAlt : '食谱图片';
    image.loading = 'lazy';
    image.decoding = 'async';

    const thumbnail = document.createElement('a');
    thumbnail.className = 'recipe-card-thumbnail';
    thumbnail.href = recipeUrl;
    thumbnail.append(image);

    images.slice(1).forEach((extraImage) => extraImage.remove());
    excerpt.after(thumbnail);
  });
})();
