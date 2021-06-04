import { initApp } from '@hytless/core/src/index';
import { counter } from './components/counter'

const hytlessApp = initApp({
  name: 'app',
  mountSelector: '#app',
  components: [
    counter
  ]
});
