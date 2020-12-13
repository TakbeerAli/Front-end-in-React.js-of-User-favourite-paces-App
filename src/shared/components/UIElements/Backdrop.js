import React from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.css';

{/* when someone click on background whe sidebar open it will close them */} 
const Backdrop = props => {
  return ReactDOM.createPortal(   
    <div className="backdrop" onClick={props.onClick}></div>, 
    document.getElementById('backdrop-hook')
  );
};

export default Backdrop;
