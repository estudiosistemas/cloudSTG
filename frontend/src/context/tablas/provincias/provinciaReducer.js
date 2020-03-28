//types
import {
  SHOW_FORM_PROVINCIA,
  GET_PROVINCIAS,
  DELETE_PROVINCIA,
  ADD_PROVINCIA,
  UPDATE_PROVINCIA,
  SET_PROVINCIA
} from "../../../types/provincias";

export default (state, action) => {
  switch (action.type) {
    case SHOW_FORM_PROVINCIA:
      return {
        ...state,
        showFormProvincia: !state.showFormProvincia
      };
    case SET_PROVINCIA:
      return {
        ...state,
        provincia: action.payload
      };
    case GET_PROVINCIAS:
      return {
        ...state,
        provincias: action.payload
      };
    case DELETE_PROVINCIA:
      return {
        ...state,
        provincias: state.provincias.filter(
          provincia => provincia.codigo !== action.payload
        )
      };
    case ADD_PROVINCIA:
      return {
        ...state,
        provincias: [...state.provincias, action.payload],
        showFormProvincia: false
      };
    case UPDATE_PROVINCIA:
      return {
        ...state,
        provincias: state.provincias.map(provincia =>
          provincia.codigo === action.payload.codigo
            ? action.payload
            : provincia
        ),
        showFormProvincia: false
      };
    default:
      return state;
  }
};
