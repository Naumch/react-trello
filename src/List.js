import React, { useState } from 'react';
import Card from './Card';

function List({ note, notes, setNotes, listTitle, setListTitle }) {
  const [readyToEdit, setReadyToEdit] = useState(false);

  const result = note.cards.map(card => {
    return (
      <Card 
        key={card.id} 
        name={card.cardName}
      />
    )
  })

  function editTitle(e) {
    if (e.keyCode === 13) {
      setNotes(notes.map(res => {
        if (note.id === res.id) {
          return {...res, listTitle: listTitle};
        } else {
          return res;
        }
      }))
      setReadyToEdit(false);
      setListTitle('');
    }
  }

  return (
    <div className='list'>
      {readyToEdit 
        ? <input 
            value={listTitle} 
            onChange={e => setListTitle(e.target.value)}
            className='list-edit__input'
            onKeyDown={e => editTitle(e)}
          />
        : <div 
            className='list__title'
            onClick={() => {
              setListTitle(note.listTitle)
              setReadyToEdit(true);
            }}
          >
            {note.listTitle}
          </div>
      }
      {result}
      <button className='card-add__btn'>
        <span className='card-add__btn-span'>+</span>
        Добавить карточку
      </button>
    </div>
  )
}

export default List;