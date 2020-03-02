
/*
  Add a Record into the database

  The component is created as an anonymous function,
    then connected to the Redux context via the [connect] function.

  The first argument to connect is [null] because this component
    does not recieve any [propsFromState], just the actions.

  Because it is the default export naming it does not connected
    to be a named function, although this will improve readability
    in the debugger.

*/

import React, { useState }     from 'react';
import { connect }             from 'react-redux';

import Paper                   from '@material-ui/core/Paper';
import TextField               from '@material-ui/core/TextField';
import Button                  from '@material-ui/core/Button';

import { phonebookActions }    from './redux'
import useStyles               from  './styles'

export default connect( null, phonebookActions )
( function ({addEntry}){
  const classes = useStyles(); // custom hook to recieve styles from ./styles.js
  const defaults = { name:'', phone:'' }; // default values for the state
  const [state,setState] = useState(defaults); // create a local state for input
  const {name,phone} = state; // read name and phone from state in local const's
  const change = e => // handle cahnges, use element name so both fields work
    setState({...state,[e.target.name]:e.target.value});
  const submit = e => // call [addEntry] from [phonebookActions], reset fields
  { addEntry({name,phone}); setState(defaults) };
  return (
  <Paper className={classes.withSpace}>
    <TextField onChange={change} value={name}  name="name"  label="Full Name"    variant="outlined" />
    <TextField onChange={change} value={phone} name="phone" label="Phone Number" variant="outlined" />
    <Button     onClick={submit} color="primary" variant="contained">Add</Button>
  </Paper> );
});
