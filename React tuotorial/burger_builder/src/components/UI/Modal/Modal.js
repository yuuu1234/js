import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.css'
class modal extends Component {
  // shouldComponentUpdate(nextProps, nextState){
  //   console.log('should update?')
  //   return nextProps.show !==this.props.show
  // }

  // componentWillUpdate(){
  //   console.log('[modal.js] will render')
  // }
  render() {
    console.log('[modal.js] rendered')
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}>
          {this.props.children}
        </div>
      </Aux>
    )
  }
};

export default modal;