import React, { useReducer, useContext } from "react";
import axios from "axios";

import alicuotaContext from "./alicuotaContext";
import alicuotaReducer from "./alicuotaReducer";

import authContext from "../../auth/authContext";

//types
import {
  SHOW_FORM_ALICUOTA,
  GET_ALICUOTAS,
  DELETE_ALICUOTA,
  ADD_ALICUOTA,
  UPDATE_ALICUOTA,
  SET_ALICUOTA
} from "../../../types/alicuotas";

const AlicuotaState = props => {
  const initialState = {
    alicuotas: [],
    alicuota: {},
    showFormAlicuota: false
  };

  //Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(alicuotaReducer, initialState);

  //auth state
  const authCtx = useContext(authContext);
  const { tokenConfig } = authCtx;

  //Funciones para el CRUD
  const mostrarFormularioAlicuotas = () => {
    dispatch({
      type: SHOW_FORM_ALICUOTA
    });
  };

  const setAlicuota = alicuota => {
    dispatch({
      type: SET_ALICUOTA,
      payload: alicuota
    });
  };

  //GET
  const getAlicuotas = () => {
    axios
      .get("/api/alicuotasiva/", tokenConfig())
      .then(res => {
        dispatch({
          type: GET_ALICUOTAS,
          payload: res.data
        });
      })
      .catch(err => {
        console.log(err.response.statusText);
      });
  };

  //DELETE
  const deleteAlicuota = id => {
    axios
      .delete(`/api/alicuotasiva/${id}/`, tokenConfig())
      .then(res => {
        dispatch({
          type: DELETE_ALICUOTA,
          payload: id
        });
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  //ADD
  const addAlicuota = alicuota => {
    axios
      .post("/api/alicuotasiva/", alicuota, tokenConfig())
      .then(res => {
        dispatch({
          type: ADD_ALICUOTA,
          payload: res.data
        });
        alert.success("Alícuota agregada...");
      })
      .catch(err => {
        console.log(err.response.data.codigo[0]);
      });
  };

  //UPDATE
  const updateAlicuota = alicuota => {
    axios
      .put(`/api/alicuotasiva/${alicuota.id}/`, alicuota, tokenConfig())
      .then(res => {
        dispatch({
          type: UPDATE_ALICUOTA,
          payload: alicuota
        });
        alert.success("Alícuota modificada...");
      })
      .catch(err => console.log(err.response.data.detail));
  };

  return (
    <alicuotaContext.Provider
      value={{
        alicuota: state.alicuota,
        alicuotas: state.alicuotas,
        showFormAlicuota: state.showFormAlicuota,
        mostrarFormularioAlicuotas,
        getAlicuotas,
        addAlicuota,
        deleteAlicuota,
        updateAlicuota,
        setAlicuota
      }}
    >
      {props.children}
    </alicuotaContext.Provider>
  );
};

export default AlicuotaState;
