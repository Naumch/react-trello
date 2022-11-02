import { useState, useContext } from 'react';
import Card from './Card';
import uniqid from 'uniqid';
import MyContext from '../MyContext';
import { useOutsideClick } from '../hooks/outsideClick.hook';
import HeaderList from './HeaderList';

function List({ note, listTitle, setListTitle }) {
  const { notes, setNotes } = useContext(MyContext);
  const [readyToAddCard, setReadyToAddCard] = useState(false);
  const [cardName, setCardName] = useState('');

  const addCard = (cardName) => {
    if (cardName.trim().length !== 0) {
      setNotes(notes.map(elem => {
        if (note.id === elem.id) {
          let obj = {id: uniqid(), cardName: cardName.trim(), descr: ''};
          return {...elem, cards: [...elem.cards, obj]};
        } else {
          return elem;
        }
      }))
    }
  }

  const checkKeydownEnter = (e, cardName) => {
    if (e.keyCode === 13) {
      addCard(cardName);
      setCardName('');
    }
  }

  const handleClickOutside = () => {
    setReadyToAddCard(false);
    setCardName('');
  };

  const ref = useOutsideClick(handleClickOutside);

  const cards = note.cards.map(card => {
    return (
      <Card 
        key={card.id} 
        card={card}
        note={note}
      />
    )
  })

  const handleChange = (e) => {
    if (!(e.nativeEvent.inputType === 'insertLineBreak')) {
      setCardName(e.target.value);
    }
  }

  return (
    <div className='list'>
      <HeaderList 
        note={note}
        listTitle={listTitle}
        setListTitle={setListTitle}
      />
      {cards}
      {readyToAddCard
        ? <div ref={ref}>
            <textarea 
              placeholder='Ввести заголовок для этой карточки'
              className='textarea'
              value={cardName}
              onChange={e => handleChange(e)}
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
    </div>
  )
}

export default List;