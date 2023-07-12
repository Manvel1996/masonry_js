function MasonryPrototype() {}

MasonryPrototype.prototype.render = function (containerClassName, settings) {
  const container = document.querySelector(containerClassName);

  if (!container) {
    return;
  }

  const columnWidth = settings.columnWidth || 200;
  const autoResize = settings.autoResize || false;
  const gap = settings.gap || 5;

  function positionItems() {
    const containerWidth = container.offsetWidth;
    container.style.position = "relative";

    let columns = Math.floor(containerWidth / (columnWidth + gap));
    if (columns === 0) {
      columns = 1;
    }

    const heightColumns = new Array(columns).fill(0);

    const childrenData = Array.from(container.children).map((childNode) => {
      return {
        childNode,
        currentWidth: columnWidth,
        currentHeight: Math.floor(
          (columnWidth * childNode.firstElementChild.naturalHeight) /
            childNode.firstElementChild.naturalWidth
        ),
      };
    });

    childrenData.forEach((child) => {
      const min = Math.min(...heightColumns);
      const minIndex = heightColumns.indexOf(min);

      child.childNode.style.position = "absolute";
      child.childNode.style.top = `${heightColumns[minIndex]}px`;
      child.childNode.style.left = `${
        minIndex * columnWidth + gap * minIndex
      }px`;
      child.childNode.style.width = `${child.currentWidth}px`;
      child.childNode.style.height = `${child.currentHeight}px`;

      heightColumns[minIndex] += child.currentHeight + gap;
    });
  }

  positionItems();

  if (autoResize) {
    window.addEventListener("resize", () => {
      positionItems();
    });
  }
};

const Masonry = new MasonryPrototype();

window.addEventListener("DOMContentLoaded", () => {
  Masonry.render(".masonry", {
    columnWidth: 600,
    autoResize: true,
    gap: 5,
  });
});
