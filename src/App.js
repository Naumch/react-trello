import React, { useState } from 'react';
import uniqid from 'uniqid';
import BtnAddList from './BtnAddList';

const initNotes = [
  {id: uniqid(), listTitle: ''}
]

function App() {
  const [notes, setNotes] = useState(initNotes);

  return (
    <div className='container'>
      <BtnAddList notes={notes} setNotes={setNotes}/>
    </div>
  );
}

export default App;
