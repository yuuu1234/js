import React, { useState } from 'react';
import UserOutput from './UserOutput.js';
import UserInput from './UserInput.js';
import './App.css';

const App = () => {
  const [userState, setUserState] = useState({
    users: [
      { userName: 'May' },
      { userName: 'Emily' },
      { userName: 'Yu' },
    ],
  });

  const inputChangeHandler = (evt, index) => {
    let newUsers = [];
    newUsers = userState;
    newUsers[index] = evt.target.value;
    setUserState({
      users: newUsers,
    });
  }
  return (
    <div>
      {/* <UserInput onChange={() => { inputChangeHandler.bind(this,[0]) }} /> */}
      <UserOutput userName={userState.users[0].userName} />
      {/* <UserInput onChange={() => { inputChangeHandler.bind(this, [1]) }} />
      <UserOutput userName={userState.users[1].userName} />
      <UserInput onChange={() => { inputChangeHandler.bind(this, [2]) }} />
      <UserOutput userName={userState.users[2].userName} /> */}
    </div>
  );

};

export default App;
