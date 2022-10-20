import React, { useState } from "react";
import Lists from "./Lists";
import BtnAddList from "./BtnAddList";

function Main({ notes, setNotes }) {
  const [listTitle, setListTitle] = useState('');

  return (
    <div className="container">
      <div className='wrapper'>
        <Lists 
          notes={notes}
          setNotes={setNotes}
          listTitle={listTitle}
          setListTitle={setListTitle}
        />
        <BtnAddList 
          notes={notes} 
          setNotes={setNotes}
          listTitle={listTitle}
          setListTitle={setListTitle}
        />
    </div>
    </div>
  )
}

export default Main;