import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import classes from './Modal.css'
const modal = (props) =>(
  <Aux>
    <div className={classes.Modal}>
      {props.children}
    </div>
  </Aux>
);

export default modal;