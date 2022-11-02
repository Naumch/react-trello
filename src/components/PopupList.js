import { useState, useContext } from "react";
import MyContext from "../MyContext";
import { useOutsideClick } from '../hooks/outsideClick.hook';
import { PopupItem } from "./PopupItem";

function PopupList({ setWorkingWithList, note }) {
  const { notes, setNotes } = useContext(MyContext);
  const [readyToMoveCards, setReadyToMoveCards] = useState(false);

  const moveCards = (currentNoteId, newNoteId) => {
    const copyCard = notes.filter(elem => elem.id === currentNoteId)[0].cards;

    setNotes(notes.map(elem => elem.id === currentNoteId ? {...elem, cards: []} : elem));
    setNotes(prevState => prevState.map(elem => {
      if (newNoteId === elem.id) {
        return {...elem, cards: [...elem.cards, ...copyCard]}
      } else {
        return elem;
      }
    }))
    setWorkingWithList(false);
  }

  const deleteCards = () => {
    setNotes(notes.map(elem => elem.id === note.id ? {...elem, cards: []} : elem));
    setWorkingWithList(false);
  }

  const items = notes.map(elem => {
    if (note.id === elem.id) {
      return <PopupItem key={elem.id} text={elem.listTitle + " (текущий)"}/>
    } else {
      return <PopupItem key={elem.id} func={() => moveCards(note.id, elem.id)} text={elem.listTitle}/>
    }
  })

  const ref = useOutsideClick(() => setWorkingWithList(false));

  return (
    <>
      <div ref={ref} className='popup popup_list'>
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
          <PopupItem 
            text="Переместить все карточки списка..."
            func={() => setReadyToMoveCards(true)} 
          />
          <PopupItem 
            text="Удалить все карточки списка..."
            func={deleteCards}
          />
          <PopupItem 
            text="Удалить список..."
            func={() => setNotes(notes.filter(elem => elem.id !== note.id))}
          />
        </ul>
      </div>  
      {readyToMoveCards &&
        <div ref={ref} className="popup popup_list">
          <div className="popup__top">
            <button 
              onClick={() => setReadyToMoveCards(false)}
              className='popup__top-btn popup__top-btn_back'
            >
              &lsaquo;
            </button>
            <p className='popup__top-text'>Переместить все карточки в список</p>
            <button 
              onClick={() => setWorkingWithList(false)}
              className='popup__top-btn'
            >
              &#10006;
            </button>
          </div>
          <ul className="popup__menu">
            {items}
          </ul>
        </div>
      }
    </>
  )
}

export default PopupList;