import React, { useReducer, useContext } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

import cobradorContext from "./cobradorContext";
import cobradorReducer from "./cobradorReducer";

import authContext from "../../auth/authContext";
import globalContext from "../../global/globalContext";

//types
import {
  SHOW_FORM_COBRADOR,
  GET_COBRADORES,
  DELETE_COBRADOR,
  ADD_COBRADOR,
  UPDATE_COBRADOR,
  SET_COBRADOR,
  TOGGLE_ESTADO_COBRADOR
} from "../../../types/cobradores";

const CobradorState = props => {
  const initialState = {
    cobradores: [],
    cobrador: {},
    showForm: false
  };

  //Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(cobradorReducer, initialState);

  //auth state
  const authCtx = useContext(authContext);
  const { tokenConfig, agencia } = authCtx;

  //global state
  const GlobalCtx = useContext(globalContext);
  const { showMessage } = GlobalCtx;

  //Funciones para el CRUD
  const mostrarFormulario = () => {
    dispatch({
      type: SHOW_FORM_COBRADOR
    });
  };

  const setCobrador = cobrador => {
    dispatch({
      type: SET_COBRADOR,
      payload: cobrador
    });
  };

  //GET
  const getCobradores = agencia => {
    axios
      .get(`/api/cobrador-agencia/${agencia}`, tokenConfig())
      .then(res => {
        dispatch({
          type: GET_COBRADORES,
          payload: res.data
        });
      })
      .catch(err => console.log(err.response.statusText));
  };

  //DELETE
  const deleteCobrador = codigo => {
    axios
      .delete(`/api/cobradores/${codigo}/`, tokenConfig())
      .then(res => {
        //dispatch(createMessage({ deleteProvincia: "Provincia Borrada" }));
        dispatch({
          type: DELETE_COBRADOR,
          payload: codigo
        });
        //dispatch(returnNoErrors());
      })
      .catch(
        err => {
          console.log(err.response);
          //alert.error(err.response.data.codigo[0]);
        }
        //dispatch(returnErrors(err.response.data, err.response.status))
      );
  };

  //ADD
  const addCobrador = cobrador => {
    const miCobrador = {
      ...cobrador
    };
    axios
      .post(`/api/cobradores`, miCobrador, tokenConfig())
      .then(res => {
        showMessage({
          msg: "Cobrador agregado correctamente",
          title: "Cobradores",
          type: "success"
        });
        dispatch({
          type: ADD_COBRADOR,
          payload: res.data
        });
      })
      .catch(
        err => {
          showMessage({
            msg: err.response.data.comision[0],
            title: "Cobradores",
            type: "error"
          });
        }
        //dispatch(returnErrors(err.response.data, err.response.status))
      );
  };

  //UPDATE
  const updateCobrador = cobrador => {
    const miCobrador = {
      ...cobrador
    };

    axios
      .put(`/api/cobradores/${cobrador.id}/`, miCobrador, tokenConfig())
      .then(res => {
        showMessage({
          msg: "Actualizado correctamente",
          title: "Cobradores",
          type: "success"
        });
        dispatch({
          type: UPDATE_COBRADOR,
          payload: cobrador
        });
      })
      .catch(err =>
        showMessage({
          msg: err.response.data.comision[0],
          title: "Cobradores",
          type: "error"
        })
      );
  };

  //Cambio a inactivo
  const toggleEstadoCobrador = cobrador => {
    axios
      .patch(
        `/api/cobradores/${cobrador.id}/`,
        { estado: cobrador.estado },
        tokenConfig()
      )
      .then(res => {
        dispatch({
          type: TOGGLE_ESTADO_COBRADOR,
          payload: cobrador
        });

        if (!cobrador.estado) {
          showMessage({
            msg: "Cobrador inactivado.",
            title: "Cobradores",
            type: "warn"
          });
        } else {
          showMessage({
            msg: "Cobrador activado.",
            title: "Cobradores",
            type: "success"
          });
        }
      })
      .catch(err =>
        showMessage({
          msg: err.response.data.detail,
          title: "Error",
          type: "error"
        })
      );
  };

  return (
    <cobradorContext.Provider
      value={{
        cobrador: state.cobrador,
        cobradores: state.cobradores,
        showForm: state.showForm,
        mostrarFormulario,
        getCobradores,
        addCobrador,
        deleteCobrador,
        updateCobrador,
        setCobrador,
        toggleEstadoCobrador
      }}
    >
      {props.children}
    </cobradorContext.Provider>
  );
};

export default CobradorState;
