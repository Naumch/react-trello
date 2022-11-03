import { useState, useContext } from 'react';
import MyContext from '../MyContext';
import { Button } from './Button';

function ModalDescr({ currentCard, currentList }) {
  const [value, setValue] = useState(currentCard.descr);
  const [readyToEditDescr, setReadyToEditDescr] = useState(true);
  const { notes, setNotes } = useContext(MyContext);

  const editDescrCard = (noteId, cardId, descr) => {
    let result = {...currentList, cards: [...currentList.cards.map(elem => {
      if (elem.id === cardId) {
        return {...elem, descr: descr};
      } else {
        return elem;
      }
    })]}

    setNotes(notes.map(elem => elem.id === noteId ? result : elem));
    setReadyToEditDescr(true);
  }

  return (
    <div className='modal__description'>
      <h4 style={{fontWeight: '500'}}>Описание</h4>
      {readyToEditDescr && currentCard.descr.length !== 0
        ? <p 
            onClick={() => setReadyToEditDescr(false)} 
            style={{marginTop: "8px", cursor: "pointer"}}
          >
            {currentCard.descr}
          </p>
        : <>
            <textarea 
              placeholder='Добавить более подробное описание...'
              className='modal__textarea'
              value={value}
              onChange={e => setValue(e.target.value)}
            ></textarea>
            <Button 
              text="Сохранить"
              className='button' 
              func={() => editDescrCard(currentList.id, currentCard.id, value)}
            />
          </>
      } 
    </div>
  )
}

export default ModalDescr;
