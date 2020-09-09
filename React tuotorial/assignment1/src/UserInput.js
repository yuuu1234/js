import React from 'react';

const UserInput = (onChange) => {
  return (
    <div>
      <input type="text" onchange ={onChange} />
    </div>
  );
};

export default UserInput;
