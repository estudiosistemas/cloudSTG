import React, { Fragment, useState, useEffect, useContext } from "react";
import axios from "axios";

import { Dropdown } from "primereact/dropdown";

import authContext from "../context/auth/authContext";

const useTipo_Documento = stateInicial => {
  //state del hook
  const [state, actualizarState] = useState(stateInicial);
  const [tipodocumentoList, setTipoDocumentoList] = useState([]);

  //auth state
  const authCtx = useContext(authContext);
  const { tokenConfig } = authCtx;

  useEffect(() => {
    axios
      .get("/api/tipodocumento/", tokenConfig())
      .then(res => {
        setTipoDocumentoList(res.data);
      })
      .catch(err => console.log(err.response.statusText));
  }, []);

  const miItemTemplate = option => option.nombre;

  const Seleccionar = () => {
    return (
      <Dropdown
        style={{ width: "100%" }}
        autoWidth={true}
        value={state}
        options={tipodocumentoList}
        itemTemplate={miItemTemplate}
        optionLabel={"nombre"}
        onChange={e => {
          actualizarState(e.value);
        }}
        filter={true}
        filterPlaceholder="Buscar..."
        filterBy="label"
        placeholder="Seleccione Tipo de Documento"
      />
    );
  };

  return [state, Seleccionar, actualizarState];
};

export default useTipo_Documento;
