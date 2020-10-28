import React from 'react';
import classes from './Burger.css'
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  const transformedIngredient = Object.keys(props.ingredients)
  .map( igKey => {
    return [...Array( props.ingredients[igKey] )].map( ( _, i ) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
    } );
} )
.reduce((arr, el) => {
    return arr.concat(el)
}, []);
  return(
    <div className={classes.Burger}>
      <BurgerIngredient type="Bread-top"/>
      {transformedIngredient}
      <BurgerIngredient type="Bread-bottom"/>
    </div>
  );
};

export default burger;