import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MyContext from '../MyContext';
import { useOutsideClick } from '../hooks/outsideClick.hook';

function Modal() {
  const navigate = useNavigate();
  const idList = useParams().idList;
  const idCard = useParams().idCard;

  const { notes, setNotes } = useContext(MyContext);

  const currentList = notes.filter(elem => elem.id === idList)[0];
  const currentCard = currentList.cards.filter(elem => elem.id === idCard)[0];
  const [value, setValue] = useState(currentCard.descr);
  const [readyToEditDescr, setReadyToEditDescr] = useState(true);

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

  const handleClickOutside = () => {
    navigate(-1);
  };

  const ref = useOutsideClick(handleClickOutside);

  return (
    <div className="modal-back">
      <div ref={ref} className="modal">
        <div className='modal__top'>
          <div className='modal__title'>
            <h3 style={{fontWeight: '500'}}>{currentCard.cardName}</h3>
            <p className='modal__title-descr'>в колонке {currentList.listTitle}</p>
          </div>
          <div className='modal__cancel'>
            <button onClick={() => navigate(-1)} 
              className="modal__cancel-btn"
            >
              &#10006;
            </button>
          </div>
        </div>
        <div className='modal__description'>
          <h4 style={{fontWeight: '500'}}>Описание</h4>
          {readyToEditDescr && currentCard.descr.length !== 0
            ? <p onClick={() => setReadyToEditDescr(false)} style={{marginTop: "8px"}}>{currentCard.descr}</p>
            : <>
                <textarea 
                  placeholder='Добавить более подробное описание...'
                  className='modal__textarea'
                  value={value}
                  onChange={e => setValue(e.target.value)}
                ></textarea>
                <button 
                  className='button' 
                  onClick={() => editDescrCard(currentList.id, currentCard.id, value)}
                >
                  Сохранить
                </button> 
              </>
          } 
        </div>
      </div>
    </div>
  )
}

export default Modal;