
import { createStore } from 'redux'

const { localStorage } = window;

const defaults = { list:[] }; // state of our application when first used

/*
  Takes the current state as an argument and uses localStorage
    to save the stringified version permanently
 */
const save = state =>
  localStorage.setItem('phonebook',JSON.stringify(state));

/*
  Tries to load a stringified state from localStorage
    - If no record exists returns 'false' to JSON.parse
      so that JSON.parse does not fail
    - If no data is available returns defaults
*/
const load = () =>
  JSON.parse( localStorage.getItem('phonebook') || 'false' )
  || defaults;

const loadedPhonebook = load(); // Tries to load state when page opens

/*
  The reducer manages the state by recieving messages (actions):
    - If no state is given (on page load) uses 'loadedPhonebook'
    - Handles incoming actions:
      - Add a record with the [value] provided
      - Modify a record at [index] with the [value] provided
      - Delete a record at [index]
    - Saves the new state to localStorage
    - Returns the new state
*/
const phonebookReducer = ( state = loadedPhonebook , action )=> {
  const { type, index, value } = action;
  const { list } = state;
  switch (type) {
    case 'addEntry':
      state = { ...state,
        list: [value,...list]
        // Create a new array, with [value] and [list]
      }; break;
    case 'delEntry':
      state = { ...state,
        list: list.filter( (_,i)=> index !== i )
        // delete the record at [index]
      }; break;
    case 'modEntry':
      state = { ...state,
        list: list.map( (v,i)=> index === i ? value : v )
        // replace the record at [index] with [value] else use existing value
      }; break;
    case 'setSearch':
      state = {...state,search:value}; break;
    default: break; }
  save(state);
  return state;
}

export default createStore(
    phonebookReducer
);

const phonebookProps = state => state

/*
  Prepare the actions to be dispatched in easy to use functions
*/
const phonebookActions = dispatch => { return {
  addEntry: value => dispatch({type:'addEntry',value}),
  delEntry: index => dispatch({type:'delEntry',index}),
  modEntry: (index,value) => dispatch({type:'modEntry',index,value}),
  setSearch: value => dispatch({type:'setSearch',value}),
}}

export { phonebookProps, phonebookActions };
