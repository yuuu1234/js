import React from 'react';

const CharComponent = (props) => {
    return (
        <div onClick = {props.click}>
            {props.message}
        </div>
    );

};

export default CharComponent;