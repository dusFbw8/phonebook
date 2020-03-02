
import React        from 'react';
import { Provider } from 'react-redux'
import Add          from './Add'
import List         from './List'
import store        from './redux'

export default function() {
  return (
  <Provider store={store}>
    <Add/>
    <List/>
  </Provider>
)};
