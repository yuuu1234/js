import React from 'react';
import ReactDOM from 'react-dom'
import FirstComponent from './first-component'
let element = <FirstComponent />;
// OR without JSX:
//   let element = React.createElement('p', {}, 'Hello React!')

ReactDOM.render(element,document.getElementById('react-container'))