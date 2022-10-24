import React, { useState } from "react";
import Lists from "./Lists";
import BtnAddList from "./BtnAddList";

function Main() {
  const [listTitle, setListTitle] = useState('');

  return (
    <div className="container">
      <div className='wrapper'>
        <Lists 
          listTitle={listTitle}
          setListTitle={setListTitle}
        />
        <BtnAddList 
          listTitle={listTitle}
          setListTitle={setListTitle}
        />
    </div>
    </div>
  )
}

export default Main;