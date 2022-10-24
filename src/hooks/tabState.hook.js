import { useState, useRef, useEffect } from 'react';

export const useCrossTabState = (stateKey,defaultValue) => {
  const [state,setState] = useState(defaultValue);
  const isNewSession = useRef(true);
  
  useEffect(()=>{
    if (isNewSession.current) {
      const currentState = localStorage.getItem(stateKey);

      if (currentState) {
        setState(JSON.parse(currentState));
      } else {
        setState(defaultValue);
      }
      isNewSession.current=false;
      return
    }

    try {
      localStorage.setItem(stateKey,JSON.stringify(state));
    } catch (error) {}

  }, [state, stateKey, defaultValue]);

  useEffect(()=>{
    const onReceieveNotes = (e) => {
      const { key, newValue } = e;
      if (key === stateKey) {
        setState(JSON.parse(newValue))
      } 
    }
      
    window.addEventListener('storage', onReceieveNotes);
    return () => window.removeEventListener('storage', onReceieveNotes);
    }, [stateKey,setState])

  return [state,setState];
}