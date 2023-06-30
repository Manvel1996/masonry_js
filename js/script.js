const imgs = new Array(30).fill(0);
const masonry = document.querySelector(".masonry");

imgs.forEach((el, i) => {
  const item = document.createElement("li");

  const img = document.createElement("img");
  img.src = "./img/" + (i + 1) + ".jpg";

  item.appendChild(img);
  masonry.appendChild(item);
});

function MasonryPrototype() {}

MasonryPrototype.prototype.render = function (containerClass, settings) {
  const container = document.querySelector(containerClass);

  if (!container) {
    return;
  }

  const childNodes = Array.from(container.children);
  const columnWidth = settings.columnWidth || 200;
  const autoResize = settings.autoResize || false;

  function positionItems() {
    const containerWidth = container.offsetWidth;
    const columns = Math.floor(containerWidth / (columnWidth + 5));

    const paddingInline = autoResize
      ? 0
      : (containerWidth - columns * (columnWidth + 5)) / 2;

    container.style.cssText = `
      columns-count: ${columns};
      padding-inline: ${paddingInline}px;
      column-gap: 5px;
      column-width: ${columnWidth}px;
    `;

    childNodes.forEach((child) => {
      child.style.cssText = `list-style:none;`;
      child.firstElementChild.style.cssText = `width:100%; height:100%; object-fit:cover`;
    });
  }

  positionItems();

  window.addEventListener("resize", positionItems);
};

const Masonry = new MasonryPrototype();

window.addEventListener("DOMContentLoaded", () => {
  Masonry.render(".masonry", {
    columnWidth: 250,
    // autoResize: true,
  });
});

// function MasonryPrototype() {}

// MasonryPrototype.prototype.render = function (containerClassName, settings) {
//   const container = document.querySelector(containerClassName);
//   const childNodes = container.children;

//   let childrenData = Array.from(childNodes).map((childNode) => {
//     console.log(childNode.firstElementChild.naturalHeight)
//     return {
//       childNode,
//       originHeight: childNode.firstElementChild.naturalHeight,
//       originWidth: childNode.firstElementChild.naturalWidth,
//     };
//   });

//   const columnWidth = settings.columnWidth || 200;
//   const autoResize = settings.autoResize || false;

//   if (!container) {
//     return;
//   }

//   function positionItems() {
//     const containerWidth = container.offsetWidth;
//     const columns = Math.floor(containerWidth / columnWidth);

//     container.style.cssText = `width:${containerWidth}px;
//     columns-count:${columns};
//     column-width:${columnWidth}px;
//     position:relative;overflow:hidden;`;

//     childrenData = childrenData.map((child) => {
//       return {
//         ...child,
//         currentWidth: columnWidth,
//         currentHeight: Math.floor(
//           (columnWidth * child.originHeight) / child.originWidth
//         ),
//       };
//     });

//     const heightColumns = new Array(columns).fill(0);
//     const sizeColumns = new Array(columns).fill(0);

//     childrenData.forEach((child, i) => {
//       child.childNode.style.cssText = `list-style:none; position:absolute; gap 5px`;
//       child.childNode.firstElementChild.style.cssText =
//         "width:100%; height:100%; object-fit:cover";

//       heightColumns[i % columns] += child.currentHeight + 5;
//       sizeColumns[i % columns] += 1;
//     });

//     const minHeightColumn = Math.min(...heightColumns);

//     const diffImages = heightColumns.map((heightColumn, i) => {
//       return (heightColumn - minHeightColumn) / sizeColumns[i];
//     });

//     container.style.cssText = `height:${minHeightColumn - 5}px !important;`;

//     const topSets = new Array(columns).fill(0);

//     childrenData = childrenData.map((child, i) => {
//       const indexColumn = i % columns;
//       const left = indexColumn * columnWidth + 5 * indexColumn;
//       const currentHeight = child.currentHeight - diffImages[indexColumn];
//       const top = topSets[indexColumn];
//       topSets[indexColumn] += currentHeight + 5;
//       return {
//         ...child,
//         currentHeight,
//         left,
//         top,
//       };
//     });

//     childrenData.forEach((child) => {
//       child.childNode.style.top = `${child.top}px`;
//       child.childNode.style.left = `${child.left}px`;
//       child.childNode.style.width = `${child.currentWidth}px`;
//       child.childNode.style.height = `${child.currentHeight}px`;
//     });
//   }

//   positionItems();

//   if (autoResize) {
//     window.addEventListener("resize", positionItems);
//   }
// };

// const Masonry = new MasonryPrototype();

// setTimeout(()=>{

//   Masonry.render(".masonry", {
//     columnWidth: 300,
//     autoResize: true,
//   });
// },100)
