import React, { useState } from 'react';
import uniqid from 'uniqid';

function BtnAddList({ notes, setNotes, listTitle, setListTitle }) {
  const [readyToAdd, setReadyToAdd] = useState(false);

  function saveTitle(e) {
    if (e.keyCode === 13) {
      setNotes([...notes, {id: uniqid(), listTitle: listTitle, cards: []}]);
      setReadyToAdd(false);
      setListTitle('');
    }
  }

  return (
    readyToAdd
      ? <div className='list-add'>
          <input 
            placeholder='Ввести заголовок списка'
            className='list-add__input' 
            value={listTitle} 
            onChange={e => setListTitle(e.target.value)}
            onKeyDown={e => saveTitle(e)}
          />
          <button 
            className='list-add__btn-add'
            onClick={() => {
              setNotes([...notes, {id: uniqid(), listTitle: listTitle, cards: []}]);
              setReadyToAdd(false);
              setListTitle('');
            }}
          >
            Добавить список
          </button>
          <button 
            className='list-add__btn-cancel'
            onClick={() => {
              setReadyToAdd(false);
              setListTitle('');
            }}
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