import { useState, useContext } from "react";
import MyContext from "../MyContext";
import { useOutsideClick } from '../hooks/outsideClick.hook';
import PopupList from "./PopupList";

function HeaderList({ note, listTitle, setListTitle }) {
  const { notes, setNotes } = useContext(MyContext);
  const [readyToEditList, setReadyToEditList] = useState(false);
  const [workingWithList, setWorkingWithList] = useState(false);

  const stopEditTitle = () => {
    setReadyToEditList(false);
    setListTitle('');
  };

  const editTitle = () => {
    setNotes(notes.map(elem => note.id === elem.id ? {...elem, listTitle: listTitle} : elem))
    stopEditTitle();
  }

  const checkKeydownEnter = (e) => {
    if (e.keyCode === 13) {
      editTitle();
    }
  }

  const ref = useOutsideClick(stopEditTitle);

  return (
    <div className='list__title'>
      {readyToEditList 
        ? <input 
            value={listTitle} 
            onChange={e => setListTitle(e.target.value)}
            className='list-edit__input'
            onKeyDown={e => checkKeydownEnter(e)}
            ref={ref}
          />
        : <div
            onClick={() => {
              setListTitle(note.listTitle)
              setReadyToEditList(true);
            }}
            className='list__title-text'
          >
            {note.listTitle}
          </div>
      }
      <button onClick={() => setWorkingWithList(true)} className='list__title-btn'>
        &middot;&middot;&middot;
      </button>
      {workingWithList &&
        <PopupList 
          setWorkingWithList={setWorkingWithList}
          note={note}
        />
      }
    </div>
  )
}

export default HeaderList;