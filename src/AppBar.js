
/*
  The top application bar, including the quicksearch field.

  Data from the search field is sent to the Redux state and later
    used by the [List] component, to filter the list

  The component is created as an anonymous function,
    then connected to the Redux context via the [connect] function.

  Because it is the default export naming it does not connected
    to be a named function, although this will improve readability
    in the debugger.

*/

import React       from 'react';
import { connect } from 'react-redux';

import AppBar      from '@material-ui/core/AppBar';
import Toolbar     from '@material-ui/core/Toolbar';
import IconButton  from '@material-ui/core/IconButton';
import Typography  from '@material-ui/core/Typography';
import InputBase   from '@material-ui/core/InputBase';
import SearchIcon  from '@material-ui/icons/Search';
import AddIcon     from '@material-ui/icons/Add';

import useStyles   from './styles'

import {
  phonebookProps,
  phonebookActions
} from './redux'

export default connect(phonebookProps,phonebookActions)(
function({search='',setSearch}){
  const classes = useStyles(); // custom hook to recieve styles from ./styles.js
  const change = e => setSearch(e.target.value); // send current search to redux
  return (
  <AppBar position="static">
    <Toolbar>
      <Typography className={classes.title} variant="h6" noWrap>
        Phonebook
      </Typography>
      <div className={classes.grow}/>
      <IconButton color="inherit">
        <AddIcon/>
      </IconButton>
      {/* this is a very custom input element, taken from the documentation */}
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          value={search}
          onChange={change}
        />
      </div>
    </Toolbar>
  </AppBar>
)});
