import Card from './Card';
import ListHeader from './ListHeader';
import BtnAddCard from './BtnAddCard';

function List({ note, listTitle, setListTitle }) {
  
  const cards = note.cards.map(card => {
    return <Card key={card.id} card={card} note={note}/>
  })

  return (
    <div className='list'>
      <ListHeader 
        note={note}
        listTitle={listTitle}
        setListTitle={setListTitle}
      />
      {cards}
      <BtnAddCard note={note}/>
    </div>
  )
}

export default List;