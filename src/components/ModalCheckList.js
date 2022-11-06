import { useState, useContext } from 'react';
import { Button } from './Button';
import { useOutsideClick } from '../hooks/outsideClick.hook';
import MyContext from '../MyContext';
import uniqid from 'uniqid';
import Task from './Task';

function ModalCheckList({ currentCard, currentList }) {
  const { notes, setNotes } = useContext(MyContext);
  const [readyToAddTasks, setReadyToAddTasks] = useState(false);
  const [value, setValue] = useState('');

  const addTaskCard = (noteId, cardId, text) => {
    if (text.length !== 0) {
      let obj = {id: uniqid(), check: false, text: text};
      let result = {...currentList, cards: [...currentList.cards.map(elem => {
        if (elem.id === cardId) {
          return {...elem, checklist: [...elem.checklist, obj]}
        } else {
          return elem;
        }
      })]}

      setNotes(notes.map(elem => elem.id === noteId ? result : elem));
      setValue('');
    }
  }

  const checkKeydownEnter = (e, noteId, cardId, text) => {
    if (e.keyCode === 13) {
      addTaskCard(noteId, cardId, text)
    }
  }

  const tasks = currentCard.checklist.map(task => {
    return (
      <Task
        key={task.id}
        task={task}
        currentCard={currentCard}
        currentList={currentList}
      />
    )
  })

  const ref = useOutsideClick(() => setReadyToAddTasks(false));

  return (
    <div className='modal__checklist'>
      <h4 className='modal__subtitle'>Чек-лист</h4>
      <ul style={{marginBottom: "10px"}}>{tasks}</ul>
      {readyToAddTasks
        ? <div ref={ref}>
            <input
              placeholder='Добавить задачу'
              className='modal__input'
              value={value}
              onChange={e => setValue(e.target.value)}
              onKeyDown={e => checkKeydownEnter(e, currentList.id, currentCard.id, value)}
            />
            <Button
              text="Добавить"
              className="button"
              func={() => addTaskCard(currentList.id, currentCard.id, value)}
            />
            <Button
              text="Отмена"
              className="button-cancel"
              func={() => setReadyToAddTasks(false)}
            />
          </div>
        : <Button 
            text="Добавить задачу"
            func={() => setReadyToAddTasks(true)}
            className="button-grey"
          />
      }
    </div>
  )
}

export default ModalCheckList;