import React, { useState } from 'react';
import PopupCard from './PopupCard';
import { Link, useLocation } from 'react-router-dom';

function Card({ card, note, notes, setNotes }) {
  const [opacityBtn, setOpacityBtn] = useState(0);
  const [readyToEditCard, setReadyToEditCard] = useState(false);
  const [cardName, setCardName] = useState('');
  const [readyToMoveCard, setReadyToMoveCard] = useState(false);

  const location = useLocation();

  function deleteCard(noteId, cardId) {
    setNotes(notes.map(elem => elem.id === noteId ? {...note, cards: [...note.cards.filter(res => res.id !== cardId)]} : elem));
  }

  function editCard(noteId, cardId, name) {
    let result = {...note, cards: [...note.cards.map(elem => {
      if (elem.id === cardId) {
        return {...elem, cardName: name};
      } else {
        return elem;
      }
    })]}

    setNotes(notes.map(elem => elem.id === noteId ? result : elem));
    setReadyToEditCard(false);
    setCardName('');
  }

  function checkKeydownEnter(e, noteId, cardId, name) {
    if (e.keyCode === 13) {
      editCard(noteId, cardId, name);
      setReadyToEditCard(false);
      setCardName('');
    }
  }

  return (
    readyToEditCard 
    ? <div className='box-textarea'>
        <textarea 
          value={cardName} 
          className='textarea'
          onChange={e => setCardName(e.target.value)}
          onKeyDown={e => checkKeydownEnter(e, note.id, card.id, cardName)}
        />
        <button onClick={() => editCard(note.id, card.id, cardName)} className='button'>Сохранить</button>
        <div className='wrapper__button-black'> 
          <button className='button-black' onClick={() => setReadyToEditCard(false)}>
            <Link to={{pathname: `/card/${note.id}/${card.id}`}} state={{ background: location }}>
              <span className='button-black__icon'>&#10004;</span>
              Открыть карточку
            </Link>
          </button>
          <button onClick={() => setReadyToMoveCard(true)} className='button-black'>
            <span className='button-black__icon'>&#8617;</span>
            Переместить
          </button>
          <button onClick={() => deleteCard(note.id, card.id)} className='button-black'>
            <span className='button-black__icon'>&#10008;</span>
            Удалить
          </button>
        </div>
        <PopupCard 
          readyToMoveCard={readyToMoveCard}
          setReadyToMoveCard={setReadyToMoveCard}
          card={card}
          note={note}
          notes={notes}
          setNotes={setNotes}
          deleteCard={deleteCard}
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
          {card.descr.length !== 0 ? <div style={{marginTop: "2px"}}>&#9776;</div> : <></>}
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