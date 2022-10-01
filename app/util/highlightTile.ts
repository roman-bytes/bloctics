export function highlightTile(el: HTMLElement) {
  const parent: ParentNode | null = el.parentNode;
  const tile: Element = <Element>parent?.previousSibling;
  const floor = tile?.querySelector('.floor');
  // @ts-ignore
  floor.style?.backgroundColor = 'blue';
}
