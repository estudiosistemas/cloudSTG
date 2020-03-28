import React, { Fragment, useState, useEffect, useContext } from "react";
import axios from "axios";

import { Dropdown } from "primereact/dropdown";

import authContext from "../context/auth/authContext";

const useTarifa = stateInicial => {
  //state del hook
  const [state, actualizarState] = useState(stateInicial);
  const [tarifaList, setTarifaList] = useState([]);

  //auth state
  const authCtx = useContext(authContext);
  const { tokenConfig, agencia, user } = authCtx;

  const onChange = e => {
    actualizarState(e.value);
  };

  useEffect(() => {
    if (agencia) {
      axios
        .get(`/api/tarifa-agencia/${agencia.id}`, tokenConfig())
        .then(res => {
          setTarifaList(res.data);
        })
        .catch(err => console.log(err.response.statusText));
    }
  }, [agencia]);

  const miItemTemplate = option => option.nombre;

  const Seleccionar = () => {
    return (
      <Dropdown
        style={{ width: "90%" }}
        autoWidth={true}
        value={state}
        options={tarifaList}
        itemTemplate={miItemTemplate}
        optionLabel={"nombre"}
        onChange={onChange}
        placeholder="Seleccione Tarifa"
      />
    );
  };

  return [state, Seleccionar, actualizarState];
};

export default useTarifa;
