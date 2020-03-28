import React, { useReducer } from "react";
import axios from "axios";

import globalContext from "./globalContext";
import globalReducer from "./globalReducer";

//types
import { CREATE_MESSAGE } from "../../types/global";

const GlobalState = props => {
  const initialState = {
    message: {}
  };

  //Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(globalReducer, initialState);

  const showMessage = message => {
    dispatch({
      type: CREATE_MESSAGE,
      payload: message
    });
  };

  // const showGrowl = message => {
  //   dispatch({
  //     type: SHOW_GROWL,
  //     payload: message
  //   });
  // };

  // const setError = error => {
  //   dispatch({
  //     type: SET_ERROR,
  //     payload: error
  //   });
  // };

  return (
    <globalContext.Provider
      value={{
        message: state.message,
        showMessage
      }}
    >
      {props.children}
    </globalContext.Provider>
  );
};

export default GlobalState;
