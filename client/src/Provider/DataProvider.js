import React, { useState } from "react";
import DataContext from "../context/DataContext";

const DataProvider = ({ children }) => {
  const handleState = (state) => {
    setState((prevState) => {
      return {
        ...prevState,
        state,
      };
    });
  };

  const init = {
    state: "init",
    handleState,
  };

  const [state, setState] = useState(init);

  return <DataContext.Provider value={state}>{children}</DataContext.Provider>;
};

export default DataProvider;
