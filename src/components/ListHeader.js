import { useState, useContext } from "react";
import MyContext from "../MyContext";
import { useOutsideClick } from '../hooks/outsideClick.hook';
import PopupForList from "./PopupForList";
import { Button } from "./Button";

function ListHeader({ note, listTitle, setListTitle }) {
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
      <Button text="&middot;&middot;&middot;" func={() => setWorkingWithList(true)} className='list__title-btn' />
      {workingWithList &&
        <PopupForList 
          setWorkingWithList={setWorkingWithList}
          note={note}
        />
      }
    </div>
  )
}

export default ListHeader;