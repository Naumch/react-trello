import React, { useState } from 'react';

function Card({ name }) {
  const [opacityBtn, setOpacityBtn] = useState(0);
  const [readyToEditCard, setReadyToEditCard] = useState(false);

  return (
    <div 
      className='card'
      onMouseEnter={() => setOpacityBtn(1)}
      onMouseLeave={() => setOpacityBtn(0)}
    >
      {name}
      <button 
        className='card-edit__btn'
        style={{opacity: `${opacityBtn}`}}
        onClick={() => setReadyToEditCard(true)}
      >
        &#10000;
      </button>
    </div>
  )
}

export default Card;