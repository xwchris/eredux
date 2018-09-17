function bindActionCreator(actionCreator, dispatch) {
  return () => dispatch(actionCreator.bind(this, arguments));
}


export default function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw Error('actionCreators should be a function');
  }

  const keys = Object.keys(actionCreators);
  const boundActionCreators = {};

  keys.forEach(key => {
    const actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  });

  return boundActionCreators;
}
