import React, { useReducer, useContext } from "react";
import axios from "axios";

import tarifaContext from "./tarifaContext";
import tarifaReducer from "./tarifaReducer";

import authContext from "../../auth/authContext";
import globalContext from "../../global/globalContext";

//types
import {
  SHOW_FORM_TARIFA,
  GET_TARIFAS,
  ADD_TARIFA,
  UPDATE_TARIFA,
  SET_TARIFA,
  TOGGLE_ESTADO_TARIFA,
} from "../../../types/tarifas";

const TarifaState = (props) => {
  const initialState = {
    tarifas: [],
    tarifa: {},
    showForm: false,
  };

  //Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(tarifaReducer, initialState);

  //auth state
  const authCtx = useContext(authContext);
  const { tokenConfig, agencia } = authCtx;

  //global state
  const GlobalCtx = useContext(globalContext);
  const { showMessage, mostrarError } = GlobalCtx;

  //Funciones para el CRUD
  const mostrarFormulario = () => {
    dispatch({
      type: SHOW_FORM_TARIFA,
    });
  };

  const setTarifa = (tarifa) => {
    dispatch({
      type: SET_TARIFA,
      payload: tarifa,
    });
  };

  //GET
  const getTarifas = (agencia) => {
    axios
      .get(`/api/tarifa-agencia/${agencia}`, tokenConfig())
      .then((res) => {
        dispatch({
          type: GET_TARIFAS,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err.response.statusText));
  };

  //ADD
  const addTarifa = (tarifa) => {
    const miTarifa = {
      ...tarifa,
      agencia: agencia.id,
    };
    axios
      .post(`/api/tarifas/`, miTarifa, tokenConfig())
      .then((res) => {
        showMessage({
          msg: "Agregada correctamente",
          title: "Tarifa",
          type: "success",
        });
        dispatch({
          type: ADD_TARIFA,
          payload: res.data,
        });
      })
      .catch((err) => mostrarError(err));
  };

  //UPDATE
  const updateTarifa = (tarifa) => {
    axios
      .put(`/api/tarifas/${tarifa.id}/`, tarifa, tokenConfig())
      .then((res) => {
        showMessage({
          msg: "Actualizada correctamente",
          title: "Tarifa",
          type: "success",
        });
        dispatch({
          type: UPDATE_TARIFA,
          payload: tarifa,
        });
      })
      .catch((err) => mostrarError(err));
  };

  //Cambio a inactivo
  const toggleEstadoTarifa = (tarifa) => {
    axios
      .patch(
        `/api/tarifas/${tarifa.id}/`,
        { estado: tarifa.estado },
        tokenConfig()
      )
      .then((res) => {
        dispatch({
          type: TOGGLE_ESTADO_TARIFA,
          payload: tarifa,
        });

        if (!tarifa.estado) {
          showMessage({
            msg: "Inactivada.",
            title: "Tarifa",
            type: "warn",
          });
        } else {
          showMessage({
            msg: "Activada",
            title: "Tarifa",
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
    <tarifaContext.Provider
      value={{
        tarifa: state.tarifa,
        tarifas: state.tarifas,
        showForm: state.showForm,
        mostrarFormulario,
        getTarifas,
        addTarifa,
        updateTarifa,
        setTarifa,
        toggleEstadoTarifa,
      }}
    >
      {props.children}
    </tarifaContext.Provider>
  );
};

export default TarifaState;
