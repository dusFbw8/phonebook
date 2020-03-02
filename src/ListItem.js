
import React                   from 'react';
import { connect }             from 'react-redux';

import IconButton              from '@material-ui/core/IconButton';
import ListItem                from '@material-ui/core/ListItem';
import ListItemText            from '@material-ui/core/ListItemText';
import ListItemAvatar          from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar                  from '@material-ui/core/Avatar';
import PhoneAndroid            from '@material-ui/icons/PhoneAndroid';
import DeleteIcon              from '@material-ui/icons/Delete';
import EditIcon                from '@material-ui/icons/Edit';
import ReplayIcon              from '@material-ui/icons/Replay';

import Editor                  from  './Editor'

import {
  phonebookActions
} from './redux'

let submitEditor = false;
const setSubmit = submit => submitEditor = submit;

export default connect( null, phonebookActions )
( function({name,phone,index,edit,setEdit,delEntry}) {
  return (
  <ListItem key={index}>
      <ListItemAvatar>
        <a href={`tel:${phone}`}>
        <Avatar>
          <PhoneAndroid/>
        </Avatar>
        </a>
      </ListItemAvatar>
    {
      edit === index
      ? <Editor index={index} setSubmit={setSubmit}/>
      : <ListItemText primary={name} secondary={phone} />
    }
    <ListItemSecondaryAction>
      { edit === index ?
        <IconButton edge="start" aria-label="undo"
          onClick={e => setEdit(-1) }>
          <ReplayIcon />
        </IconButton>
      : null }
      <IconButton edge="start" aria-label="modify"
        color={ edit === index ? 'primary' : 'secondary' }
        onClick={e => {
          if ( edit === index ){
            submitEditor();
            setEdit(-1);
          } else setEdit(index);
        }}>
        <EditIcon />
      </IconButton>
      <IconButton edge="end" aria-label="delete"
        onClick={e => delEntry(index)}>
        <DeleteIcon />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
)});
