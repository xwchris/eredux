import compose from './compose';

export default function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args);

    let dispatch = () => {
      throw Error('dispatching while constructing your middleware is not allowed');
    }

    const middlewareAPI = {
      getState: store.getState,
      dispatch
    };

    const chains = middlewares.map(middleware => middleware(middlewareAPI));

    dispatch = compose(...chains)(store.dispatch);

    return {
      ...store,
      dispatch
    }
  }
}
