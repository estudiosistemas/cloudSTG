import React, { Fragment, useState, useEffect, useContext } from "react";
import axios from "axios";

import { Dropdown } from "primereact/dropdown";

import authContext from "../context/auth/authContext";

const useProvincia = stateInicial => {
  //state del hook
  const [state, actualizarState] = useState(stateInicial);
  const [provinciasList, setProvinciasList] = useState([]);

  //auth state
  const authCtx = useContext(authContext);
  const { tokenConfig } = authCtx;

  useEffect(() => {
    axios
      .get("/api/provincias/", tokenConfig())
      .then(res => {
        setProvinciasList(res.data);
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
        options={provinciasList}
        itemTemplate={miItemTemplate}
        optionLabel={"nombre"}
        onChange={e => {
          actualizarState(e.value);
        }}
        filter={true}
        filterPlaceholder="Seleccione Provincia"
        filterBy="label"
        placeholder="Seleccione Provincia"
      />
    );
  };

  return [state, Seleccionar, actualizarState];
};

export default useProvincia;
