import React, { useReducer, useContext } from "react";
import axios from "axios";

import authContext from "./authContext";
import authReducer from "./authReducer";

import globalContext from "../global/globalContext";

//types
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
  UPDATE_PROFILE,
  UPDATE_PROFILE_IMG,
  UPDATE_AGENCIA,
  UPDATE_AGENCIA_IMG,
} from "../../types/auth";
import Profile from "../../components/accounts/Profile";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    isLoading: false,
    user: null,
    agencia: null,
  };

  //Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(authReducer, initialState);

  //global state
  const GlobalCtx = useContext(globalContext);
  const { showMessage } = GlobalCtx;

  // CHECK TOKEN & LOAD USER
  const loadUser = () => {
    //user loading
    dispatch({ type: USER_LOADING });

    axios
      .get("/api/auth/user", tokenConfig())
      .then((res) => {
        dispatch({
          type: USER_LOADED,
          payload: res.data,
        });
      })
      .catch((err) => {
        // showMessage({
        //   msg: err.response.data,
        //   title: "Error",
        //   type: "error"
        // });
        dispatch({
          type: AUTH_ERROR,
        });
      });
  };

  // LOGIN USER

  const login = (username, password) => {
    //headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    //request body
    const body = JSON.stringify({ username, password });

    axios
      .post("/api/auth/login", body, config)
      .then((res) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
        showMessage({
          msg: "Credenciales correctas",
          title: "Bienvenido",
          type: "success",
        });
      })
      .catch((err) => {
        showMessage({
          msg: err.response.data,
          title: "Error",
          type: "error",
        });
        dispatch({
          type: LOGIN_FAIL,
        });
      });
  };

  //LOGOUT USER
  const logout = () => {
    axios
      .post("/api/auth/logout/", null, tokenConfig())
      .then((res) => {
        dispatch({
          type: LOGOUT_SUCCESS,
        });
      })
      .catch((err) => {
        showMessage({
          msg: err.response.data,
          title: "Error",
          type: "error",
        });
      });
  };

  //setup config with token
  const tokenConfig = () => {
    //get token from state
    const token = state.token;

    //headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // if token, add to headers config
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }

    return config;
  };

  // REGISTR USER

  const register = ({ username, password, email }) => {
    //headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    //request body
    const body = JSON.stringify({ username, email, password });

    axios
      .post("/api/auth/register", body, config)
      .then((res) => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        showMessage({
          msg: err.response.data,
          title: "Error",
          type: "error",
        });
        dispatch({
          type: REGISTER_FAIL,
        });
      });
  };

  //Guardo AGENCIA seleccionada en state
  const setAgencia = (agencia) => {
    dispatch({
      type: SET_AGENCIA,
      payload: agencia,
    });
  };

  //UPDATE Usuario
  const updateUser = (usuario, image) => {
    //Actualizo datos usuario
    const miusuario = {
      username: usuario.username,
      email: usuario.email,
      first_name: usuario.first_name,
      last_name: usuario.last_name,
      profile: {
        domicilio: usuario.domicilio,
        telefono: usuario.telefono,
      },
    };
    axios
      .put(`/api/user/update/${usuario.id}/`, miusuario, tokenConfig())
      .then((res) => {
        dispatch({
          type: UPDATE_USER,
          payload: res.data,
        });
        showMessage({
          msg: "Datos de usuario actualizados",
          title: "Datos de Perfil",
          type: "success",
        });
      })
      .catch((err) =>
        showMessage({
          msg: err.response.data,
          title: "Error",
          type: "error",
        })
      );
    if (image) {
      //Actualizo imagen
      const uploadData = new FormData();
      uploadData.append("image", image, image.name);
      axios
        .put(
          `/api/profile/update/img/${usuario.id}/`,
          uploadData,
          tokenConfig()
        )
        .then((res) => {
          dispatch({
            type: UPDATE_PROFILE_IMG,
            payload: res.data.image,
          });
          showMessage({
            msg: "Imagen actualizada!",
            title: "Imagen de Perfil",
            type: "success",
          });
        })
        .catch((err) => console.log(err.response));
    }
    return;
  };

  //UPDATE Agencia
  const updateAgencia = (agencia, image) => {
    //Actualizo datos agencia
    const { localidades } = agencia;
    const miLocalidades = localidades.map((loc) => loc.codigo);
    const miAgencia = {
      ...agencia,
      localidades: miLocalidades,
    };
    axios
      .put(`/api/agencias/${agencia.id}/`, miAgencia, tokenConfig())
      .then((res) => {
        dispatch({
          type: UPDATE_AGENCIA,
          payload: agencia,
        });
        showMessage({
          msg: "Datos de Agencia actualizados",
          title: "Agencia",
          type: "success",
        });
      })
      .catch((err) =>
        showMessage({
          msg: err.response.data,
          title: "Error",
          type: "error",
        })
      );
    if (image) {
      //Actualizo imagen
      const uploadData = new FormData();
      uploadData.append("logo", image, image.name);
      axios
        .put(`/api/agencia/img/${agencia.id}/`, uploadData, tokenConfig())
        .then((res) => {
          dispatch({
            type: UPDATE_AGENCIA_IMG,
            payload: res.data.logo,
          });
          showMessage({
            msg: "Logo actualizado!",
            title: "Agencia",
            type: "success",
          });
        })
        .catch((err) => console.log(err.response));
    }
    return;
  };

  return (
    <authContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        isLoading: state.isLoading,
        user: state.user,
        agencia: state.agencia,
        loadUser,
        login,
        logout,
        tokenConfig,
        setAgencia,
        updateUser,
        updateAgencia,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
