export function Button(props) {

  return (
    <button onClick={props.func} className='button-black'>
      <span className='button-black__icon'>{props.icon}</span>
      {props.text}
    </button>
  )
}