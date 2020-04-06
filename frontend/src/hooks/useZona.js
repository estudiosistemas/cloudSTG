import React, { Fragment, useState, useEffect, useContext } from "react";
import axios from "axios";

import { Dropdown } from "primereact/dropdown";

import authContext from "../context/auth/authContext";

const useZona = (stateInicial) => {
  //state del hook
  const [state, actualizarState] = useState(stateInicial);
  const [zonaList, setZonaList] = useState([]);

  //auth state
  const authCtx = useContext(authContext);
  const { tokenConfig, agencia } = authCtx;

  const onChange = (e) => {
    actualizarState(e.value);
  };

  useEffect(() => {
    if (agencia) {
      axios
        .get(`/api/zona-agencia/${agencia.id}`, tokenConfig())
        .then((res) => {
          const lista = res.data.filter((el) => el.estado);
          setZonaList(lista);
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
        options={zonaList}
        itemTemplate={miItemTemplate}
        optionLabel={"nombre"}
        onChange={onChange}
        placeholder="Seleccione Zona"
      />
    );
  };

  return [state, Seleccionar, actualizarState];
};

export default useZona;
