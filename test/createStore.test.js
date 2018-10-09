import { createStore } from '../src/index';

describe('Test the createStore', () => {
  test('empty reducer', () => {
    const reducer = (state = {}, action = {}) => ({});
    expect(createStore(reducer)).toBeDefined();
  })
})
