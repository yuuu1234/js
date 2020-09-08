import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoItem from './TodoItem'

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
  handleDelete = (ind) => {
    console.log(this);
    console.log(ind);
    const newMessages = [...this.state.messages]
    
    newMessages.splice(ind, 1)
    this.setState({
      messages: newMessages,
      inputMsg: '' ,
    });
    console.log(this.state.messages)
  }

  render() {
    return (
      <div>
        <TodoItem messages={this.state.messages} handleDelete={this.handleDelete.bind(this)} />
        <input type="text" onChange={this.handleInput} />
        <button onClick={this.hadleSubmit}>submit</button>
      </div>
    );
  }
}
export default TodoList;
