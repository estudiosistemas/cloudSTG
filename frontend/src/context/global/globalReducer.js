import { CREATE_MESSAGE } from "../../types/global";

export default function(state, action) {
  switch (action.type) {
    case CREATE_MESSAGE:
      return {
        ...state,
        message: action.payload
      };

    default:
      return state;
  }
}
