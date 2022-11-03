import { useState, useContext } from 'react';
import uniqid from 'uniqid';
import MyContext from '../MyContext';
import { useOutsideClick } from '../hooks/outsideClick.hook';
import { Button } from './Button';

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
          <Button text="Добавить список" func={saveTitle} className="button"/>
          <Button text="&#10006;" func={stopSaveTitle} className="button-cancel"/>
        </div> 
      : <Button 
          text="Добавить список" 
          icon="+"
          func={() => setReadyToAddList(true)}
          className="button_transparent"  
          classNameIcon="button_transparent-plus" 
        />
  )
}

export default BtnAddList;