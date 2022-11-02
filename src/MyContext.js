import { createContext } from "react";

const MyContext = createContext({
  notes: null,
  setNotes: () => {}
});

export default MyContext;