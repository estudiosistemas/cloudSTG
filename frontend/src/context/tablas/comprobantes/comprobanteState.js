import React, { useReducer, useContext } from "react";
import axios from "axios";

import comprobanteContext from "./comprobanteContext";
import comprobanteReducer from "./comprobanteReducer";

import authContext from "../../auth/authContext";

//types
import {
  SHOW_FORM,
  GET,
  DELETE,
  ADD,
  UPDATE,
  SET,
  GET_PUNTOVENTA,
  UPDATE_PUNTOVENTA,
} from "../../../types/crud";

const ComprobanteState = (props) => {
  const initialState = {
    comprobantes: [],
    comprobante: {},
    puntosVenta_Comprobante: [],
    showForm: false,
  };

  //Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(comprobanteReducer, initialState);

  //auth state
  const authCtx = useContext(authContext);
  const { tokenConfig, agencia } = authCtx;

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

  //GET PUNTOVENTA POR COMPROBANTE
  const getPuntoVenta_Comprobantes = () => {
    axios
      .get(`/api/comprobante_ptoventa-agencia/${agencia.id}`, tokenConfig())
      .then((res) => {
        dispatch({
          type: GET_PUNTOVENTA,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err.response.statusText));
  };

  //Actualizar nuemro en Puntos de Venta x comprobante
  const updateComprobantePtoVenta = (numCompro) => {
    axios
      .patch(
        `/api/comprobante-ptoventa/${numCompro.id}/`,
        { numero: numCompro.numero },
        tokenConfig()
      )
      .then((res) => {
        dispatch({
          type: UPDATE_PUNTOVENTA,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err.response.data.detail));
  };

  return (
    <comprobanteContext.Provider
      value={{
        comprobante: state.comprobante,
        comprobantes: state.comprobantes,
        puntosVenta_Comprobante: state.puntosVenta_Comprobante,
        showForm: state.showForm,
        mostrarFormulario,
        getComprobantes,
        addComprobante,
        deleteComprobante,
        updateComprobante,
        setComprobante,
        getPuntoVenta_Comprobantes,
        updateComprobantePtoVenta,
      }}
    >
      {props.children}
    </comprobanteContext.Provider>
  );
};

export default ComprobanteState;
