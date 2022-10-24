import React, { useMemo } from 'react';
import Main from './Main';
import Modal from './Modal';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useCrossTabState } from '../hooks/tabState.hook';
import MyContext from '../MyContext';

function App() {
  const [notes, setNotes] = useCrossTabState("notes", []);
  const value = useMemo(
    () => ({ notes, setNotes }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [notes]
  )
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <MyContext.Provider value={value}>
      <Routes location={background || location}>
        <Route exact path='/card/:idList/:idCard' element={<Modal />} />
        <Route exact path='/' element={<Main />} />
      </Routes>
      {background && <Routes>
        <Route exact path="/card/:idList/:idCard" element={<Modal />} />
      </Routes>}
    </MyContext.Provider>
  );
}

export default App;
