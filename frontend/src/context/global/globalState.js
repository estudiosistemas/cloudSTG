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

  const mostrarError = error => {
    //Errores en Cobradores
    console.log(error.response);
    if (error.response.data.comision) {
      showMessage({
        msg: error.response.data.comision[0],
        title: "Error",
        type: "error"
      });
    }
  };

  return (
    <globalContext.Provider
      value={{
        message: state.message,
        showMessage,
        mostrarError
      }}
    >
      {props.children}
    </globalContext.Provider>
  );
};

export default GlobalState;
