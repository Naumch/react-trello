import React, { useState } from 'react';
import uniqid from 'uniqid';

function BtnAddList({ notes, setNotes }) {
  const [readyToAdd, setReadyToAdd] = useState(false);
  const [listTitle, setListTitle] = useState('');

  return (
    readyToAdd
      ? <div className='list-add'>
          <input 
            placeholder='Ввести заголовок списка'
            className='list-add__input' 
            value={listTitle} 
            onChange={e => setListTitle(e.target.value)}
          />
          <button 
            className='list-add__btn-add'
            onClick={() => {
              setNotes([...notes, {id: uniqid(), listTitle: listTitle, cards: []}]);
              setReadyToAdd(false);
            }}
          >
            Добавить список
          </button>
          <button 
            className='list-add__btn-cancel'
            onClick={() => setReadyToAdd(false)}
          >
            &#10006;
          </button>
        </div> 
      : <button onClick={() => setReadyToAdd(true)} className="button_transparent">
          <span className='button_transparent-plus'>+</span>Добавить список
        </button>
  )
}

export default BtnAddList;