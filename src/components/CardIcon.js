function CardIcon({ card }) {
  const isDone = card.checklist.filter(elem => elem.check === true).length === card.checklist.length

  return (
    <div className='card__icon'>
      {
        card.descr.length !== 0 
        && <span style={{marginRight: "10px"}}>&#9776;</span>
      }
      {
        card.checklist.length !== 0 && 
        <span style={{
          color: `${isDone ? "#fff": "#000"}`,
          padding: "0px 5px 3px",
          borderRadius: "4px",
          fontWeight: `${isDone ? "500" : "400"}`,
          backgroundColor: `${isDone ? "#5fc04c" : ""}`,
        }}>
          &#10004;{card.checklist.filter(elem => elem.check === true).length}/{card.checklist.length}
        </span>
      }
    </div>
  )
}

export default CardIcon;