import React, { useState } from 'react';
import uniqid from 'uniqid';
import BtnAddList from './BtnAddList';
import Lists from './Lists';

const initNotes = [
  {id: uniqid(), listTitle: 'ToDo', cards: [
    {id: uniqid(), cardName: 'Лечить Одрюшу'}
  ]}
]

function App() {
  const [notes, setNotes] = useState(initNotes);

  return (
    <div className='container'>
      <div className='wrapper'>
        <Lists notes={notes}/>
        <BtnAddList notes={notes} setNotes={setNotes}/>
      </div>
    </div>
  );
}

export default App;
