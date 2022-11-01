import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import PopupCard from './PopupCard';
import MyContext from '../MyContext';
import { Button } from './Button';

export function BlackButtons({ card, note, location, setReadyToEditCard }) {
  const { notes, setNotes } = useContext(MyContext);
  const [readyToMoveCard, setReadyToMoveCard] = useState(false);

  const deleteCard = (noteId, cardId) => {
    setNotes(notes.map(elem => elem.id === noteId ? {...note, cards: [...note.cards.filter(res => res.id !== cardId)]} : elem));
  }

  return (
    <>
      <div className='wrapper__button-black'> 
        <Link 
          to={{pathname: `/card/${note.id}/${card.id}`}} 
          state={{ background: location }}
        >
          <Button 
            func={() => setReadyToEditCard(false)} 
            icon="&#10004;" 
            text="Открыть карточку"
          />
        </Link>
        <Button 
          func={() => setReadyToMoveCard(true)} 
          icon="&#8617;" 
          text="Переместить"
        />
        <Button 
          func={() => deleteCard(note.id, card.id)} 
          icon="&#10008;" 
          text="Удалить"
        />
      </div>
      {readyToMoveCard &&
        <PopupCard 
          setReadyToMoveCard={setReadyToMoveCard}
          card={card}
          note={note}
          deleteCard={deleteCard}
          setReadyToEditCard={setReadyToEditCard}
        />
      }
    </>
  )
}