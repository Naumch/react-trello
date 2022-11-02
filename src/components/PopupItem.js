export function PopupItem(props) {

  return (
    <li 
      className="popup__menu-item"
      onClick={props.func}
    >
      {props.text}
    </li>
  )
}