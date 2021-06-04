import { InitApp } from './models/component.models';
import { createRoot } from './renderer'

export function initApp(rootComponent: InitApp) {
  document.onreadystatechange = function() {
    if (document.readyState === 'complete') {
      const app = createRoot(
        rootComponent.name,
        rootComponent.mountSelector,
        rootComponent.options,
        rootComponent.data,
        rootComponent.methods,
        rootComponent.handlers,
        rootComponent.components
      )

      return app;
    }
  };
}
