import React, { useReducer, useContext } from "react";
import axios from "axios";

import zonaContext from "./zonaContext";
import zonaReducer from "./zonaReducer";

import authContext from "../../auth/authContext";
import globalContext from "../../global/globalContext";

//types
import {
  SHOW_FORM_ZONA,
  GET_ZONAS,
  DELETE_ZONA,
  ADD_ZONA,
  UPDATE_ZONA,
  SET_ZONA,
  TOGGLE_ESTADO_ZONA,
} from "../../../types/zonas";

const ZonaState = (props) => {
  const initialState = {
    zonas: [],
    zona: {},
    showForm: false,
  };

  //Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(zonaReducer, initialState);

  //auth state
  const authCtx = useContext(authContext);
  const { tokenConfig, agencia } = authCtx;

  //global state
  const GlobalCtx = useContext(globalContext);
  const { showMessage, mostrarError } = GlobalCtx;

  //Funciones para el CRUD
  const mostrarFormulario = () => {
    dispatch({
      type: SHOW_FORM_ZONA,
    });
  };

  const setZona = (zona) => {
    dispatch({
      type: SET_ZONA,
      payload: zona,
    });
  };

  //GET
  const getZonas = (agencia) => {
    axios
      .get(`/api/zona-agencia/${agencia}`, tokenConfig())
      .then((res) => {
        dispatch({
          type: GET_ZONAS,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err.response.statusText));
  };

  //DELETE
  const deleteZona = (codigo) => {
    axios
      .delete(`/api/zonas/${codigo}/`, tokenConfig())
      .then((res) => {
        //dispatch(createMessage({ deleteProvincia: "Provincia Borrada" }));
        dispatch({
          type: DELETE_ZONA,
          payload: codigo,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  //ADD
  const addZona = (zona) => {
    const miZona = {
      ...zona,
      agencia: agencia.id,
    };
    axios
      .post(`/api/zonas/`, miZona, tokenConfig())
      .then((res) => {
        showMessage({
          msg: "Agregada correctamente",
          title: "Zona",
          type: "success",
        });
        dispatch({
          type: ADD_ZONA,
          payload: res.data,
        });
      })
      .catch((err) => mostrarError(err));
  };

  //UPDATE
  const updateZona = (zona) => {
    axios
      .put(`/api/zonas/${zona.id}/`, zona, tokenConfig())
      .then((res) => {
        showMessage({
          msg: "Actualizada correctamente",
          title: "Zona",
          type: "success",
        });
        dispatch({
          type: UPDATE_ZONA,
          payload: zona,
        });
      })
      .catch((err) => mostrarError(err));
  };

  //Cambio a inactivo
  const toggleEstadoZona = (zona) => {
    axios
      .patch(`/api/zonas/${zona.id}/`, { estado: zona.estado }, tokenConfig())
      .then((res) => {
        dispatch({
          type: TOGGLE_ESTADO_ZONA,
          payload: zona,
        });

        if (!zona.estado) {
          showMessage({
            msg: "Inactivada.",
            title: "Zona",
            type: "warn",
          });
        } else {
          showMessage({
            msg: "Activada",
            title: "Zona",
            type: "success",
          });
        }
      })
      .catch((err) =>
        showMessage({
          msg: err.response.data.detail,
          title: "Error",
          type: "error",
        })
      );
  };

  return (
    <zonaContext.Provider
      value={{
        zona: state.zona,
        zonas: state.zonas,
        showForm: state.showForm,
        mostrarFormulario,
        getZonas,
        addZona,
        deleteZona,
        updateZona,
        setZona,
        toggleEstadoZona,
      }}
    >
      {props.children}
    </zonaContext.Provider>
  );
};

export default ZonaState;
