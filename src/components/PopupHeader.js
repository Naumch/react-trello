function PopupHeader(props) {

  return(
    <div className="popup__top">
      <button 
        onClick={props.funcBack}
        className='popup__top-btn popup__top-btn_back'
        style={{display: `${props.funcBack ? 'block' : 'none'}`}}
      >
        &lsaquo;
      </button>
      <p className='popup__top-text'>{props.text}</p>
      <button 
        onClick={props.funcClose}
        className='popup__top-btn'
      >
        &#10006;
      </button>
    </div>
  )
}

export default PopupHeader;