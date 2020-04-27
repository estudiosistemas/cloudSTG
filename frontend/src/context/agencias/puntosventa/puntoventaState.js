import React, { useReducer, useContext } from "react";
import axios from "axios";

import puntoventaContext from "./puntoventaContext";
import puntoventaReducer from "./puntoventaReducer";

import authContext from "../../auth/authContext";
import globalContext from "../../global/globalContext";

//types
import {
  SHOW_FORM,
  GET,
  DELETE,
  ADD,
  UPDATE,
  SET,
  TOGGLE_ESTADO,
} from "../../../types/crud";

const PuntoVentaState = (props) => {
  const initialState = {
    puntosventa: [],
    puntoventa: {},
    showForm: false,
  };

  //Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(puntoventaReducer, initialState);

  //auth state
  const authCtx = useContext(authContext);
  const { tokenConfig, agencia } = authCtx;

  //global state
  const GlobalCtx = useContext(globalContext);
  const { showMessage, mostrarError } = GlobalCtx;

  //Funciones para el CRUD
  const mostrarFormulario = () => {
    dispatch({
      type: SHOW_FORM,
    });
  };

  const setPuntoVenta = (puntoventa) => {
    dispatch({
      type: SET,
      payload: puntoventa,
    });
  };

  //GET
  const getPuntoVenta = (agencia) => {
    axios
      .get(`/api/puntoventa-agencia/${agencia}`, tokenConfig())
      .then((res) => {
        dispatch({
          type: GET,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err.response.statusText));
  };

  //DELETE
  const deletePuntoVenta = (codigo) => {
    axios
      .delete(`/api/puntosventa/${codigo}/`, tokenConfig())
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
  const addPuntoVenta = (puntoventa) => {
    const miPuntoVenta = {
      ...puntoventa,
      agencia: agencia.id,
    };
    axios
      .post(`/api/puntosventa/`, miPuntoVenta, tokenConfig())
      .then((res) => {
        showMessage({
          msg: "Agregado correctamente",
          title: "Punto de Venta",
          type: "success",
        });
        dispatch({
          type: ADD,
          payload: res.data,
        });
      })
      .catch((err) => mostrarError(err));
  };

  //UPDATE
  const updatePuntoVenta = (puntoventa) => {
    axios
      .put(`/api/puntosventa/${puntoventa.id}/`, puntoventa, tokenConfig())
      .then((res) => {
        showMessage({
          msg: "Actualizado correctamente",
          title: "Puntos de Venta",
          type: "success",
        });
        dispatch({
          type: UPDATE,
          payload: res.data,
        });
      })
      .catch((err) => mostrarError(err));
  };

  //Cambio a inactivo
  const toggleEstadoPuntoVenta = (puntoventa) => {
    axios
      .patch(
        `/api/puntosventa/${puntoventa.id}/`,
        { estado: puntoventa.estado },
        tokenConfig()
      )
      .then((res) => {
        dispatch({
          type: TOGGLE_ESTADO,
          payload: puntoventa,
        });

        if (!puntoventa.estado) {
          showMessage({
            msg: "Inactivado",
            title: "Punto de Venta",
            type: "warn",
          });
        } else {
          showMessage({
            msg: "Activado",
            title: "Punto de Venta",
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
    <puntoventaContext.Provider
      value={{
        puntoventa: state.puntoventa,
        puntosventa: state.puntosventa,
        showForm: state.showForm,
        mostrarFormulario,
        getPuntoVenta,
        addPuntoVenta,
        deletePuntoVenta,
        updatePuntoVenta,
        setPuntoVenta,
        toggleEstadoPuntoVenta,
      }}
    >
      {props.children}
    </puntoventaContext.Provider>
  );
};

export default PuntoVentaState;
