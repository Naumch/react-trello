import { useState, useContext } from "react";
import BtnAddList from "./BtnAddList";
import List from './List';
import MyContext from '../MyContext';

function Main() {
  const [listTitle, setListTitle] = useState('');
  const { notes } = useContext(MyContext);

  const lists = notes.map(note => {
    return (
      <List 
        key={note.id}
        note={note}
        listTitle={listTitle}
        setListTitle={setListTitle}
      />
    )
  })

  return (
    <div className="container">
      <div className='wrapper'>
        {lists}
        <BtnAddList 
          listTitle={listTitle}
          setListTitle={setListTitle}
        />
      </div>
    </div>
  )
}

export default Main;