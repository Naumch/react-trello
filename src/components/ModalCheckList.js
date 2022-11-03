import { useState } from 'react';
import { Button } from './Button';
import { useOutsideClick } from '../hooks/outsideClick.hook';

function ModalCheckList() {
  const [readyToAddTasks, setReadyToAddTasks] = useState(false);

  const ref = useOutsideClick(() => setReadyToAddTasks(false));

  return (
    <div className='modal__checklist'>
      <h4 className='modal__subtitle'>Чек-лист</h4>
      {readyToAddTasks
        ? <div ref={ref}>
            <input
              placeholder='Добавить задачу'
              className='modal__input'
            />
            <Button
              text="Добавить"
              className="button"
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