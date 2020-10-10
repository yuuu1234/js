import React from 'react';

const UserInput = (props) => {
  return (
    <div>
      <input type="text" onChange ={props.onChange} />
    </div>
  );
};

export default UserInput;
