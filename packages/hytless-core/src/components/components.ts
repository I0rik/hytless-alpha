import { ComponentData } from '../models/component.models';

/**
 * 
 * @param name 
 * @param options 
 * @param data 
 * @param methods 
 * @param handlers 
 * @param components 
 * @returns 
 */
export function createHytless (
  name: string,
  options: () => Object,
  data: Object,
  methods: { [key: string]: () => any },
  handlers:() => { [key: string]: () => void },
  components?: Array<ComponentData>,
): ComponentData {
  return {
    name,
    options,
    data,
    methods,
    handlers,
    components
  }
}