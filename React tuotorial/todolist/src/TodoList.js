import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class TodoList extends Component {

  state = {
    inputMsg: '',
    messages: [],
  };

  handleInput = (evt) => {
    this.setState({ inputMsg: evt.target.value });
  }

  hadleSubmit = () => {
    const text = this.state.inputMsg
    if (text) {
      this.setState({ messages: [...this.state.messages, text] });
    };
    this.setState({ inputMsg: '' });
  }
  // handleDelete = (ind)=>{
  //   const oldMessages = [...this.state.messages]
  //   this.setState({
  //     messages: oldMessages.splice(ind,1),
  //   });
  // }

  render() {
    return (
      <div>
        <div>
          <ul>
            {this.state.messages.map((msg,ind) =>
              <li>
                <span>{msg}</span>
                <span onClick={this.handleDelete(ind)}>X</span>
              </li>)}
          </ul>
        </div>
        <input type="text" onChange={this.handleInput} />
        <button onClick={this.hadleSubmit}>submit</button>
      </div>
    );
  }
}
export default TodoList;
