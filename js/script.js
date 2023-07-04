function MasonryPrototype() {}

MasonryPrototype.prototype.render = function (containerClass, settings) {
  const container = document.querySelector(containerClass);

  if (!container) {
    return;
  }

  const columnWidth = settings.columnWidth || 200;
  const autoResize = settings.autoResize || false;
  const gap = 5

  function positionItems() {
    const containerWidth = container.offsetWidth;
    const columns = Math.floor(containerWidth / (columnWidth + gap));

    const paddingInline = autoResize
      ? 0
      : (containerWidth - columns * (columnWidth + gap)) / 2;

    container.style.cssText = `
      columns-count: ${columns};
      padding-inline: ${paddingInline}px;
      column-gap: ${gap}px;
      column-width: ${columnWidth}px;
    `;
  }

  positionItems();

  window.addEventListener("resize", positionItems);
};

const Masonry = new MasonryPrototype();

window.addEventListener("DOMContentLoaded", () => {
  Masonry.render(".masonry", {
    columnWidth: 200,
    // autoResize: true,
  });
});