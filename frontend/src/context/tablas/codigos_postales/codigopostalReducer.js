//types
import {
  SHOW_FORM_CP,
  GET_CP,
  DELETE_CP,
  ADD_CP,
  UPDATE_CP,
  SET_CP
} from "../../../types/codigospostales";

export default (state, action) => {
  switch (action.type) {
    case SHOW_FORM_CP:
      return {
        ...state,
        showFormCP: !state.showFormCP
      };
    case SET_CP:
      return {
        ...state,
        cp: action.payload
      };
    case GET_CP:
      return {
        ...state,
        codigospostales: action.payload
      };
    case DELETE_CP:
      return {
        ...state,
        codigospostales: state.codigospostales.filter(
          cp => cp.codigo !== action.payload
        )
      };
    case ADD_CP:
      return {
        ...state,
        codigospostales: [...state.codigospostales, action.payload],
        showFormCP: false
      };
    case UPDATE_CP:
      return {
        ...state,
        codigospostales: state.codigospostales.map(cp =>
          cp.codigo === action.payload.codigo ? action.payload : cp
        ),
        showFormCP: false
      };
    default:
      return state;
  }
};
