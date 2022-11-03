export function Button(props) {

  return (
    <button onClick={props.func} className={props.className} style={props.styleObj}>
      <span className={props.classNameIcon}>{props.icon}</span>
      {props.text}
    </button>
  )
}