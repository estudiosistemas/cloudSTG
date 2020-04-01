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

export default (state, action) => {
  switch (action.type) {
    case SHOW_FORM_COBRADOR:
      return {
        ...state,
        showForm: !state.showForm
      };
    case SET_COBRADOR:
      return {
        ...state,
        cobrador: action.payload
      };
    case GET_COBRADORES:
      return {
        ...state,
        cobradores: action.payload
      };
    case DELETE_COBRADOR:
      return {
        ...state,
        cobradores: state.cobradores.filter(
          cobrador => cobrador.id !== action.payload
        )
      };
    case ADD_COBRADOR:
      return {
        ...state,
        cobradores: [...state.cobradores, action.payload],
        showForm: false
      };
    case UPDATE_COBRADOR:
      return {
        ...state,
        cobradores: state.cobradores.map(cob =>
          cob.id === action.payload.id ? action.payload : cob
        ),
        showForm: false
      };
    case TOGGLE_ESTADO_COBRADOR:
      return {
        ...state,
        cobradores: state.cobradores.map(cobrador =>
          cobrador.id === action.payload.id ? action.payload : cobrador
        )
      };
    default:
      return state;
  }
};
