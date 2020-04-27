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

export default (state, action) => {
  switch (action.type) {
    case SHOW_FORM:
      return {
        ...state,
        showForm: !state.showForm,
      };
    case SET:
      return {
        ...state,
        puntoventa: action.payload,
      };
    case GET:
      return {
        ...state,
        puntosventa: action.payload,
      };
    case DELETE:
      return {
        ...state,
        puntosventa: state.puntosventa.filter(
          (puntoventa) => puntoventa.id !== action.payload
        ),
      };
    case ADD:
      return {
        ...state,
        puntosventa: [...state.puntosventa, action.payload],
        showForm: false,
      };
    case UPDATE:
      return {
        ...state,
        puntosventa: state.puntosventa.map((puntoventa) =>
          puntoventa.id === action.payload.id ? action.payload : puntoventa
        ),
        showForm: false,
      };
    case TOGGLE_ESTADO:
      return {
        ...state,
        puntosventa: state.puntosventa.map((puntoventa) =>
          puntoventa.id === action.payload.id ? action.payload : puntoventa
        ),
      };
    default:
      return state;
  }
};
