import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  SET_AGENCIA,
  UPDATE_USER,
  UPDATE_PROFILE_IMG
} from "../../types/auth";

export default function(state, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };

    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
    case SET_AGENCIA:
      return {
        ...state,
        agencia: action.payload
      };
    case UPDATE_PROFILE_IMG:
      return {
        ...state,
        user: {
          ...state.user,
          profile: {
            ...state.user.profile,
            image: action.payload
          }
        }
      };
    case UPDATE_USER:
      return {
        ...state,
        user: {
          ...state.user,
          username: action.payload.username,
          email: action.payload.email,
          first_name: action.payload.first_name,
          last_name: action.payload.last_name,
          profile: {
            ...state.user.profile,
            domicilio: action.payload.profile.domicilio,
            telefono: action.payload.profile.telefono
          }
        }
      };
    default:
      return state;
  }
}
