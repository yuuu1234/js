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
    {controls.map(ctrl => (
      <BuildControl 
      added={() => props.ingredientAdded(ctrl.type)}
      removed={() => props.ingredientRemoved(ctrl.type)}
      key={ctrl.label} 
      label={ctrl.type}
      disabled={props.disabled[ctrl.type]}/>
    ))}
    {console.log(props.purchasable)}
    <button disabled={!props.purchasable}>ORDER NOW</button>
  </div>
);
export default buildControls;