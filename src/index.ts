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
 * Set root:
 * nx.$root = { 'user.username': 'aric-jsw' };
 *
 * @param {Object} context
 * @returns {Object}
 */
import nx from '@jswork/next';

const STATE_TREE = {};

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

const get = (inContext, inKey, inDefault) => {
  if (!inKey) return inContext;
  return nx.get(inContext, inKey, inDefault);
};

nx.$get = (inKey, inDefault) => {
  return get(STATE_TREE, inKey, inDefault);
};

nx.$set = (...args) => {
  set(STATE_TREE, ...args);
};

nx.defineProperty(nx, '$root', {
  set: function (inObj) {
    nx.$set(inObj);
  },
  get: function () {
    return STATE_TREE;
  },
});

function PiniaStateTree(context) {
  const id = context.store.$id;
  const state = context.store.$state;
  STATE_TREE[id] = state;

  // for vue3:
  nx.$app = context.app;
  nx.$pinia = context.store;

  return {
    $root: STATE_TREE,
    get: function (inKey, inDefault) {
      return get(state, inKey, inDefault);
    },
    set: function (...args) {
      set(state, ...args);
    },
  };
}

// for commonjs es5 require
if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = PiniaStateTree;
}

export default PiniaStateTree;
