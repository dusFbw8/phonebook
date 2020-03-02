
import React, { useState }     from 'react';
import { connect }             from 'react-redux';

import { makeStyles }          from '@material-ui/core/styles';
import Paper                   from '@material-ui/core/Paper';
import TextField               from '@material-ui/core/TextField';
import Button                  from '@material-ui/core/Button';
import IconButton              from '@material-ui/core/IconButton';
import List                    from '@material-ui/core/List';
import ListItem                from '@material-ui/core/ListItem';
import ListItemText            from '@material-ui/core/ListItemText';
import ListItemAvatar          from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar                  from '@material-ui/core/Avatar';
import PhoneAndroid            from '@material-ui/icons/PhoneAndroid';
import DeleteIcon              from '@material-ui/icons/Delete';
import EditIcon                from '@material-ui/icons/Edit';

const useStyles = makeStyles( theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  withSpace: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    '& > *': {
      margin: theme.spacing(1),
    },
  }
}));

const phonebookProps = state => state
const phonebookActions = dispatch => { return {
  addEntry: value => dispatch({type:'addEntry',value}),
  delEntry: index => dispatch({type:'delEntry',index}),
  modEntry: (index,value) => dispatch({type:'modEntry',index,value})
}}

const AddEntry = connect( null, phonebookActions )
( function ({addEntry}){
  const classes = useStyles();
  const defaults = { name:'', phone:'' };
  const [state,setState] = useState(defaults);
  const {name,phone} = state;
  const change = e => setState({...state,[e.target.name]:e.target.value});
  const submit = e => { addEntry({name,phone}); setState(defaults) };
  return (
  <Paper className={classes.withSpace}>
    <TextField onChange={change} value={name}  name="name"  label="Full Name"    variant="outlined" />
    <TextField onChange={change} value={phone} name="phone" label="Phone Number" variant="outlined" />
    <Button     onClick={submit} color="primary" variant="contained">Add</Button>
  </Paper> );
});

let submitEditor = false;
const setSubmit = submit => submitEditor = submit;

const PhonebookList = connect( phonebookProps, phonebookActions )
( function({list,delEntry}) {
  const classes = useStyles();
  const [ edit, setEdit ] = useState(-1);
  return (
    <Paper className={classes.withSpace}>
      <List className={classes.root}>
      { list.map( ({name,phone},index)=>
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
            ? <ListItemEditor index={index} setSubmit={setSubmit}/>
            : <ListItemText primary={name} secondary={phone} />
          }
          <ListItemSecondaryAction>
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
      )}
      </List>
    </Paper>
  );
});

const ListItemEditor = connect( phonebookProps, phonebookActions )
( function({list,index,modEntry,setSubmit}){
  const [state,setState] = useState(list[index]);
  const {name,phone} = state;
  const change = e => setState({...state,[e.target.name]:e.target.value});
  setSubmit( e => modEntry( index, {name,phone} ) ); // submitEditor
  return ( <>
    <TextField onChange={change} value={name}  name="name"  label="Full Name"    variant="standard" />
    <TextField onChange={change} value={phone} name="phone" label="Phone Number" variant="standard" />
  </> );
});

function Phonebook() {
  return <>
    <AddEntry/>
    <PhonebookList/>
  </>
}

export default Phonebook;
