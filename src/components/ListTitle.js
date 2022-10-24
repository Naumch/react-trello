import React, { useState, useContext } from "react";
import MyContext from "../MyContext";
import { useOutsideClick } from '../hooks/outsideClick.hook';

function ListTitle({ note, listTitle, setListTitle, setWorkingWithList }) {
  const { notes, setNotes } = useContext(MyContext);
  const [readyToEditList, setReadyToEditList] = useState(false);

  function editTitle() {
    setNotes(notes.map(elem => note.id === elem.id ? {...elem, listTitle: listTitle} : elem))
    setReadyToEditList(false);
    setListTitle('');
  }

  function checkKeydownEnter(e) {
    if (e.keyCode === 13) {
      editTitle();
    }
  }

  function handleClickOutside() {
    setReadyToEditList(false);
    setListTitle('');
  };

  const ref = useOutsideClick(handleClickOutside);

  return (
    <div className='list__title'>
      {readyToEditList 
        ? <input 
            value={listTitle} 
            onChange={e => setListTitle(e.target.value)}
            className='list-edit__input'
            onKeyDown={e => checkKeydownEnter(e)}
            ref={ref}
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
      <button onClick={() => setWorkingWithList(true)} className='list__title-btn'>
        &middot;&middot;&middot;
      </button>
    </div>
  )
}

export default ListTitle;