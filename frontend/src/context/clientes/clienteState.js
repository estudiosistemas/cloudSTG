import React, { useReducer, useContext } from "react";
import axios from "axios";

import clienteContext from "./clienteContext";
import clienteReducer from "./clienteReducer";

import authContext from "../auth/authContext";
import globalContext from "../global/globalContext";

//types
import {
  SHOW_FORM_CLIENTE,
  GET_CLIENTES,
  DELETE_CLIENTE,
  ADD_CLIENTE,
  UPDATE_CLIENTE,
  SET_CLIENTE,
  TOGGLE_ESTADO,
  GET_CLIENTE_AGENCIA,
  SET_CLIENTE_AGENCIA,
  ADD_CLIENTE_AGENCIA,
} from "../../types/clientes";

const ClienteState = (props) => {
  const initialState = {
    clientes: [],
    cliente: {},
    cliente_agencia: {},
    showForm: false,
    showFormConfig: false,
  };

  //Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(clienteReducer, initialState);

  //auth state
  const authCtx = useContext(authContext);
  const { tokenConfig, agencia } = authCtx;

  //global state
  const GlobalCtx = useContext(globalContext);
  const { showMessage } = GlobalCtx;

  //Funciones para el CRUD
  const mostrarFormulario = () => {
    dispatch({
      type: SHOW_FORM_CLIENTE,
    });
  };

  const setCliente = (cliente) => {
    dispatch({
      type: SET_CLIENTE,
      payload: cliente,
    });
  };

  const setClienteAgencia = (cliente_agencia) => {
    dispatch({
      type: SET_CLIENTE_AGENCIA,
      payload: cliente_agencia,
    });
  };

  //GET
  const getClientes = () => {
    axios
      .get("/api/clientes/", tokenConfig())
      .then((res) => {
        dispatch({
          type: GET_CLIENTES,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err.response.statusText));
  };

  //DELETE
  const deleteCliente = (codigo) => {
    axios
      .delete(`/api/clientes/${codigo}/`, tokenConfig())
      .then((res) => {
        //dispatch(createMessage({ deleteProvincia: "Provincia Borrada" }));
        dispatch({
          type: DELETE_CLIENTE,
          payload: codigo,
        });
        //dispatch(returnNoErrors());
      })
      .catch(
        (err) => {
          console.log(err.response);
          //alert.error(err.response.data.codigo[0]);
        }
        //dispatch(returnErrors(err.response.data, err.response.status))
      );
  };

  const addClienteAgencia = (clienteAgencia, idCliente, agregoCA) => {
    const miClienteAgencia = {
      ...clienteAgencia,
      cliente: idCliente,
      agencia: agencia.id,
      cobrador: clienteAgencia.cobrador.id,
      zona: clienteAgencia.zona.id,
      tarifa: clienteAgencia.tarifa.id,
    };
    console.log(miClienteAgencia);
    axios
      .post("/api/clientes-agencia/", miClienteAgencia, tokenConfig())
      .then((res) => {
        let mensaje = "Cliente actualizado correctamente";
        if (agregoCA) mensaje = "Cliente agregado correctamente";
        showMessage({
          msg: mensaje,
          title: "Clientes",
          type: "success",
        });
      })
      .catch((err) => {
        showMessage({
          msg: err.response.data.nro_documento[0],
          title: "Clientes Agencia",
          type: "error",
        });
      });
  };
  //ADD
  const addCliente = (cliente, clienteAgencia) => {
    const miCliente = {
      ...cliente,
      tipo_documento: cliente.tipo_documento.codigo,
      iva: cliente.iva.id,
      codigo_postal: cliente.codigo_postal.codigo,
    };

    axios
      .post("/api/clientes/", miCliente, tokenConfig())
      .then((res) => {
        dispatch({
          type: ADD_CLIENTE,
          payload: res.data,
        });
        addClienteAgencia(clienteAgencia, res.data.id, true);
      })
      .catch((err) => {
        showMessage({
          msg: err.response.statusText,
          title: "Clientes",
          type: "error",
        });
      });
  };

  //UPDATE
  const updateClienteAgencia = (clienteAgencia, idCliente) => {
    const miClienteAgencia = {
      ...clienteAgencia,
      cliente: idCliente,
      agencia: agencia.id,
      cobrador: clienteAgencia.cobrador.id,
      zona: clienteAgencia.zona.id,
      tarifa: clienteAgencia.tarifa.id,
    };
    axios
      .put(
        `/api/clientes-agencia/${idCliente}/`,
        miClienteAgencia,
        tokenConfig()
      )
      .then((res) => {
        showMessage({
          msg: "Cliente actualizado correctamente",
          title: "Clientes",
          type: "success",
        });
      })
      .catch((err) => {
        if (err.response.status == 405) {
          addClienteAgencia(clienteAgencia, idCliente, false);
        } else {
          showMessage({
            msg: err.response.statusText,
            title: "Clientes Agencia",
            type: "error",
          });
        }
      });
  };

  const updateCliente = (cliente, clienteAgencia) => {
    const miCliente = {
      ...cliente,
      tipo_documento: cliente.tipo_documento.codigo,
      iva: cliente.iva.id,
      codigo_postal: cliente.codigo_postal.codigo,
    };
    axios
      .put(`/api/clientes/${cliente.id}/`, miCliente, tokenConfig())
      .then((res) => {
        dispatch({
          type: UPDATE_CLIENTE,
          payload: cliente,
        });
        updateClienteAgencia(clienteAgencia, cliente.id);
      })
      .catch((err) =>
        showMessage({
          msg: err.response.data.nro_documento[0],
          title: "Clientes",
          type: "error",
        })
      );
  };

  //Cambio a inactivo
  const toggleEstadoCliente = (cliente) => {
    axios
      .patch(
        `/api/clientes/${cliente.id}/`,
        { estado: cliente.estado },
        tokenConfig()
      )
      .then((res) => {
        dispatch({
          type: TOGGLE_ESTADO,
          payload: cliente,
        });

        if (!cliente.estado) {
          showMessage({
            msg: "Cliente inactivado.",
            title: "Clientes",
            type: "warn",
          });
        } else {
          showMessage({
            msg: "Cliente activado.",
            title: "Clientes",
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

  //GET
  const getClienteAgencia = (agencia, cliente) => {
    axios
      .get(`/api/clientesagencia/${agencia}/${cliente}`, tokenConfig())
      .then((res) => {
        if (res.data[0]) {
          dispatch({
            type: GET_CLIENTE_AGENCIA,
            payload: res.data[0],
          });
        } else {
          dispatch({
            type: GET_CLIENTE_AGENCIA,
            payload: {},
          });
        }
      })
      .catch((err) => {
        console.log("error", err.response);
      });
  };

  return (
    <clienteContext.Provider
      value={{
        cliente: state.cliente,
        cliente_agencia: state.cliente_agencia,
        clientes: state.clientes,
        showForm: state.showForm,
        mostrarFormulario,
        getClientes,
        addCliente,
        deleteCliente,
        updateCliente,
        setCliente,
        toggleEstadoCliente,
        getClienteAgencia,
        setClienteAgencia,
      }}
    >
      {props.children}
    </clienteContext.Provider>
  );
};

export default ClienteState;
