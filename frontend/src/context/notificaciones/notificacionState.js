import React, { useReducer, useContext } from "react";
import axios from "axios";

import notificacionContext from "./notificacionContext";
import notificacionReducer from "./notificacionReducer";

import authContext from "../auth/authContext";
import globalContext from "../global/globalContext";

//types
import {
  SHOW_FORM_NOTIFICACION,
  SET_NOTIFICACION,
  GET_NOTIFICACIONES_RECIBIDAS,
  GET_NOTIFICACIONES_ENVIADAS,
  ADD_NOTIFICACION,
  DELETE_NOTIFICACION,
  UPDATE_NOTIFICACION,
  TOGGLE_NOTIFICACION_LEIDA
} from "../../types/notificaciones";

const NotificacionState = props => {
  const initialState = {
    notificaciones_recibidas: [],
    notificaciones_enviadas: [],
    notificacion: {},
    nuevasNotificaciones: null,
    showFormNotificacion: false
  };

  //Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(notificacionReducer, initialState);

  //global state
  const GlobalCtx = useContext(globalContext);
  const { showMessage } = GlobalCtx;

  //auth state
  const authCtx = useContext(authContext);
  const { tokenConfig, user } = authCtx;

  //Funciones para el CRUD
  const mostrarFormularioNotificacion = () => {
    dispatch({
      type: SHOW_FORM_NOTIFICACION
    });
  };

  const setNotificacion = notificacion => {
    dispatch({
      type: SET_NOTIFICACION,
      payload: notificacion
    });
  };

  //GET
  const getNotificaciones_Recibidas = () => {
    axios
      .get(`/api/notify-rec/${user.id}`, tokenConfig())
      .then(res => {
        dispatch({
          type: GET_NOTIFICACIONES_RECIBIDAS,
          payload: res.data
        });
      })
      .catch(err =>
        showMessage({
          msg: err.response.statusText,
          title: "Error",
          type: "error"
        })
      );
  };

  const getNotificaciones_Enviadas = () => {
    axios
      .get(`/api/notify-send/${user.id}`, tokenConfig())
      .then(res => {
        dispatch({
          type: GET_NOTIFICACIONES_ENVIADAS,
          payload: res.data
        });
      })
      .catch(err =>
        showMessage({
          msg: err.response.statusText,
          title: "Error",
          type: "error"
        })
      );
  };

  //DELETE
  const deleteNotificacion = codigo => {
    axios
      .delete(`/api/notificaciones/${codigo}/`, tokenConfig())
      .then(res => {
        dispatch({
          type: DELETE_NOTIFICACION,
          payload: codigo
        });
        showMessage({
          msg: "Notificación borrada.",
          title: "Notificaciones",
          type: "success"
        });
      })
      .catch(err => {
        showMessage({
          msg: err.response.data.codigo[0],
          title: "Notificaciones",
          type: "error"
        });
      });
  };

  //ADD
  const addNotificacion = notificacion => {
    const miNotificacion = {
      estado: notificacion.estado,
      asunto: notificacion.asunto,
      mensaje: notificacion.mensaje,
      prioridad: notificacion.prioridad,
      leida: notificacion.leida,
      user_destino: notificacion.usuario.id
    };
    axios
      .post("/api/notificaciones/", miNotificacion, tokenConfig())
      .then(res => {
        showMessage({
          msg: "Notificación enviada.",
          title: "Notificaciones",
          type: "success"
        });
        const respuesta = {
          id: res.data.id,
          estado: notificacion.estado,
          leida: notificacion.leida,
          fc: res.data.fc,
          asunto: notificacion.asunto,
          mensaje: notificacion.mensaje,
          prioridad: notificacion.prioridad,
          userTo: notificacion.usuario.fullname,
          avatar: notificacion.usuario.avatar,
          user_destino: {
            id: notificacion.usuario.id,
            username: notificacion.usuario.username,
            first_name: notificacion.usuario.first_name,
            last_name: notificacion.usuario.last_name,
            email: notificacion.usuario.email
          },
          uc: res.data.uc
        };
        dispatch({
          type: ADD_NOTIFICACION,
          payload: respuesta
        });
      })
      .catch(err => {
        showMessage({
          msg: err.response.data.codigo[0],
          title: "Error",
          type: "error"
        });
      });
  };

  //UPDATE
  const updateNotificacion = notificacion => {
    axios
      .put(
        `/api/notificaciones/${notificacion.id}/`,
        notificacion,
        tokenConfig()
      )
      .then(res => {
        dispatch({
          type: UPDATE_NOTIFICACION,
          payload: notificacion
        });
        showMessage({
          msg: "Notificación actualizada.",
          title: "Notificaciones",
          type: "success"
        });
      })
      .catch(err =>
        showMessage({
          msg: err.response.data.detail,
          title: "Error",
          type: "error"
        })
      );
  };

  //Cambio leido
  const toggleNotificacionLeida = notificacion => {
    axios
      .patch(
        `/api/notificaciones/${notificacion.id}/`,
        { leida: notificacion.leida },
        tokenConfig()
      )
      .then(res => {
        dispatch({
          type: TOGGLE_NOTIFICACION_LEIDA,
          payload: notificacion
        });
        showMessage({
          msg: "Notificación actualizada.",
          title: "Notificaciones",
          type: "success"
        });
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
    <notificacionContext.Provider
      value={{
        notificaciones_recibidas: state.notificaciones_recibidas,
        notificaciones_enviadas: state.notificaciones_enviadas,
        notificacion: state.notificacion,
        nuevasNotificaciones: state.nuevasNotificaciones,
        showFormNotificacion: state.showFormNotificacion,
        mostrarFormularioNotificacion,
        setNotificacion,
        getNotificaciones_Recibidas,
        getNotificaciones_Enviadas,
        updateNotificacion,
        deleteNotificacion,
        addNotificacion,
        toggleNotificacionLeida
      }}
    >
      {props.children}
    </notificacionContext.Provider>
  );
};

export default NotificacionState;
