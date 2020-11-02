import React from 'react';

const backdrop = (props) => (
  props.show ? <div onclick={props.clicked}>{props.children}</div> : null
)

export default backdrop;