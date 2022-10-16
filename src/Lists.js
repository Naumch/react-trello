import React from 'react';
import List from './List';

function Lists({ notes }) {

  const result = notes.map(note => {
    return (
      <List 
        key={note.id}
        id={note.id} 
        listTitle={note.listTitle}
        cards={note.cards}
      />
    )
  })

  return (
    <>{result}</>
  )
}

export default Lists;