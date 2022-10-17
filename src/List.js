import React, { useState } from 'react';
import Card from './Card';
import uniqid from 'uniqid';

function List({ note, notes, setNotes, listTitle, setListTitle }) {
  const [readyToEditList, setReadyToEditList] = useState(false);
  const [readyToAddCard, setReadyToAddCard] = useState(false);
  const [cardName, setCardName] = useState('');

  function editTitle(e) {
    if (e.keyCode === 13) {
      setNotes(notes.map(res => {
        if (note.id === res.id) {
          return {...res, listTitle: listTitle};
        } else {
          return res;
        }
      }))
      setReadyToEditList(false);
      setListTitle('');
    }
  }

  function addCard(cardName) {
    setNotes(notes.map(res => {
      if (note.id === res.id) {
        let obj = {id: uniqid(), cardName: cardName};
        return {...res, cards: [...res.cards, obj]};
      } else {
        return res;
      }
    }))
  }

  function checkKeydownEnter(e, cardName) {
    if (e.keyCode === 13) {
      addCard(cardName);
      setCardName('');
    }
  }

  const result = note.cards.map(card => {
    return (
      <Card 
        key={card.id} 
        name={card.cardName}
      />
    )
  })

  return (
    <div className='list'>
      <div className='list__title'>
        {readyToEditList 
          ? <input 
              value={listTitle} 
              onChange={e => setListTitle(e.target.value)}
              className='list-edit__input'
              onKeyDown={e => editTitle(e)}
            />
          : <div
              onClick={() => {
                setListTitle(note.listTitle)
                setReadyToEditList(true);
              }}
              className='list__title-text'
            >
              {note.listTitle}
            </div>
        }
        <button className='list__title-btn'>&middot;&middot;&middot;</button>
      </div>
      {result}
      {readyToAddCard
        ? <div>
            <textarea 
              placeholder='Ввести заголовок для этой карточки'
              className='textarea'
              value={cardName}
              onChange={e => setCardName(e.target.value)}
              onKeyDown={e => checkKeydownEnter(e, cardName)}
            ></textarea>
            <button 
              className='button-add'
              onClick={() => {
                addCard(cardName);
                setCardName('');
              }}
            >
              Добавить карточку
            </button>
            <button 
              className='button-cancel'
              onClick={() => {
                setReadyToAddCard(false);
                setCardName('');
              }}
            >
              &#10006;
            </button>
          </div>
        : <button 
            className='card-add__btn'
            onClick={() => setReadyToAddCard(true)}
          >
            <span className='card-add__btn-span'>+</span>
            Добавить карточку
          </button>
      }
    </div>
  )
}

export default List;