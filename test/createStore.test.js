import ERedux, { createStore } from '../index';

describe('Test the createStore', () => {
  test('empty reducer', () => {
    const reducer = (state = {}, action = {}) => ({});
    expect(createStore(reducer)).toBeDefined();
    expect(ERedux.createStore(reducer)).toBeDefined();
  })
})
