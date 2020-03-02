
/*
  This is the inline editor we wrote.

  Data from the search field is sent to the Redux state and later
    used by the [List] component, to filter the list

  The component is created as an anonymous function,
    then connected to the Redux context via the [connect] function.

  Because it is the default export naming it does not connected
    to be a named function, although this will improve readability
    in the debugger.

*/

import React, { useState }     from 'react';
import { connect }             from 'react-redux';
import TextField               from '@material-ui/core/TextField';

import {
  phonebookProps,
  phonebookActions
} from './redux'

export default connect( phonebookProps, phonebookActions )
( function({list,index,modEntry,setSubmit}){
  const [state,setState] = useState(list[index]);
  const {name,phone} = state;
  const change = e => setState({...state,[e.target.name]:e.target.value});
  setSubmit( e => modEntry( index, {name,phone} ) ); // submitEditor
  return (
  <span style={{maxWidth: "calc( 100% - 20ch )"}}>
    <TextField onChange={change} value={name}  name="name"  label="Full Name"    variant="standard" />
    <TextField onChange={change} value={phone} name="phone" label="Phone Number" variant="standard" />
  </span> );
});
