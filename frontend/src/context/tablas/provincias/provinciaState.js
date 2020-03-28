import React, { useReducer, useContext } from "react";
import axios from "axios";

import provinciaContext from "./provinciaContext";
import provinciaReducer from "./provinciaReducer";

import authContext from "../../auth/authContext";
import globalContext from "../../global/globalContext";

//types
import {
  SHOW_FORM_PROVINCIA,
  GET_PROVINCIAS,
  DELETE_PROVINCIA,
  ADD_PROVINCIA,
  UPDATE_PROVINCIA,
  SET_PROVINCIA
} from "../../../types/provincias";

//import { useAlert } from "react-alert";

const ProvinciaState = props => {
  const initialState = {
    provincias: [],
    provincia: {},
    showFormProvincia: false
  };

  //Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(provinciaReducer, initialState);

  //global state
  const GlobalCtx = useContext(globalContext);
  const { showMessage } = GlobalCtx;

  //auth state
  const authCtx = useContext(authContext);
  const { tokenConfig } = authCtx;

  //Funciones para el CRUD
  const mostrarFormularioProvincias = () => {
    dispatch({
      type: SHOW_FORM_PROVINCIA
    });
  };

  const setProvincia = provincia => {
    dispatch({
      type: SET_PROVINCIA,
      payload: provincia
    });
  };

  //GET
  const getProvincias = () => {
    axios
      .get("/api/provincias/", tokenConfig())
      .then(res => {
        //dispatch(returnNoErrors());
        dispatch({
          type: GET_PROVINCIAS,
          payload: res.data
        });
      })
      .catch(
        err =>
          showMessage({
            msg: err.response.statusText,
            title: "Error",
            type: "error"
          })
        //dispatch(returnErrors(err.response.data, err.response.status))
      );
  };

  //DELETE
  const deleteProvincia = codigo => {
    axios
      .delete(`/api/provincias/${codigo}/`, tokenConfig())
      .then(res => {
        //dispatch(createMessage({ deleteProvincia: "Provincia Borrada" }));
        dispatch({
          type: DELETE_PROVINCIA,
          payload: codigo
        });
        //dispatch(returnNoErrors());
      })
      .catch(
        err => {
          showMessage({
            msg: err.response.data.codigo[0],
            title: "Error",
            type: "error"
          });
          //alert.error(err.response.data.codigo[0]);
        }
        //dispatch(returnErrors(err.response.data, err.response.status))
      );
  };

  //ADD
  const addProvincia = provincia => {
    axios
      .post("/api/provincias/", provincia, tokenConfig())
      .then(res => {
        //dispatch(returnNoErrors());
        //dispatch(createMessage({ addProvincia: "Provincia Agregada" }));
        dispatch({
          type: ADD_PROVINCIA,
          payload: res.data
        });
      })
      .catch(
        err => {
          showMessage({
            msg: err.response.data.codigo[0],
            title: "Error",
            type: "error"
          });
        }
        //dispatch(returnErrors(err.response.data, err.response.status))
      );
  };

  //UPDATE
  const updateProvincia = provincia => {
    axios
      .put(`/api/provincias/${provincia.codigo}/`, provincia, tokenConfig())
      .then(res => {
        //dispatch(returnNoErrors());
        //dispatch(createMessage({ addProvincia: "Provincia Agregada" }));
        dispatch({
          type: UPDATE_PROVINCIA,
          payload: provincia
        });
      })
      .catch(
        err =>
          showMessage({
            msg: err.response.data.detail,
            title: "Error",
            type: "error"
          })
        //dispatch(returnErrors(err.response.data, err.response.status))
      );
  };

  return (
    <provinciaContext.Provider
      value={{
        provincia: state.provincia,
        provincias: state.provincias,
        showFormProvincia: state.showFormProvincia,
        mostrarFormularioProvincias,
        getProvincias,
        addProvincia,
        deleteProvincia,
        updateProvincia,
        setProvincia
      }}
    >
      {props.children}
    </provinciaContext.Provider>
  );
};

export default ProvinciaState;
