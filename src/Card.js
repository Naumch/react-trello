import React, { useState } from 'react';
import PopupCard from './PopupCard';

function Card({ card, note, notes, setNotes }) {
  const [opacityBtn, setOpacityBtn] = useState(0);
  const [readyToEditCard, setReadyToEditCard] = useState(false);
  const [cardName, setCardName] = useState('');
  const [readyToMoveCard, setReadyToMoveCard] = useState(false);

  function deleteCard(noteId, cardId) {
    setNotes(notes.map(elem => elem.id === noteId ? {...note, cards: [...note.cards.filter(res => res.id !== cardId)]} : elem));
  }

  function editCard(noteId, cardId, name) {
    let result = {...note, cards: [...note.cards.map(res => {
      if (res.id === cardId) {
        return {...res, cardName: name};
      } else {
        return res;
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
          <button className='button-black'>
            <span className='button-black__icon'>&#10004;</span>
            Открыть карточку
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
        {card.cardName}
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