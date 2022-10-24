import React, { useContext } from "react";
import MyContext from "../MyContext";

function PopupCard ({ readyToMoveCard, setReadyToMoveCard, card, note, deleteCard, setReadyToEditCard }) {
  const { notes, setNotes } = useContext(MyContext);

  function moveCard(cardId, currentNoteId, newNoteId) {
    const copyList = notes.filter(elem => elem.id === currentNoteId);
    const copyCard = copyList[0].cards.filter(elem => elem.id === cardId)[0];

    deleteCard(currentNoteId, cardId);
    setNotes(prevState => prevState.map(elem => {
      if (newNoteId === elem.id) {
        return {...elem, cards: [...elem.cards, copyCard]};
      } else {
        return elem;
      }
    }));
    setReadyToEditCard(false);
  }

  const items = notes.map(elem => {
    if (elem.id === note.id) {
      return (
        <li 
          key={elem.id}
          className="popup__menu-item"
          
        >
          {elem.listTitle} (текущий)
        </li>
      )
    } else {
      return (
        <li 
          key={elem.id}
          className="popup__menu-item"
          onClick={() => moveCard(card.id, note.id, elem.id)}
        >
          {elem.listTitle}
        </li>
      )
    }
  })

  return (
    readyToMoveCard
      ? <div className="popup popup_card">
          <div className="popup__top">
            <p className="popup__top-text">Перемещение карточки</p>
            <button
              onClick={() => setReadyToMoveCard(false)}
              className='popup__top-btn'
            >
              &#10006;
            </button>
          </div>
          <p className="popup__menu-title">Выберете список</p>
            <ul className="popup__menu">
              {items}
            </ul>
        </div>
      : <></>
  )
}

export default PopupCard;