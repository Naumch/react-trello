import React, { useState } from 'react';
import Card from './Card';
import ListTitle from './ListTitle';
import uniqid from 'uniqid';
import PopupList from './PopupList';

function List({ note, notes, setNotes, listTitle, setListTitle }) {
  const [readyToAddCard, setReadyToAddCard] = useState(false);
  const [cardName, setCardName] = useState('');
  const [workingWithList, setWorkingWithList] = useState(false);

  function addCard(cardName) {
    setNotes(notes.map(elem => {
      if (note.id === elem.id) {
        let obj = {id: uniqid(), cardName: cardName, descr: ''};
        return {...elem, cards: [...elem.cards, obj]};
      } else {
        return elem;
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
        card={card}
        note={note}
        notes={notes}
        setNotes={setNotes}
      />
    )
  })

  return (
    <div className='list'>
      <ListTitle 
        note={note}
        notes={notes}
        setNotes={setNotes}
        listTitle={listTitle}
        setListTitle={setListTitle}
        setWorkingWithList={setWorkingWithList}
      />
      {result}
      {readyToAddCard
        ? <div>
            <textarea 
              placeholder='Ввести заголовок для этой карточки'
              className='textarea'
              value={cardName}
              onChange={e => setCardName(e.target.value)}
              onKeyDown={e => checkKeydownEnter(e, cardName)}
            />
            <button 
              className='button'
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
      <PopupList 
        workingWithList={workingWithList}
        setWorkingWithList={setWorkingWithList}
        note={note}
        notes={notes}
        setNotes={setNotes}
      />
    </div>
  )
}

export default List;