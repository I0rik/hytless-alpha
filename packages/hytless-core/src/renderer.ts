import { createNode, mountComponent, replaceElement } from './helpers/domHelpers';
import { Component, ComponentData } from './models/component.models';
import { observe } from './helpers/reactivity';

/**
 * @param name
 * @param tagName
 * @param options
 * @param data
 * @param methods
 * @param handlers
 */
export function createRoot(
  name: string,
  mountSelector: string,
  options?: () => Object,
  data?: Object,
  methods?: { [key: string]: () => any },
  handlers?:() => { [key: string]: () => void },
  components?: Array<ComponentData>
  )
{
  const component: Component = {
    name,
    $el: null,
    data: null,
    $render: null,
    $reactProxy: null
  };
  component.$render = createNode.bind(component, 'div', options);
  component.$reactProxy = reRender.bind(component, handlers);
  if (data) {
    component.data = observe.call(component, data);
  }
  if (methods) {
    applyMethods(component, methods);
  }
  component.$el = component.$render();
  mountComponent(mountSelector, component.$el);
  components.forEach(child => {
    createComponent(child, component)
  })
  return component;
}

function createComponent(data: ComponentData, parent: Component) {
  const component: Component = {
    name: data.name,
    $el: null,
    data: null,
    $render: null,
    $reactProxy: null
  };
  component.$render = createNode.bind(component, 'div', data.options);
  component.$reactProxy = reRender.bind(component, data.handlers);
  component.data = observe.call(component, data.data);
  applyMethods(component, data.methods);
  component.$el = component.$render();
  applyHandlers(component, data.handlers);
  mountComponent(parent.$el, component.$el);
  return component;
}

export function reRender(handlers?: () => { [key: string]: () => void }) {
  const oldEl = this.$el;
  this.$el = this.$render();
  applyHandlers(this, handlers);
  replaceElement(this.$el, oldEl);
}

function applyMethods(component: Component, methods: { [key: string]: () => any },) {
  for (const key in methods) {
    component[key] = methods[key].bind(component);
  }
}

export function applyHandlers(component: Component, handlers:() => { [key: string]: () => void }) {
  const _handlers = handlers? handlers.apply(component) : [];
  for (const key in _handlers) {
    component.$el.addEventListener(key, _handlers[key])
  }
}
