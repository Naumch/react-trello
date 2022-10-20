import React, { useState } from 'react';
import uniqid from 'uniqid';
import Main from './Main';
import Modal from './Modal';
import { Routes, Route, useLocation } from 'react-router-dom';

const initNotes = [
  {id: uniqid(), listTitle: 'ToDo', cards: [
    {id: uniqid(), cardName: 'Лечить Одрюшу', descr: ''}, 
    {id: uniqid(), cardName: 'Доделать Trello', descr: ''}
  ]},
  {id: uniqid(), listTitle: 'Doing', cards: [
    {id: uniqid(), cardName: 'Лежу на диване', descr: ''}
  ]}
]

function App() {
  const [notes, setNotes] = useState(initNotes);
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <>
      <Routes location={background || location}>
        <Route path='/' element={<Main notes={notes} setNotes={setNotes} />} />
        <Route path='/card/:idList/:idCard' element={<Modal />} />
      </Routes>
      {background && <Routes>
        <Route path="/card/:idList/:idCard" element={<Modal notes={notes} setNotes={setNotes} />} />
      </Routes>}
    </>
  );
}

export default App;
