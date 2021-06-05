export interface NewNodeDefinitions {
  tag: string;
  handlers?: () => Object;
  classes?: Array<string | { [ key: string ]: (...args: any) => boolean }>;
  props?: () => Object;
  children?: Array<NewNodeDefinitions>;
}
