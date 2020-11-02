import React from 'react';
import Aux from '../../../hoc/Auxiliary'
const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map(igkey => {
      return (
        <li key={igkey}>
          <span>{igkey}</span>: {props.ingredients[igkey]}
        </li>
      )
    })
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><bold>Price: {props.price.toFixed(2)}</bold></p>
      <p>Continue to checkout?</p>
      <button onClick={props.cancelClick}>Cancel</button>
      <button onClick={props.continueClick}>Continue</button>
    </Aux>
  )
}

export default orderSummary