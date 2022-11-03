import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MyContext from '../MyContext';
import { useOutsideClick } from '../hooks/outsideClick.hook';
import ModalHeader from './ModalHeader';
import ModalDescr from './ModalDescr';
import ModalCheckList from './ModalCheckList';

function Modal() {
  const navigate = useNavigate();
  const idList = useParams().idList;
  const idCard = useParams().idCard;

  const { notes } = useContext(MyContext);

  const currentList = notes.filter(elem => elem.id === idList)[0];
  const currentCard = currentList.cards.filter(elem => elem.id === idCard)[0];

  const ref = useOutsideClick(() => navigate(-1));

  return (
    <div className="modal-back">
      <div ref={ref} className="modal">
        <ModalHeader 
          navigate={navigate}
          currentCard={currentCard}
          currentList={currentList}
        />
        <ModalDescr 
          currentCard={currentCard}
          currentList={currentList}
        />
        <ModalCheckList />
      </div>
    </div>
  )
}

export default Modal;