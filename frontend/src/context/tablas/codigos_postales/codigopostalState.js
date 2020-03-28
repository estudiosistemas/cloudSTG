import React, { useReducer, useContext } from "react";
import axios from "axios";

import codigopostalContext from "./codigopostalContext";
import codigopostalReducer from "./codigopostalReducer";

import authContext from "../../auth/authContext";

//types
import {
  SHOW_FORM_CP,
  GET_CP,
  DELETE_CP,
  ADD_CP,
  UPDATE_CP,
  SET_CP
} from "../../../types/codigospostales";

const CodigoPostalState = props => {
  const initialState = {
    codigospostales: [],
    cp: {},
    showFormCP: false
  };

  //Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(codigopostalReducer, initialState);

  //auth state
  const authCtx = useContext(authContext);
  const { tokenConfig } = authCtx;

  //Funciones para el CRUD
  const mostrarFormularioCP = () => {
    dispatch({
      type: SHOW_FORM_CP
    });
  };

  const setCP = cp => {
    dispatch({
      type: SET_CP,
      payload: cp
    });
  };

  //GET
  const getCP = () => {
    axios
      .get("/api/codigospostales/", tokenConfig())
      .then(res => {
        dispatch({
          type: GET_CP,
          payload: res.data
        });
      })
      .catch(err => console.log(err.response.statusText));
  };

  //DELETE
  const deleteCP = codigo => {
    axios
      .delete(`/api/codigospostales/${codigo}/`, tokenConfig())
      .then(res => {
        //dispatch(createMessage({ deleteProvincia: "Provincia Borrada" }));
        dispatch({
          type: DELETE_CP,
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
  const addCP = cp => {
    const miCP = {
      codigo: cp.codigo,
      localidad: cp.localidad,
      provincia_codigo: cp.provincia.codigo
    };
    axios
      .post("/api/codigospostales/", miCP, tokenConfig())
      .then(res => {
        //dispatch(returnNoErrors());
        //dispatch(createMessage({ addProvincia: "Provincia Agregada" }));
        dispatch({
          type: ADD_CP,
          payload: res.data
        });
      })
      .catch(
        err => {
          console.log(err.response.data.codigo[0]);
        }
        //dispatch(returnErrors(err.response.data, err.response.status))
      );
  };

  //UPDATE
  const updateCP = cp => {
    const miCP = {
      codigo: cp.codigo,
      localidad: cp.localidad,
      provincia_codigo: cp.provincia.codigo
    };
    axios
      .put(`/api/codigospostales/${cp.codigo}/`, miCP, tokenConfig())
      .then(res => {
        //dispatch(returnNoErrors());
        //dispatch(createMessage({ addProvincia: "Provincia Agregada" }));
        dispatch({
          type: UPDATE_CP,
          payload: cp
        });
      })
      .catch(
        err => console.log(err.response.data.detail)
        //dispatch(returnErrors(err.response.data, err.response.status))
      );
  };

  return (
    <codigopostalContext.Provider
      value={{
        cp: state.cp,
        codigospostales: state.codigospostales,
        showFormCP: state.showFormCP,
        mostrarFormularioCP,
        getCP,
        addCP,
        deleteCP,
        updateCP,
        setCP
      }}
    >
      {props.children}
    </codigopostalContext.Provider>
  );
};

export default CodigoPostalState;
