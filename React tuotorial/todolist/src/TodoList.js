import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputvalue : '',
      list: [],
    }

  }
  render() {
    return (
      <Fragment>
        <div>
          <input
            type="text"
            value={this.state.inputvalue}
            onChange={this.hadleInputChange.bind(this)}
          >
          </input>
          <button>Submit</button>
        </div>
        <ul>
          <li>
            <span>Eating</span>
            <span>X</span>
          </li>
          <li>
            <span>Sleeping</span>
            <span>X</span>
          </li>
          <li>
            <span>Playing</span>
            <span>X</span>
          </li>
        </ul>
      </Fragment>
    );

  }

  hadleInputChange(e) {
    console.log(e.target);
    console.log(e.target.value);
    this.setState({
      inputvalue: e.target.value
    })

  };
}



export default TodoList;
