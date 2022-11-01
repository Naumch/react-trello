import { useContext } from 'react';
import List from './List';
import MyContext from '../MyContext';

function Lists({ listTitle, setListTitle }) {
  const { notes } = useContext(MyContext);

  const result = notes.map(note => {
    return (
      <List 
        key={note.id}
        note={note}
        listTitle={listTitle}
        setListTitle={setListTitle}
      />
    )
  })

  return (
    <>{result}</>
  )
}

export default Lists;