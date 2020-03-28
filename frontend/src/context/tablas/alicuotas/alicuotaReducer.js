//types
import {
  SHOW_FORM_ALICUOTA,
  GET_ALICUOTAS,
  DELETE_ALICUOTA,
  ADD_ALICUOTA,
  UPDATE_ALICUOTA,
  SET_ALICUOTA
} from "../../../types/alicuotas";

export default (state, action) => {
  switch (action.type) {
    case SHOW_FORM_ALICUOTA:
      return {
        ...state,
        showFormAlicuota: !state.showFormAlicuota
      };
    case SET_ALICUOTA:
      return {
        ...state,
        alicuota: action.payload
      };
    case GET_ALICUOTAS:
      return {
        ...state,
        alicuotas: action.payload
      };
    case DELETE_ALICUOTA:
      return {
        ...state,
        alicuotas: state.alicuotas.filter(
          alicuota => alicuota.id !== action.payload
        )
      };
    case ADD_ALICUOTA:
      return {
        ...state,
        alicuotas: [...state.alicuotas, action.payload],
        showFormAlicuota: false
      };
    case UPDATE_ALICUOTA:
      return {
        ...state,
        alicuotas: state.alicuotas.map(alicuota =>
          alicuota.id === action.payload.id ? action.payload : alicuota
        ),
        showFormAlicuota: false
      };
    default:
      return state;
  }
};
