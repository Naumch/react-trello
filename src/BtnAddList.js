import React, { useState } from 'react';
import uniqid from 'uniqid';

function BtnAddList({ notes, setNotes, listTitle, setListTitle }) {
  const [readyToAddList, setReadyToAddList] = useState(false);

  function saveTitle(e) {
    if (e.keyCode === 13) {
      setNotes([...notes, {id: uniqid(), listTitle: listTitle, cards: []}]);
      setReadyToAddList(false);
      setListTitle('');
    }
  }

  return (
    readyToAddList
      ? <div className='list-add'>
          <input 
            placeholder='Ввести заголовок списка'
            className='list-add__input' 
            value={listTitle} 
            onChange={e => setListTitle(e.target.value)}
            onKeyDown={e => saveTitle(e)}
          />
          <button 
            className='button-add'
            onClick={() => {
              setNotes([...notes, {id: uniqid(), listTitle: listTitle, cards: []}]);
              setReadyToAddList(false);
              setListTitle('');
            }}
          >
            Добавить список
          </button>
          <button 
            className='button-cancel'
            onClick={() => {
              setReadyToAddList(false);
              setListTitle('');
            }}
          >
            &#10006;
          </button>
        </div> 
      : <button onClick={() => setReadyToAddList(true)} className="button_transparent">
          <span className='button_transparent-plus'>+</span>Добавить список
        </button>
  )
}

export default BtnAddList;