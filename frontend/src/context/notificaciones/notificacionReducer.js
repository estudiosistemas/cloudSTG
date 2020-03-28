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

const contarNotificaciones = listanotificaciones => {
  const result = listanotificaciones.filter(notify => !notify.leida);
  return result.length;
};

export default (state, action) => {
  switch (action.type) {
    case SHOW_FORM_NOTIFICACION:
      return {
        ...state,
        showFormNotificacion: !state.showFormNotificacion
      };
    case SET_NOTIFICACION:
      return {
        ...state,
        notificacion: action.payload
      };
    case GET_NOTIFICACIONES_RECIBIDAS:
      return {
        ...state,
        notificaciones_recibidas: action.payload,
        nuevasNotificaciones: contarNotificaciones(action.payload)
      };
    case GET_NOTIFICACIONES_ENVIADAS:
      return {
        ...state,
        notificaciones_enviadas: action.payload
      };
    case DELETE_NOTIFICACION:
      return {
        ...state,
        notificaciones_enviadas: state.notificaciones_enviadas.filter(
          notificacion => notificacion.id !== action.payload
        )
      };
    case ADD_NOTIFICACION:
      return {
        ...state,
        notificaciones_enviadas: [
          ...state.notificaciones_enviadas,
          action.payload
        ],
        showFormNotificacion: false
      };
    case UPDATE_NOTIFICACION:
      return {
        ...state,
        notificaciones_enviadas: state.notificaciones_enviadas.map(
          notificacion =>
            notificacion.codigo === action.payload.codigo
              ? action.payload
              : notificacion
        ),
        showFormNotificacion: false
      };
    case TOGGLE_NOTIFICACION_LEIDA:
      return {
        ...state,
        notificaciones_recibidas: state.notificaciones_recibidas.map(
          notificacion =>
            notificacion.id === action.payload.id
              ? action.payload
              : notificacion
        ),
        nuevasNotificaciones: contarNotificaciones(
          state.notificaciones_recibidas
        ),
        showFormNotificacion: false
      };
    default:
      return state;
  }
};
