import { initApp } from '@hytless/core/src/index';
import { counter } from './components/counter';

const hytlessApp = {
  name: 'app',
  mountSelector: '#app',
  components: [
    counter
  ]
}

initApp(hytlessApp);
