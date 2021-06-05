import { createHytless } from '@hytless/core/src/components/components';

export const counter = createHytless({
  name: 'button',
  options() {
    return {
      innerText: this.counterText
    }
  },
  props: [ 'title' ]
})
