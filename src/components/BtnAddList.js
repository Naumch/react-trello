import { useState, useContext } from 'react';
import uniqid from 'uniqid';
import MyContext from '../MyContext';
import { useOutsideClick } from '../hooks/outsideClick.hook';

function BtnAddList({ listTitle, setListTitle }) {
  const { notes, setNotes } = useContext(MyContext);
  const [readyToAddList, setReadyToAddList] = useState(false);

  const stopSaveTitle = () => {
    setReadyToAddList(false);
    setListTitle('');
  };

  const saveTitle = () => {
    if (listTitle.length !== 0) {
      setNotes([...notes, {id: uniqid(), listTitle: listTitle, cards: []}]);
      stopSaveTitle();
    }
  };

  const checkKeydownEnter = (e) => {
    if (e.keyCode === 13) {
      saveTitle();
    }
  };

  const ref = useOutsideClick(stopSaveTitle);

  return (
    readyToAddList
      ? <div ref={ref} className='list-add'>
          <input 
            placeholder='Ввести заголовок списка'
            className='list-add__input' 
            value={listTitle} 
            onChange={e => setListTitle(e.target.value)}
            onKeyDown={e => checkKeydownEnter(e)}
          />
          <button 
            className='button'
            onClick={saveTitle}
          >
            Добавить список
          </button>
          <button 
            className='button-cancel'
            onClick={stopSaveTitle}
          >
            &#10006;
          </button>
        </div> 
      : <button onClick={() => setReadyToAddList(true)} className="button_transparent">
          <span className='button_transparent-plus'>+</span>Добавить список
        </button>
  )
}

export default BtnAddList;