import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class TodoItem extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = (ind) => {
    this.props.handleDelete(ind)
  }

  render() {
    const messages = this.props.messages;
    return (
      <ul>
        {messages.map((msg, ind) =>
          <li className="icon-close">
            <span>{msg}</span>
            <span onClick={() => {this.handleClick(ind)}}>X</span>
          </li>)}
      </ul>

    );
  }
}
export default TodoItem;
