import React, { Fragment, useState, useEffect, useContext } from "react";
import axios from "axios";

import { Dropdown } from "primereact/dropdown";

import authContext from "../context/auth/authContext";

const useUsuario = stateInicial => {
  //state del hook
  const [state, actualizarState] = useState(stateInicial);
  const [userList, setUserList] = useState([]);

  //auth state
  const authCtx = useContext(authContext);
  const { tokenConfig } = authCtx;

  useEffect(() => {
    axios
      .get("/api/auth/user/list", tokenConfig())
      .then(res => {
        setUserList(res.data);
      })
      .catch(err => console.log(err.response.statusText));
  }, []);

  const miItemTemplate = option => option.fullname;

  const Seleccionar = () => {
    return (
      <Dropdown
        style={{ width: "100%" }}
        autoWidth={true}
        value={state}
        options={userList}
        itemTemplate={miItemTemplate}
        optionLabel={"fullname"}
        onChange={e => {
          actualizarState(e.value);
        }}
        filter={true}
        filterPlaceholder="Buscar Usuario"
        filterBy="fullname"
        placeholder="Seleccione Usuario"
      />
    );
  };

  return [state, Seleccionar, actualizarState];
};

export default useUsuario;
