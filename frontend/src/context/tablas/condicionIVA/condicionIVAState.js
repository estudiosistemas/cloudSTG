import React, { useReducer, useContext } from "react";
import axios from "axios";

import condicionIVAContext from "./condicionIVAContext";
import condicionIVAReducer from "./condicionIVAReducer";

import authContext from "../../auth/authContext";

//types
import {
  SHOW_FORM_CONDICION,
  GET_CONDICIONES,
  DELETE_CONDICION,
  ADD_CONDICION,
  UPDATE_CONDICION,
  SET_CONDICION
} from "../../../types/condicionIVA";

const CondicionIVAState = props => {
  const initialState = {
    condiciones: [],
    condicion: {},
    showFormCondicion: false
  };

  //Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(condicionIVAReducer, initialState);

  //auth state
  const authCtx = useContext(authContext);
  const { tokenConfig } = authCtx;

  //Funciones para el CRUD
  const mostrarFormularioCondiciones = () => {
    dispatch({
      type: SHOW_FORM_CONDICION
    });
  };

  const setCondicion = condicion => {
    dispatch({
      type: SET_CONDICION,
      payload: condicion
    });
  };

  //GET
  const getCondiciones = () => {
    axios
      .get("/api/condicioniva/", tokenConfig())
      .then(res => {
        dispatch({
          type: GET_CONDICIONES,
          payload: res.data
        });
      })
      .catch(err => {
        console.log(err.response.statusText);
      });
  };

  //DELETE
  const deleteCondicion = id => {
    axios
      .delete(`/api/condicioniva/${id}/`, tokenConfig())
      .then(res => {
        dispatch({
          type: DELETE_CONDICION,
          payload: id
        });
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  //ADD
  const addCondicion = condicion => {
    axios
      .post("/api/condicioniva/", condicion, tokenConfig())
      .then(res => {
        dispatch({
          type: ADD_CONDICION,
          payload: res.data
        });
        alert.success("Condición de IVA agregada...");
      })
      .catch(err => {
        console.log(err.response.data.codigo[0]);
      });
  };

  //UPDATE
  const updateCondicion = condicion => {
    axios
      .put(`/api/condicioniva/${condicion.id}/`, condicion, tokenConfig())
      .then(res => {
        dispatch({
          type: UPDATE_CONDICION,
          payload: condicion
        });
        //alert.success("Condición de IVA modificada...");
      })
      .catch(err => console.log(err.response.data.detail));
  };

  return (
    <condicionIVAContext.Provider
      value={{
        condicion: state.condicion,
        condiciones: state.condiciones,
        showFormCondicion: state.showFormCondicion,
        mostrarFormularioCondiciones,
        getCondiciones,
        addCondicion,
        deleteCondicion,
        updateCondicion,
        setCondicion
      }}
    >
      {props.children}
    </condicionIVAContext.Provider>
  );
};

export default CondicionIVAState;
