import React, { useReducer, useContext } from "react";
import axios from "axios";

import comprobanteContext from "./comprobanteContext";
import comprobanteReducer from "./comprobanteReducer";

import authContext from "../../auth/authContext";

//types
import { SHOW_FORM, GET, DELETE, ADD, UPDATE, SET } from "../../../types/crud";

const ComprobanteState = (props) => {
  const initialState = {
    comprobantes: [],
    comprobante: {},
    showForm: false,
  };

  //Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(comprobanteReducer, initialState);

  //auth state
  const authCtx = useContext(authContext);
  const { tokenConfig } = authCtx;

  //Funciones para el CRUD
  const mostrarFormulario = () => {
    dispatch({
      type: SHOW_FORM,
    });
  };

  const setComprobante = (comprobante) => {
    dispatch({
      type: SET,
      payload: comprobante,
    });
  };

  //GET
  const getComprobantes = () => {
    axios
      .get("/api/comprobantes/", tokenConfig())
      .then((res) => {
        dispatch({
          type: GET,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err.response.statusText));
  };

  //DELETE
  const deleteComprobante = (codigo) => {
    axios
      .delete(`/api/comprobantes/${codigo}/`, tokenConfig())
      .then((res) => {
        dispatch({
          type: DELETE,
          payload: codigo,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  //ADD
  const addComprobante = (comprobante) => {
    const miCompro = {
      ...comprobante,
      tipo_comprobante: comprobante.tipo_comprobante.id,
    };
    axios
      .post("/api/comprobantes/", miCompro, tokenConfig())
      .then((res) => {
        dispatch({
          type: ADD,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response.data.codigo[0]);
      });
  };

  //UPDATE
  const updateComprobante = (comprobante) => {
    const miCompro = {
      ...comprobante,
      tipo_comprobante: comprobante.tipo_comprobante.id,
    };
    axios
      .put(`/api/comprobantes/${miCompro.id}/`, miCompro, tokenConfig())
      .then((res) => {
        dispatch({
          type: UPDATE,
          payload: comprobante,
        });
      })
      .catch((err) => console.log(err.response.data.detail));
  };

  return (
    <comprobanteContext.Provider
      value={{
        comprobante: state.comprobante,
        comprobantes: state.comprobantes,
        showForm: state.showForm,
        mostrarFormulario,
        getComprobantes,
        addComprobante,
        deleteComprobante,
        updateComprobante,
        setComprobante,
      }}
    >
      {props.children}
    </comprobanteContext.Provider>
  );
};

export default ComprobanteState;
