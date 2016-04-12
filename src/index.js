import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './js/Sidebar/Sidebar';
import PedalboardComponent from './js/Pedalboard/Pedalboard';

import './scss/styles.scss';

ReactDOM.render(<Sidebar />, document.querySelector(`.sidebar`));
ReactDOM.render(<PedalboardComponent />, document.querySelector(`.pedalboard`));
