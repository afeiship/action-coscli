/**
 * Pinia state tree.
 * Provide a global state tree for pinia.
 *
 * API:
 * nx.$get(inKey, inDefault)
 * nx.$set(inKey, inValue)
 * nx.$set(inObject)
 *
 * const stateTree = nx.$get();
 * const stateUser = nx.$get('user');
 *
 * stateUser.set('username', 'afei');
 * stateUser.set({ username: 'afei' });
 *
 * const username = stateUser.get('username');
 * const username = stateUser.get('username', 'aric');
 *
 * @param {Object} context
 * @returns {Object}
 */
import nx from '@jswork/next';

declare var wx: any;

const STATE_TREE = {};
const STORE_TREE = {};

// nx.$useStore api
const PAIN = {};
let PINIA_STORES = PAIN;
const USE_STORE_DEFAULTS = { immediate: false };

const set = (inContext, ...args) => {
  if (args.length === 2) {
    const [key, value] = args;
    nx.set(inContext, key, value);
  } else {
    const [target] = args;
    nx.forIn(target, (key, value) => {
      nx.$set(key, value);
    });
  }
};

const get = (inContext, inKey, inDefault?) => {
  if (!inKey) return inContext;
  return nx.get(inContext, inKey, inDefault);
};

nx.$get = (inKey, inDefault) => {
  if (!inKey) return STATE_TREE;
  return get(STORE_TREE, inKey, inDefault);
};

nx.$set = (...args) => {
  set(STATE_TREE, ...args);
};

nx.$query = (inKey, inDefault?) => {
  const fn = inDefault || nx.noop;
  return get(STORE_TREE, inKey, fn);
};

nx.$call = (inName, ...args) => {
  const fn = nx.$query(inName);
  return fn(...args);
};

// user.profile.login:username
// user.loading
nx.$map = (inKeys: string[]) => {
  return inKeys.reduce((res, item) => {
    const keys = item.split('.');
    const lastKey = keys[keys.length - 1];
    const idx = item.indexOf(':');
    if (idx >= 0) {
      const key = item.substring(0, idx);
      const path = item.substring(idx + 1);
      res[path] = () => nx.$get(key);
    } else {
      res[lastKey] = () => nx.$get(item);
    }
    return res;
  }, {});
};

nx.$use = (inStores, inOptions?) => {
  const { immediate } = { ...USE_STORE_DEFAULTS, ...inOptions };
  const isString = typeof inStores === 'string';
  const isArray = Array.isArray(inStores);
  const isPlainObj = typeof inStores === 'object' && !isArray;

  // Make sure call after pinia's useStore:
  if (!immediate && PINIA_STORES === PAIN) {
    throw new Error("Please call 'nx.$use' after pinia's 'useStore'!");
  }

  // First time:
  if (isPlainObj) {
    PINIA_STORES = { ...inStores };
    if (immediate) nx.forIn(PINIA_STORES, (_, fn) => fn());
  }

  // Lazy call:
  if (!immediate) {
    if (isArray) return inStores.map((item) => nx.$use(item, inOptions));

    if (isString) {
      const storeFn = nx.get(PINIA_STORES, inStores);
      return storeFn();
    }
  }
};

function PiniaStateTree(context) {
  const store = context.store;
  const { $id, $state } = store;

  STATE_TREE[$id] = $state;
  STORE_TREE[$id] = store;

  // for vue3:
  nx.$app = context.app;
  nx.$pin = context;
  nx.$rootState = STATE_TREE;
  nx.$rootStore = STORE_TREE;

  return {
    $rootState: STATE_TREE,
    $rootStore: STORE_TREE,
    get: function (inKey, inDefault) {
      return get(store, inKey, inDefault);
    },
    set: function (...args) {
      set($state, ...args);
    },
  };
}

// for commonjs es5 require
if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = PiniaStateTree;
}

export default PiniaStateTree;
