
import * as serviceWorker from './serviceWorker';

import React              from 'react';
import ReactDOM           from 'react-dom';

import Phonebook          from './Phonebook';

ReactDOM.render( <Phonebook/>, document.getElementById('root') );

/*
  In order to allow the user to install our app to his Phone
  we need to register a serviceWorker:
    - Downloads all assets in the background and checks for updates (payload)
    - Is required for advanced features like notifications, payment, etc.
*/

serviceWorker.register();
