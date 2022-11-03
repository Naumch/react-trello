import { useContext } from "react";
import MyContext from "../MyContext";
import PopupHeader from "./PopupHeader";
import { PopupItem } from "./PopupItem";

function PopupForCard ({ setReadyToMoveCard, card, note, deleteCard, setReadyToEditCard }) {
  const { notes, setNotes } = useContext(MyContext);

  const moveCard = (cardId, currentNoteId, newNoteId) => {
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
      return <PopupItem key={elem.id} text={elem.listTitle + " (текущий)"}/>
    } else {
      return <PopupItem key={elem.id} func={() => moveCard(card.id, note.id, elem.id)} text={elem.listTitle}/>
    }
  })

  return (
    <div className="popup popup_card">
      <PopupHeader 
        text="Перемещение карточки"
        funcClose={() => setReadyToMoveCard(false)}
      />
      <p className="popup__menu-title">Выберете список</p>
      <ul className="popup__menu">
        {items}
      </ul>
    </div>
  )
}

export default PopupForCard;