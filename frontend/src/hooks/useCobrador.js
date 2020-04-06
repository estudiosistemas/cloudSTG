import React, { Fragment, useState, useEffect, useContext } from "react";
import axios from "axios";

import { Dropdown } from "primereact/dropdown";

import authContext from "../context/auth/authContext";

const useCobrador = (stateInicial) => {
  //state del hook
  const [state, actualizarState] = useState(stateInicial);
  const [cobradorList, setCobradorList] = useState([]);

  //auth state
  const authCtx = useContext(authContext);
  const { tokenConfig, agencia, user } = authCtx;

  const onChange = (e) => {
    actualizarState(e.value);
  };

  useEffect(() => {
    if (agencia) {
      axios
        .get(`/api/cobrador-agencia/${agencia.id}`, tokenConfig())
        .then((res) => {
          const lista = res.data.filter((el) => el.estado);
          setCobradorList(lista);
        })
        .catch((err) => console.log(err.response.statusText));
    }
  }, [agencia]);

  const miItemTemplate = (option) => option.nombre;

  const Seleccionar = () => {
    return (
      <Dropdown
        style={{ width: "90%" }}
        autoWidth={true}
        value={state}
        options={cobradorList}
        itemTemplate={miItemTemplate}
        optionLabel={"nombre"}
        onChange={onChange}
        placeholder="Seleccione Cobrador"
      />
    );
  };

  return [state, Seleccionar, actualizarState];
};

export default useCobrador;
