import isPlainObject from './utils/isPlainObject';
import ActionTypes from './utils/actionTypes';

// create store
function createStore(reducer, preloadState, enhancer) {
  if (typeof preloadState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadState;
    preloadState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw Error('enhancer should be a function');
    }

    // middleware
    return enhancer(createStore)(reducer, preloadState);
  }

  if (typeof reducer !== 'function') {
    throw Error('reducer should be a function');
  }

  let currentReducer = reducer;
  let currentState = preloadState;
  let currentListeners = [];
  let nextListeners = currentListeners = [];
  let isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (currentListeners === nextListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw Error('action should be an object');
    }

    if (typeof action.type === 'undefined') {
      throw Error("action type can't be undefined");
    }

    if (isDispatching) {
      throw Error('dispatch may not execute');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    const listeners = (currentListeners = nextListeners);
    listeners.forEach(listener => listener());
  }

  function getState() {
    if (isDispatching) {
      throw Error("can't call getState when dispatching");
    }

    return currentState;
  }

  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw Error('listener should be a function');
    }

    currentListeners.push(listener);

    let isSubscribed = true;

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw Error("can't unsubscribe listener while dispatching");
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      const index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    }
  }

  dispatch({ type: ActionTypes.INIT });

  return {
    dispatch,
    getState,
    subscribe,
  }
}

export default createStore;
