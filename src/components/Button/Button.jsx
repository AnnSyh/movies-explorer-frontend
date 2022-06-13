import React from 'react';

function Button({ title, btnClass, handleClick, btnDisabled}) {
  return (

    <button 
      className={btnClass} 
      onClick={handleClick} 
      disabled={btnDisabled} >
      {title}
    </button>
  );
}

export default Button;