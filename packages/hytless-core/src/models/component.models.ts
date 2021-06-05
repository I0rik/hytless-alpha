import { NewNodeDefinitions } from './domHelpers.models';

export interface Component {
  name: string;
  $el: HTMLElement | null;
  $render: () => null;
  $reactProxy: () => null;
  data: Object;
  [key: string]: any;
  $parent?: Component;
}

export interface InitApp {
  name: string;
  mountSelector: string;
  options?: () => Object;
  data?: Object;
  methods?: { [key: string]: () => any };
  handlers?:() => { [key: string]: () => void };
  components?: Array<ComponentData>;
}

/**
 * Данные, необходимые для создания компонента
 */
export interface ComponentData {
  name: string;
  options?: () => Object;
  props?: Array<any>;
  data?: Object;
  methods?: { [key: string]: () => any };
  handlers?:() => { [key: string]: () => void };
  children?: Array<ComponentData | NewNodeDefinitions>;
}
