import React, { useState } from 'react';
import Card from './Card';
import ListTitle from './ListTitle';
import uniqid from 'uniqid';

function List({ note, notes, setNotes, listTitle, setListTitle }) {
  const [readyToAddCard, setReadyToAddCard] = useState(false);
  const [cardName, setCardName] = useState('');
  const [workingWithList, setWorkingWithList] = useState(false);

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
      {workingWithList 
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
              <li className='list-actions__menu-item'>
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
      }
    </div>
  )
}

export default List;
/*function deleteList(noteId) {
  setNotes(notes.filter(elem => elem.id !== noteId));
}*/