import { createHytless } from '@hytless/core/src/components/components';

export const counter = createHytless(
  'counter',
  function() {
    return {
      innerText: this.counterText
    }
  },
  {
    counter: 0
  },
  {
    counterText() {
      return `счётчик: ${this?.data?.counter}`;
    },
    incrCounter() {
      this.data.counter++;
      console.log(this.data.counter)
    }
  },
  function() {
    return {
      click: this.incrCounter
    }
  }
)