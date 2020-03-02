
import * as serviceWorker from './serviceWorker';
import React              from 'react';
import ReactDOM           from 'react-dom';
import Phonebook          from './Phonebook';

ReactDOM.render( <Phonebook/>, document.getElementById('root') );

serviceWorker.register();
