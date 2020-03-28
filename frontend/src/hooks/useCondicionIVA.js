import React, { Fragment, useState, useEffect, useContext } from "react";
import axios from "axios";

import { Dropdown } from "primereact/dropdown";

import authContext from "../context/auth/authContext";

const useCondicionIVA = stateInicial => {
  //state del hook
  const [state, actualizarState] = useState(stateInicial);
  const [condicionList, setCondicionList] = useState([]);

  //auth state
  const authCtx = useContext(authContext);
  const { tokenConfig } = authCtx;

  useEffect(() => {
    axios
      .get("/api/condicioniva/", tokenConfig())
      .then(res => {
        setCondicionList(res.data);
      })
      .catch(err => alert.error(err.response.statusText));
  }, []);

  const miItemTemplate = option => option.nombre;

  const Seleccionar = () => {
    return (
      <Dropdown
        style={{ width: "100%" }}
        autoWidth={true}
        value={state}
        options={condicionList}
        itemTemplate={miItemTemplate}
        optionLabel={"nombre"}
        onChange={e => {
          actualizarState(e.value);
        }}
        filter={true}
        filterPlaceholder="Buscar..."
        filterBy="label"
        placeholder="Seleccione Condicion IVA"
      />
    );
  };

  return [state, Seleccionar, actualizarState];
};

export default useCondicionIVA;
