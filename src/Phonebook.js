
import React        from 'react';

import { Provider } from 'react-redux'  // Make the store available to
                                        // child components

import store        from './redux'      // The state-logic of our
                                        // application (reducer, actions)

import Add          from './Add'        // Form to add new entries
import List         from './List'       // List of all entries

export default function() { return (
  <Provider store={store}>
    <Add/>
    <List/>
  </Provider>
)};
