import createStore from './createStore';
import combineReducers from './combineReducers';
import applyMiddleware from './applyMiddleware';
import bindActionCreators from './bindActionCreators';
import compose from './compose';
import __DO_NOT_USE__ActionTypes from './utils/actionTypes';

export const ERedux = {
  createStore,
  applyMiddleware,
  combineReducers,
  bindActionCreators,
  compose,
  __DO_NOT_USE__ActionTypes
};

export default ERedux;
