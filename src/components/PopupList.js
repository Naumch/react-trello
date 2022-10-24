import React, { useState, useContext } from "react";
import MyContext from "../MyContext";
import { useOutsideClick } from '../hooks/outsideClick.hook';

function PopupList({ workingWithList, setWorkingWithList, note }) {
  const { notes, setNotes } = useContext(MyContext);
  const [readyToMoveCards, setReadyToMoveCards] = useState(false);

  function moveCards(currentNoteId, newNoteId) {
    const copyCard = notes.filter(elem => elem.id === currentNoteId)[0].cards;

    setNotes(notes.map(elem => elem.id === currentNoteId ? {...elem, cards: []} : elem));
    setNotes(prevState => prevState.map(elem => {
      if (newNoteId === elem.id) {
        return {...elem, cards: [...elem.cards, ...copyCard]}
      } else {
        return elem;
      }
    }))
    setReadyToMoveCards(false);
  }

  const items = notes.map(elem => {
    if (note.id === elem.id) {
      return (
        <li
          key={elem.id}
          className='popup__menu-item'
        >
          {elem.listTitle} (текущий)
        </li>
      )
    } else {
      return (
        <li
          key={elem.id}
          className='popup__menu-item'
          onClick={() => moveCards(note.id, elem.id)}
        >
          {elem.listTitle}
        </li>
      )
    }
  })

  function handleClickOutside() {
    setWorkingWithList(false);
    setReadyToMoveCards(false);
  };

  const ref = useOutsideClick(handleClickOutside);

  return (
    <>
      {workingWithList 
      ? <div ref={ref} className='popup popup_list'>
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
            <li 
              onClick={() => {
                setWorkingWithList(false);
                setReadyToMoveCards(true);
              }} 
              className='popup__menu-item'
            >
              Переместить все карточки списка...
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
      }
      {readyToMoveCards
        ? <div ref={ref} className="popup popup_list">
            <div className="popup__top">
              <button 
                onClick={() => {
                  setReadyToMoveCards(false);
                  setWorkingWithList(true);
                }}
                className='popup__top-btn popup__top-btn_back'
              >
                &lsaquo;
              </button>
              <p className='popup__top-text'>Переместить все карточки в список</p>
              <button 
                onClick={() => setReadyToMoveCards(false)}
                className='popup__top-btn'
              >
                &#10006;
              </button>
            </div>
            <ul className="popup__menu">
              {items}
            </ul>
          </div>
        : <></>
      }
    </>
  )
}

export default PopupList;