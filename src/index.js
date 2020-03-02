import React from 'react';
import ReactDOM from 'react-dom';
import Phonebook from './Phonebook';
import * as serviceWorker from './serviceWorker';

import { createStore } from 'redux'
import { Provider    } from 'react-redux'

const phonebookDefaults = {
  list:[
    { name:"Sebastian Glaser", phone:"+49 1233 123 123 322" }
  ]
}

const phonebookReducer = ( state=phonebookDefaults, action )=> {
  const { type, index, value } = action;
  const { list } = state;
  switch (type) {
    case 'addEntry':
      state = { ...state,
        list: [value,...list]
      }; break;
    case 'delEntry':
      state = { ...state,
        list: list.filter( (_,i)=> index !== i )
      }; break;
    case 'modEntry':
      state = { ...state,
        list: list.map( (v,i)=> index === i ? value : v )
      }; break;
    default: break; }
  return state;
}

const phonebookStore = createStore(
    phonebookReducer
);

ReactDOM.render(
  <Provider store={phonebookStore}>
    <Phonebook/>
  </Provider>
  , document.getElementById('root'));

serviceWorker.register();
