import { createContext } from "react";

const MyContext = createContext({
  names: null,
  setNames: () => {}
});

export default MyContext;