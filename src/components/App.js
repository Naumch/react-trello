import React from 'react';
import Main from './Main';
import Modal from './Modal';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useCrossTabState } from '../hooks/tabState.hook';

function App() {
  const [notes, setNotes] = useCrossTabState("notes", []);

  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <>
      <Routes location={background || location}>
        <Route exact path='/card/:idList/:idCard' element={<Modal />} />
        <Route exact path='/' element={<Main notes={notes} setNotes={setNotes} />} />
      </Routes>
      {background && <Routes>
        <Route exact path="/card/:idList/:idCard" element={<Modal notes={notes} setNotes={setNotes} />} />
      </Routes>}
    </>
  );
}

export default App;
