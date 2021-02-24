import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary';

class orderSummary extends Component {
  render(){
    console.log('[orderSummery.js] rendered');
    const ingredientSummary = Object.keys(this.props.ingredients)
    .map(igkey => {
      return (
        <li key={igkey}>
          <span>{igkey}</span>: {this.props.ingredients[igkey]}
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
      <p><bold>Price: {this.props.price.toFixed(2)}</bold></p>
      <p>Continue to checkout?</p>
      <button onClick={this.props.cancelClick}>Cancel</button>
      <button onClick={this.props.continueClick}>Continue</button>
    </Aux>
    );
  } 
}

export default orderSummary