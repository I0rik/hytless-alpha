import { NewNodeDefinitions } from '../models/domHelpers.models';

export function mountNode(parent: string | HTMLElement, component: HTMLElement) {
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

export function createNode(data: NewNodeDefinitions): HTMLElement {
  const el = document.createElement(data.tag);
  data.children?.forEach(child => {
    const childEl = createNode.call(this, child);
    mountNode(el, childEl);
  })
  applyNodeHandlers.call(this, el, data.handlers);
  applyClases.call(this, el, data.classes);
  applyProps.call(this, el, data.props);
  return el;
}

function applyNodeHandlers(node: HTMLElement, handlers: () => Object): void {
  const _handlers = handlers ? handlers.call(this) : {};
  Object.keys(_handlers).forEach(key => {
    node.addEventListener(key, _handlers[key].bind(this));
  })
}

function applyClases(node: HTMLElement, classes: Array<string | { [ key: string ]: (...args: any) => boolean }>): void {
  classes?.forEach(cl => {
    if (typeof cl === 'string') {
      node.classList.add(cl);
    } else {
      createClassCalculator(node, cl);
    }
  })
}

function createClassCalculator(node: HTMLElement, cl: { [ key: string ]: (...args: any) => boolean }) {
  //
}

function applyProps(node: HTMLElement, props: () => Object) {
  const _options = props ? props.call(this) : {};
  for (const key in _options) {
    if (key === 'innerText' && typeof _options[key] === 'function') {
      const textNode = document.createTextNode(_options[key]())
      node.append(textNode);
    } else if (key === 'innerText') {
      const textNode = document.createTextNode(_options[key])
      node.append(textNode);
    }
    node.setAttribute(key, _options[key]);
  }
}