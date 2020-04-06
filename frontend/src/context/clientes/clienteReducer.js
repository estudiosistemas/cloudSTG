//types
import {
  SHOW_FORM_CLIENTE,
  GET_CLIENTES,
  DELETE_CLIENTE,
  ADD_CLIENTE,
  UPDATE_CLIENTE,
  SET_CLIENTE,
  TOGGLE_ESTADO,
  GET_CLIENTE_AGENCIA,
  SET_CLIENTE_AGENCIA,
} from "../../types/clientes";

export default (state, action) => {
  switch (action.type) {
    case SHOW_FORM_CLIENTE:
      return {
        ...state,
        showForm: !state.showForm,
      };
    case SET_CLIENTE:
      return {
        ...state,
        cliente: action.payload,
      };

    case GET_CLIENTES:
      return {
        ...state,
        clientes: action.payload,
      };
    case DELETE_CLIENTE:
      return {
        ...state,
        clientes: state.clientes.filter((cli) => cli.id !== action.payload),
      };
    case ADD_CLIENTE:
      return {
        ...state,
        clientes: [...state.clientes, action.payload],
        showForm: false,
      };
    case UPDATE_CLIENTE:
      return {
        ...state,
        clientes: state.clientes.map((cli) =>
          cli.id === action.payload.id ? action.payload : cli
        ),
        showForm: false,
      };
    case TOGGLE_ESTADO:
      return {
        ...state,
        clientes: state.clientes.map((cliente) =>
          cliente.id === action.payload.id ? action.payload : cliente
        ),
      };
    case SET_CLIENTE_AGENCIA:
    case GET_CLIENTE_AGENCIA:
      return {
        ...state,
        cliente_agencia: action.payload,
      };
    default:
      return state;
  }
};
