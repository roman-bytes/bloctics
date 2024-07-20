export function highlightTile(el: HTMLElement, color: string) {
  const parent: ParentNode | null = el.parentNode;
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const tile: Element = <Element>parent?.previousSibling;
  const floor = tile?.querySelector('.floor');
  // @ts-ignore
  floor.style.backgroundColor = color;
}
