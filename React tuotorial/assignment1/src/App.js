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
    let newUsers = [...userState.users];
    // newUsers = userState.users;
    newUsers[index] = { userName: evt.target.value };
    setUserState({
      users: newUsers,
    });
  }
  return (
    <div>
      <UserInput onChange={(evt) => inputChangeHandler(evt, 0)} />

      <UserOutput userName={userState.users[0].userName} />
      <UserInput onChange={(evt) => { inputChangeHandler(evt, 1) }} />
      <UserOutput userName={userState.users[1].userName} />
      <UserInput onChange={(evt) => { inputChangeHandler(evt, 2) }} />
      <UserOutput userName={userState.users[2].userName} />

    </div>
  );

};

export default App;
