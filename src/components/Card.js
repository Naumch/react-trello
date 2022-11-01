import { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MyContext from '../MyContext';
import { useOutsideClick } from "../hooks/outsideClick.hook";
import { BlackButtons } from './BlackButtons';

function Card({ card, note }) {
  const { notes, setNotes } = useContext(MyContext);
  const [opacityBtn, setOpacityBtn] = useState(0);
  const [readyToEditCard, setReadyToEditCard] = useState(false);
  const [cardName, setCardName] = useState('');

  const location = useLocation();

  const editCard = (noteId, cardId, name) => {
    if (name.trim().length !== 0) {
      let result = {...note, cards: [...note.cards.map(elem => elem.id === cardId ? {...elem, cardName: name.trim()} : elem)]}  
      setNotes(notes.map(elem => elem.id === noteId ? result : elem));
      setReadyToEditCard(false);
      setCardName('');
    }
  }

  const checkKeydownEnter = (e, noteId, cardId, name) => {
    if (e.keyCode === 13) {
      editCard(noteId, cardId, name);
    }
  }

  const ref = useOutsideClick(() => setReadyToEditCard(false));

  return (
    readyToEditCard 
    ? <div ref={ref} className='box-textarea'>
        <textarea 
          value={cardName} 
          className='textarea'
          onChange={e => setCardName(e.target.value)}
          onKeyDown={e => checkKeydownEnter(e, note.id, card.id, cardName)}
        />
        <button onClick={() => editCard(note.id, card.id, cardName)} className='button'>Сохранить</button>
        <BlackButtons 
          card={card}
          note={note}
          location={location}
          setReadyToEditCard={setReadyToEditCard}
        />
      </div>
    : <div 
        className='card'
        onMouseEnter={() => setOpacityBtn(1)}
        onMouseLeave={() => setOpacityBtn(0)}
      >       
        <Link 
          to={{pathname: `/card/${note.id}/${card.id}`}} 
          state={{ background: location }} 
          style={{flexGrow: 1}}
        >
          {card.cardName}
          {card.descr.length !== 0 && <div style={{marginTop: "2px"}}>&#9776;</div>}
        </Link>
        <button 
          className='card-edit__btn'
          style={{opacity: `${opacityBtn}`}}
          onClick={() => {
            setCardName(card.cardName);
            setReadyToEditCard(true);
          }}
        >
          &#10000;
        </button>
      </div>
  )
}

export default Card;