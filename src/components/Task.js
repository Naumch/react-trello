import { useState, useContext } from 'react';
import MyContext from '../MyContext';
import { Button } from './Button';
import { useOutsideClick } from '../hooks/outsideClick.hook';

function Task({ task, currentCard, currentList }) {
  const [opacityBtn, setOpacityBtn] = useState(0);
  const { notes, setNotes } = useContext(MyContext);
  const [readyEditTask, setReadyEditTask] = useState(false);
  const [value, setValue] = useState(task.text);

  const editCheckTask = (noteId, cardId, taskId, check) => {
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

  const editTask = (noteId, cardId, taskId, text) => {
    if (text.length !== 0) {
      let tasks = currentCard.checklist.map(elem => {
        if (elem.id === taskId) {
          return {...elem, text: text}
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
      setReadyEditTask(false)
    }
  }

  const deleteTask = (noteId, cardId, taskId) => {
    let tasks = currentCard.checklist.filter(elem => elem.id !== taskId)
    let result = {...currentList, cards: [...currentList.cards.map(elem => {
      if (elem.id === cardId) {
        return {...elem, checklist: tasks}
      } else {
        return elem
      }
    })]}

    setNotes(notes.map(elem => elem.id === noteId ? result : elem))
  }

  const checkKeydownEnter = (e, noteId, cardId, taskId, text) => {
    if (e.keyCode === 13) {
      editTask(noteId, cardId, taskId, text)
    }
  }

  const ref = useOutsideClick(() => setReadyEditTask(false));

  return (
    <li 
      className="checklist__item"
      onMouseEnter={() => setOpacityBtn(1)}
      onMouseLeave={() => setOpacityBtn(0)}
      ref={ref}
    >
      <input
        type="checkbox" 
        checked={task.check} 
        style={{marginTop: "6px"}}
        onChange={() => editCheckTask(currentList.id, currentCard.id, task.id, task.check)}
      />
      {readyEditTask 
        ? <div className='checklist-edit__box'>
            <input 
              value={value}
              onChange={e => setValue(e.target.value)}
              className="checklist-edit__input"
              onKeyDown={e => checkKeydownEnter(e, currentList.id, currentCard.id, task.id, value)}
            />
            <Button 
              text="Сохранить"
              className="button"
              func={() => editTask(currentList.id, currentCard.id, task.id, value)}
            />
            <Button 
              text="&#10006;"
              className="checklist-edit__btn-cancel" 
              func={() => setReadyEditTask(false)}
            />
          </div>
        : <span  
            style={{
              color: `${task.check ? "#515d74" : "#000"}`,
              textDecoration: `${task.check ? "line-through" : "none"}`
            }}
            className="checklist__label"
            onClick={() => setReadyEditTask(true)}
          >
            {task.text}
          </span>
      }
      <Button 
        text="&#10006;" 
        className="checklist__btn-delete"
        styleObj={{opacity: `${opacityBtn}`}}
        func={() => deleteTask(currentList.id, currentCard.id, task.id)}
      />
    </li>
  )
}

export default Task;