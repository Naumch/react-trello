import React, { useState, useEffect, useRef } from 'react';
import Main from './Main';
import Modal from './Modal';
import { Routes, Route, useLocation } from 'react-router-dom';

function useCrossTabState(stateKey,defaultValue) {
  const [state,setState] = useState(defaultValue);
  const isNewSession = useRef(true);
  
  useEffect(()=>{
    if(isNewSession.current){
      const currentState = localStorage.getItem(stateKey)
      if(currentState) {
        setState(JSON.parse(currentState));
      } else {
        setState(defaultValue);
      }
      isNewSession.current=false;
      return
    }

    try{
      localStorage.setItem(stateKey,JSON.stringify(state));
    } catch(error) {}

  }, [state, stateKey, defaultValue]);

  useEffect(()=>{
    const onReceieveNotes = (e) => {
      const {key, newValue} = e;
      if (key === stateKey) {
        setState(JSON.parse(newValue))
      } 
    }
      
    window.addEventListener('storage', onReceieveNotes);
    return () => window.removeEventListener('storage', onReceieveNotes);
    }, [stateKey,setState])

  return [state,setState];
}

function App() {
  const [notes, setNotes] = useCrossTabState("notes", []);

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
