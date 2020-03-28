//types
import {
  SHOW_FORM_CONDICION,
  GET_CONDICIONES,
  DELETE_CONDICION,
  ADD_CONDICION,
  UPDATE_CONDICION,
  SET_CONDICION
} from "../../../types/condicionIVA";

export default (state, action) => {
  switch (action.type) {
    case SHOW_FORM_CONDICION:
      return {
        ...state,
        showFormCondicion: !state.showFormCondicion
      };
    case SET_CONDICION:
      return {
        ...state,
        condicion: action.payload
      };
    case GET_CONDICIONES:
      return {
        ...state,
        condiciones: action.payload
      };
    case DELETE_CONDICION:
      return {
        ...state,
        condiciones: state.condiciones.filter(
          condicion => condicion.id !== action.payload
        )
      };
    case ADD_CONDICION:
      return {
        ...state,
        condiciones: [...state.condiciones, action.payload],
        showFormCondicion: false
      };
    case UPDATE_CONDICION:
      return {
        ...state,
        condiciones: state.condiciones.map(condicion =>
          condicion.id === action.payload.id ? action.payload : condicion
        ),
        showFormCondiciones: false
      };
    default:
      return state;
  }
};
