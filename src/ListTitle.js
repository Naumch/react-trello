import React, { useState } from "react";

function ListTitle({ note, notes, setNotes, listTitle, setListTitle, setWorkingWithList }) {
  const [readyToEditList, setReadyToEditList] = useState(false);

  function editTitle(e) {
    if (e.keyCode === 13) {
      setNotes(notes.map(elem => {
        if (note.id === elem.id) {
          return {...elem, listTitle: listTitle};
        } else {
          return elem;
        }
      }))
      setReadyToEditList(false);
      setListTitle('');
    }
  }

  return (
    <div className='list__title'>
      {readyToEditList 
        ? <input 
            value={listTitle} 
            onChange={e => setListTitle(e.target.value)}
            className='list-edit__input'
            onKeyDown={e => editTitle(e)}
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