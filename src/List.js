
import React, { useState }     from 'react';
import { connect }             from 'react-redux';

import Paper                   from '@material-ui/core/Paper';
import List                    from '@material-ui/core/List';

import ListItem                from './ListItem';
import useStyles               from  './styles'

import {
  phonebookProps,
  phonebookActions
} from './redux'

export default connect( phonebookProps, phonebookActions )
( function({list,search=''}) {
  const classes = useStyles();
  const [ edit, setEdit ] = useState(-1);
  return (
  <Paper className={classes.withSpace}>
    <List className={classes.root}>
    { list
      .filter( v => v.name.toLowerCase().match(search.toLocaleLowerCase()) )
      .map( ({name,phone},index)=>
        <ListItem {...{name,phone,index,edit}} setEdit={setEdit}/>
    )}
    </List>
  </Paper>
)});
