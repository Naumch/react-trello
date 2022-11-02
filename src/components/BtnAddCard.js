import { useState, useContext } from 'react';
import uniqid from 'uniqid';
import MyContext from '../MyContext';
import { useOutsideClick } from '../hooks/outsideClick.hook';

function BtnAddCard({ note }) {
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

  const stopAddCard = () => {
    setReadyToAddCard(false);
    setCardName('');
  };

  const ref = useOutsideClick(stopAddCard);

  const handleChange = (e) => {
    if (!(e.nativeEvent.inputType === 'insertLineBreak')) {
      setCardName(e.target.value);
    }
  }

  return (
    readyToAddCard
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
            onClick={stopAddCard}
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
  )
}

export default BtnAddCard;