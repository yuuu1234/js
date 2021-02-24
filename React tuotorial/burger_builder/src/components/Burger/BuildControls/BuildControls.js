import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
const controls = [
  {label: 'Salad', type:'salad'},
  {label: 'Bacon', type:'bacon'},
  {label: 'Cheese', type:'cheese'},
  {label: 'Meat', type:'meat'},
]
const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <h3><bold>Price: {props.price.toFixed(2)}</bold></h3>
    {controls.map(ctrl => (
      <BuildControl 
      added={() => props.ingredientAdded(ctrl.type)}
      removed={() => props.ingredientRemoved(ctrl.type)}
      key={ctrl.label} 
      label={ctrl.type}
      disabled={props.disabled[ctrl.type]}/>
    ))}
    <button disabled={!props.purchasable} onClick={props.orderClick}>ORDER NOW</button>
  </div>
);
export default buildControls;