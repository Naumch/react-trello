import React from 'react';
import Card from './Card';

function List({ id, listTitle, cards }) {

  const result = cards.map(card => {
    return (
      <Card 
        key={card.id} 
        name={card.cardName}
      />
    )
  })

  return (
    <div className='list'>
      <div className='list__title'>{listTitle}</div>
      {result}
      <button className='card-add__btn'>
        <span className='card-add__btn-span'>+</span>
        Добавить карточку
      </button>
    </div>
  )
}

export default List;