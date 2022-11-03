import { Button } from "./Button";

function ModalHeader({ navigate, currentCard, currentList }) {

  return (
    <div className='modal__top'>
      <div className='modal__title'>
        <h3 style={{fontWeight: '500'}}>{currentCard.cardName}</h3>
        <p className='modal__title-descr'>в колонке {currentList.listTitle}</p>
      </div>
      <div className='modal__cancel'>
        <Button
          text="&#10006;" 
          func={() => navigate(-1)} 
          className="modal__cancel-btn"
        />
      </div>
    </div>
  )
}

export default ModalHeader;