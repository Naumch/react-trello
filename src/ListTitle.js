import React, { useState } from "react";

function ListTitle({ note, notes, setNotes, listTitle, setListTitle }) {
  const [readyToEditList, setReadyToEditList] = useState(false);

  function editTitle(e) {
    if (e.keyCode === 13) {
      setNotes(notes.map(res => {
        if (note.id === res.id) {
          return {...res, listTitle: listTitle};
        } else {
          return res;
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
      <button className='list__title-btn'>&middot;&middot;&middot;</button>
    </div>
  )
}

export default ListTitle;