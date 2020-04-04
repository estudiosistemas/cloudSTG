//types
import {
  SHOW_FORM_ZONA,
  GET_ZONAS,
  DELETE_ZONA,
  ADD_ZONA,
  UPDATE_ZONA,
  SET_ZONA,
  TOGGLE_ESTADO_ZONA
} from "../../../types/zonas";

export default (state, action) => {
  switch (action.type) {
    case SHOW_FORM_ZONA:
      return {
        ...state,
        showForm: !state.showForm
      };
    case SET_ZONA:
      return {
        ...state,
        zona: action.payload
      };
    case GET_ZONAS:
      return {
        ...state,
        zonas: action.payload
      };
    case DELETE_ZONA:
      return {
        ...state,
        zonas: state.zonas.filter(zona => zona.id !== action.payload)
      };
    case ADD_ZONA:
      return {
        ...state,
        zonas: [...state.zonas, action.payload],
        showForm: false
      };
    case UPDATE_ZONA:
      return {
        ...state,
        zonas: state.zonas.map(zon =>
          zon.id === action.payload.id ? action.payload : zon
        ),
        showForm: false
      };
    case TOGGLE_ESTADO_ZONA:
      return {
        ...state,
        zonas: state.zonas.map(zona =>
          zona.id === action.payload.id ? action.payload : zona
        )
      };
    default:
      return state;
  }
};
