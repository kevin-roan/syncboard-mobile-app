// Polyfills for React Native with Hermes engine
import 'react-native-url-polyfill/auto';

// Add polyfills for missing JavaScript features in Hermes
if (typeof global !== 'undefined') {
  // Polyfill for Object.getOwnPropertyDescriptors if not available
  if (!Object.getOwnPropertyDescriptors) {
    Object.getOwnPropertyDescriptors = function(obj: any) {
      const descriptors: any = {};
      Object.getOwnPropertyNames(obj).forEach(name => {
        descriptors[name] = Object.getOwnPropertyDescriptor(obj, name);
      });
      return descriptors;
    };
  }

  // Polyfill for Reflect if not available
  if (typeof Reflect === 'undefined') {
    (global as any).Reflect = {
      get: function(target: any, propertyKey: string | symbol, receiver?: any) {
        return target[propertyKey];
      },
      set: function(target: any, propertyKey: string | symbol, value: any, receiver?: any) {
        target[propertyKey] = value;
        return true;
      },
      has: function(target: any, propertyKey: string | symbol) {
        return propertyKey in target;
      },
      deleteProperty: function(target: any, propertyKey: string | symbol) {
        delete target[propertyKey];
        return true;
      },
      ownKeys: function(target: any) {
        const names = Object.getOwnPropertyNames(target);
        const symbols = Object.getOwnPropertySymbols(target);
        return [...names, ...symbols];
      },
      defineProperty: function(target: any, propertyKey: string | symbol, attributes: PropertyDescriptor) {
        return Object.defineProperty(target, propertyKey, attributes);
      },
      getOwnPropertyDescriptor: function(target: any, propertyKey: string | symbol) {
        return Object.getOwnPropertyDescriptor(target, propertyKey);
      },
      getPrototypeOf: function(target: any) {
        return Object.getPrototypeOf(target);
      },
      setPrototypeOf: function(target: any, prototype: any) {
        return Object.setPrototypeOf(target, prototype);
      },
      isExtensible: function(target: any) {
        return Object.isExtensible(target);
      },
      preventExtensions: function(target: any) {
        return Object.preventExtensions(target);
      },
      construct: function(target: any, args: any[]) {
        return new (target as any)(...args);
      },
      apply: function(target: any, thisArg: any, args: any[]) {
        return target.apply(thisArg, args);
      }
    };
  }

  // Ensure Symbol is available
  if (typeof Symbol === 'undefined') {
    (global as any).Symbol = function(description?: string | number) {
      return `Symbol(${description || ''})`;
    };
  }

  // Polyfill for Array.from if not available
  if (!Array.from) {
    Array.from = function(arrayLike: any, mapFn?: any, thisArg?: any) {
      const items = [];
      for (let i = 0; i < arrayLike.length; i++) {
        items.push(arrayLike[i]);
      }
      if (mapFn) {
        return items.map(mapFn, thisArg);
      }
      return items;
    };
  }

  // Polyfill for Array.isArray if not available
  if (!Array.isArray) {
    Array.isArray = function(obj: any): obj is any[] {
      return Object.prototype.toString.call(obj) === '[object Array]';
    };
  }

  // Ensure Map and Set are available
  if (typeof Map === 'undefined') {
    (global as any).Map = Map;
  }
  if (typeof Set === 'undefined') {
    (global as any).Set = Set;
  }

  // Ensure WeakMap and WeakSet are available
  if (typeof WeakMap === 'undefined') {
    (global as any).WeakMap = WeakMap;
  }
  if (typeof WeakSet === 'undefined') {
    (global as any).WeakSet = WeakSet;
  }

  // Ensure Promise is available
  if (typeof Promise === 'undefined') {
    (global as any).Promise = Promise;
  }

  // Ensure Proxy is available (basic polyfill)
  if (typeof Proxy === 'undefined') {
    (global as any).Proxy = function(target: any, handler: any) {
      return target; // Basic fallback
    };
  }
}

// Ensure console methods are available
if (typeof console === 'undefined') {
  (global as any).console = {
    log: () => {},
    warn: () => {},
    error: () => {},
    info: () => {},
    debug: () => {},
  };
}

// Ensure setTimeout and setInterval are available
if (typeof setTimeout === 'undefined') {
  (global as any).setTimeout = setTimeout;
}
if (typeof setInterval === 'undefined') {
  (global as any).setInterval = setInterval;
}
if (typeof clearTimeout === 'undefined') {
  (global as any).clearTimeout = clearTimeout;
}
if (typeof clearInterval === 'undefined') {
  (global as any).clearInterval = clearInterval;
}
