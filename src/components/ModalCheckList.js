import { useState, useContext } from 'react';
import { Button } from './Button';
import { useOutsideClick } from '../hooks/outsideClick.hook';
import MyContext from '../MyContext';
import uniqid from 'uniqid';

function ModalCheckList({ currentCard, currentList }) {
  const { notes, setNotes } = useContext(MyContext);
  const [readyToAddTasks, setReadyToAddTasks] = useState(false);
  const [value, setValue] = useState('');

  const addTaskCard = (noteId, cardId, text) => {
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

  const editCheckCard = (noteId, cardId, taskId, check) => {
    let tasks = currentCard.checklist.map(elem => {
      if (elem.id === taskId) {
        return {...elem, check: !check}
      } else {
        return elem
      }
    })
    let result = {...currentList, cards: [...currentList.cards.map(elem => {
      if (elem.id === cardId) {
        return {...elem, checklist: tasks}
      } else {
        return elem
      }
    })]}
    setNotes(notes.map(elem => elem.id === noteId ? result : elem))
  }

  const tasks = currentCard.checklist.map(elem => {
    return (
      <li key={elem.id}>
        <input
          type="checkbox" 
          checked={elem.check} 
          id="check"
          onChange={() => editCheckCard(currentList.id, currentCard.id, elem.id, elem.check)}
        />
        <label 
          htmlFor='check' 
          style={{
            color: `${elem.check ? "#515d74" : "#000"}`,
            textDecoration: `${elem.check ? "line-through" : "none"}`,
            marginLeft: "8px" 
          }}
        >
          {elem.text}
        </label>
      </li>
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