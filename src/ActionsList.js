import React from "react";

function ActionsList({ workingWithList, setWorkingWithList, note, notes, setNotes }) {

  return (
    workingWithList 
      ? <div className='list-actions'>
          <div className='list-actions__top'>
            <p className='list-actions__top-text'>Действия со списком</p>
            <button 
              onClick={() => setWorkingWithList(false)}
              className='list-actions__top-btn'
            >
              &#10006;
            </button>
          </div> 
          <ul className='list-actions__menu'>
            <li className='list-actions__menu-item'>
              Копировать список...
            </li>
            <li
              onClick={() => setNotes(notes.map(elem => {
                if (elem.id === note.id) {
                  return {...elem, cards: []};
                } else {
                  return elem;
                }
              }))}
              className='list-actions__menu-item'
            >
              Удалить все карточки списка...
            </li>
            <li 
              onClick={() => setNotes(notes.filter(elem => elem.id !== note.id))} 
              className='list-actions__menu-item'
            >
              Удалить список...
            </li>
          </ul>
        </div>
      : <></>  
  )
}

export default ActionsList;