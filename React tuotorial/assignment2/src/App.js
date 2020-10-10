import React, { useState } from 'react';
import ValidationComponent from './ValidationComponent'
import CharComponent from './CharComponent'
const App = () => {
    const [inputState, setInputState] = useState({
        inputLength: 0,
        inputMessage: [],
    });
    const style = {
        display: 'inline-block',
        padding: '16px',
        // text-align:'center',
        margin: '16px',
        border: '1px',
        solid: 'black'
    };

    const inputHandeler = (evt) => {
        setInputState({
            inputLength: evt.target.value.length,
            inputMessage: evt.target.value.split(''),
        });
    };

    const clickHandeler = (index) => {
        let messages = [...inputState.inputMessage];
        messages.splice(index, 1);
        setInputState({
            inputLength: inputState.inputLength - 1,
            inputMessage: messages,
        });
    };

    return (
        <div>
            <input type="text" onChange={inputHandeler} />
            <ValidationComponent length={inputState.inputLength} />
            <div>
                {inputState.inputMessage.map((msg, index) => {git 
                    return (
                        <CharComponent key={index} message={msg} click={() => { clickHandeler(index) }} style={style} />
                    );
                })}
            </div>
        </div>
    );
};

export default App;