import ActionTypes from './utils/actionTypes';

export default function combineReducers(reducers) {
  const reducersKeys = Object.keys(reducers).filter(key => typeof reducers[key] === 'function');
  const finalReducers = {};
  reducersKeys.forEach(key => {
    finalReducers[key] = reducers[key];
  });

  let sanityError;
  try {
    assertReducersSanity(finalReducers);
  } catch(e) {
    sanityError = e;
  }

  const finalReducersKeys = Object.keys(finalReducers);

  return function combination(state = {}, action) {
    if (sanityError) {
      throw sanityError;
    }

    let hasChanged = false;
    const finalState = {};
    finalReducersKeys.forEach(key => {
      const previousState = state[key];
      const reducer = finalReducers[key];
      const nextState = reducer(previousState, action);
      finalState[key] = nextState;
      hasChanged = hasChanged || nextState !== previousState;
    });

    return hasChanged ? finalState : state;
  }
}


function assertReducersSanity(reducers) {
  Object.keys(reducers).forEach(key => {
    if (typeof reducers[key](undefined, ActionTypes.INIT) === 'undefined') {
      throw Error(`reducer ${key} return undefined during initialization, the initial state may not be undefined`);
    }

    if (typeof reducers[key](undefined, ActionTypes.PROBE_UNKNOWN_ACTION()) === 'undefined') {
      throw Error(`reducer ${key} return undefined when probe with a random type, the initial state may not be undefined`);
    }
  })
}
