export function observe(target: any) {
  let _proxy = null;
  let _target = null;
  if (typeof target === 'object') {
    _target = target;
    _proxy = createObjectProxy(this);
  } else {
    _target = {
      value: target
    }
    _proxy = createPrimitiveProxy(this);
  }

  return new Proxy(_target, _proxy)
}

function createObjectProxy(subscriber: {  $reactProxy: () => any  }) {
  const subscribers: Array<{ $reactProxy: () => any }> = [];
  return {
    get(target: Object, prop: PropertyKey, receiver: any) {
      console.log('proxy: get')
      if (!subscribers.includes(subscriber)){
        subscribers.push(subscriber);
      }
      return Reflect.get(target, prop, receiver);
    },
    set(target: Object, prop: PropertyKey, value: any, receiver: any) {
      console.log('proxy: set')
      if (!subscribers.includes(subscriber)){
        subscribers.push(subscriber);
      }
      subscribers.forEach(subscriber => {
        setTimeout(() => subscriber.$reactProxy());
      })
      return Reflect.set(target, prop, value, receiver);
    }
  }
}

function createPrimitiveProxy(subscriber: { $reactProxy: () => any }) {
  const subscribers: Array<{ $reactProxy: () => any }> = [];
  return {
    get(target: { value: any }, prop: PropertyKey, receiver: any) {
      if (!subscribers.includes(subscriber)){
        subscribers.push(subscriber);
      }
      return Reflect.get(target, prop, receiver);
    },
    set(target: { value: any }, prop: PropertyKey, value: any, receiver: any) {
      if (!subscribers.includes(subscriber)){
        subscribers.push(subscriber);
      }
      subscribers.forEach(subscriber => {
        setTimeout(() => subscriber.$reactProxy());
      })
      return Reflect.set(target, prop, value, receiver);
    }
  }
}