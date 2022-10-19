import React, { useState } from "react";

function PopupList({ workingWithList, setWorkingWithList, note, notes, setNotes }) {
  const [readyToMoveCards, setReadyToMoveCards] = useState(false);

  function moveCards(currentNoteId, newNoteId) {

  }

  const items = notes.map(elem => {
    if (note.id === elem.id) {
      return (
        <li>{elem.listTitle} (текущий)</li>
      )
    } else {
      return (
        <li>{elem.listTitle}</li>
      )
    }
  })

  return (
    workingWithList 
      ? <div className='popup popup_list'>
          <div className='popup__top'>
            <p className='popup__top-text'>Действия со списком</p>
            <button 
              onClick={() => setWorkingWithList(false)}
              className='popup__top-btn'
            >
              &#10006;
            </button>
          </div> 
          <ul className='popup__menu'>
            <li onClick={() => moveCards()} className='popup__menu-item'>
              Переместить все карточки списка...
              <ul>
                {items}
              </ul>
            </li>
            <li
              onClick={() => {
                setNotes(notes.map(elem => elem.id === note.id ? {...elem, cards: []} : elem));
                setWorkingWithList(false);
            }}
              className='popup__menu-item'
            >
              Удалить все карточки списка...
            </li>
            <li 
              onClick={() => setNotes(notes.filter(elem => elem.id !== note.id))} 
              className='popup__menu-item'
            >
              Удалить список...
            </li>
          </ul>
        </div>
      : <></>  
  )
}

export default PopupList;