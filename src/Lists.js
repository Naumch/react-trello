import React from 'react';
import List from './List';

function Lists({ notes, setNotes, listTitle, setListTitle }) {

  const result = notes.map(note => {
    return (
      <List 
        key={note.id}
        note={note}
        notes={notes}
        setNotes={setNotes}
        listTitle={listTitle}
        setListTitle={setListTitle}
      />
    )
  })

  return (
    <>{result}</>
  )
}

export default Lists;