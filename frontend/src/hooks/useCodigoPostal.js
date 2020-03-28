import React, { Fragment, useState, useEffect, useContext } from "react";
import axios from "axios";

import { Dropdown } from "primereact/dropdown";

import authContext from "../context/auth/authContext";

const useCodigoPostal = stateInicial => {
  //state del hook
  const [state, actualizarState] = useState(stateInicial);
  const [cpList, setCPList] = useState([]);

  //auth state
  const authCtx = useContext(authContext);
  const { tokenConfig } = authCtx;

  useEffect(() => {
    axios
      .get("/api/codigospostales/", tokenConfig())
      .then(res => {
        setCPList(res.data);
      })
      .catch(err => console.log(err.response));
  }, []);

  const miItemTemplate = option => `(${option.codigo}) ${option.localidad}`;
  const Seleccionar = () => {
    return (
      <Dropdown
        style={{ width: "100%" }}
        autoWidth={true}
        value={state}
        options={cpList}
        itemTemplate={miItemTemplate}
        optionLabel={"localidad"}
        onChange={e => {
          actualizarState(e.value);
        }}
        filter={true}
        filterPlaceholder="Buscar..."
        filterBy="label"
        placeholder="Seleccione Localidad"
      />
    );
  };

  return [state, Seleccionar, actualizarState];
};

export default useCodigoPostal;
