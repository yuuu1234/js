import React from 'react';

const ValidationComponent = (props) => {
    let message = null;

    if (props.length < 5) {
        message = 'Text too short!';
    } else if (props.length >= 10) {
        message = 'Text long enough!';
    }

    return (
        <div>
            {message}
        </div>
    );

};

export default ValidationComponent;