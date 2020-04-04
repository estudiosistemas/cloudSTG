//types
import {
  SHOW_FORM_TARIFA,
  GET_TARIFAS,
  ADD_TARIFA,
  UPDATE_TARIFA,
  SET_TARIFA,
  TOGGLE_ESTADO_TARIFA,
} from "../../../types/tarifas";

export default (state, action) => {
  switch (action.type) {
    case SHOW_FORM_TARIFA:
      return {
        ...state,
        showForm: !state.showForm,
      };
    case SET_TARIFA:
      return {
        ...state,
        tarifa: action.payload,
      };
    case GET_TARIFAS:
      return {
        ...state,
        tarifas: action.payload,
      };
    case ADD_TARIFA:
      return {
        ...state,
        tarifas: [...state.tarifas, action.payload],
        showForm: false,
      };
    case UPDATE_TARIFA:
      return {
        ...state,
        tarifas: state.tarifas.map((tar) =>
          tar.id === action.payload.id ? action.payload : tar
        ),
        showForm: false,
      };
    case TOGGLE_ESTADO_TARIFA:
      return {
        ...state,
        tarifas: state.tarifas.map((tarifa) =>
          tarifa.id === action.payload.id ? action.payload : tarifa
        ),
      };
    default:
      return state;
  }
};
