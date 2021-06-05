import { createHytless } from '@hytless/core/src/components/components';

export const counter = createHytless({
  name: 'counter',
  data: {
    counter: 0
  },
  methods: {
    counterText() {
      return `счётчик: ${this?.data?.counter}`;
    },
    incrCounter() {
      this.data.counter++;
    },
    decrCounter() {
      this.data.counter--;
    }
  },
  children: [
    {
      tag: 'div',
      classes: [
        'counter-wrapper'
      ],
      children: [
        {
          tag: 'button',
          props() {
            return { 
              innerText: 'увеличить',
            }
          },
          handlers() {
            return {
              click: this.incrCounter
            }
          },
        },
        {
          tag: 'div',
          props() {
            return {
              innerText: this.counterText
            }
          },
        },
        {
          tag: 'button',
          props() {
            return { 
              innerText: 'уменьшить',
            }
          },
          handlers() {
            return {
              click: this.decrCounter
            }
          },
        },
      ]
    }
  ]
})
