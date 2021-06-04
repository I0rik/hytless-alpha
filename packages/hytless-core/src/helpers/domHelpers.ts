export function mountComponent(parent: string | HTMLElement, component: HTMLElement) {
  if (typeof parent === 'string') {
    document.querySelector(parent).append(component);
  } else {
    parent.append(component);
  }
}

export function replaceElement(newEl: HTMLElement, oldEl: HTMLElement) {
  let parentNode = oldEl.parentElement;
  parentNode.replaceChild(newEl, oldEl);
}

export function createNode(tag: string, options?: () => Object): HTMLElement {
  const el = document.createElement(tag);
  const _options = options ? options.call(this) : {};
  for (const key in _options) {
    if (key === 'innerText' && typeof _options[key] === 'function') {
      const textNode = document.createTextNode(_options[key]())
      el.append(textNode);
    } else if (key === 'innerText') {
      const textNode = document.createTextNode(_options[key])
      el.append(textNode);
    }
    el.setAttribute(key, _options[key]);
  }
  return el;
}