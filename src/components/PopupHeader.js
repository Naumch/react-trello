import { Button } from "./Button";

function PopupHeader(props) {

  return(
    <div className="popup__top">
      <Button
        text="&lsaquo;" 
        func={props.funcBack}
        className='popup__top-btn popup__top-btn_back'
        styleObj={{display: `${props.funcBack ? 'block' : 'none'}`}}
      />
      <p className='popup__top-text'>{props.text}</p>
      <Button text="&#10006;" func={props.funcClose} className='popup__top-btn'/>
    </div>
  )
}

export default PopupHeader;