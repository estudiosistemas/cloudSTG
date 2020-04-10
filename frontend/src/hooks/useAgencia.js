import React, { Fragment, useState, useEffect, useContext } from "react";
import axios from "axios";

import { Dropdown } from "primereact/dropdown";

import authContext from "../context/auth/authContext";

const useAgencia = (stateInicial) => {
  //state del hook
  const [state, actualizarState] = useState(stateInicial);
  const [agenciasList, setAgenciasList] = useState([]);

  //auth state
  const authCtx = useContext(authContext);
  const { tokenConfig, user, agencia, setAgencia } = authCtx;

  const onChange = (e) => {
    actualizarState(e.value);
    setAgencia(e.value);
  };

  useEffect(() => {
    axios
      .get(`/api/auth/agenciasusuario/${user.id}`, tokenConfig())
      .then((res) => {
        setAgenciasList(res.data.agencias);
        actualizarState(res.data.agencias[0]);
        setAgencia(res.data.agencias[0]);
      })
      .catch((err) => console.log(err.response.statusText));
  }, []);

  // Localizo la agencia a reemplazar y creo una nueva lista con el reemplazo para despues actualizar agenciasList
  const actualizarListaAgencias = (agenciaVieja, agenciaNueva) => {
    const pos = agenciasList.indexOf(agenciaVieja);
    let lista = agenciasList;
    lista.splice(pos, 1, agenciaNueva);
    setAgenciasList(lista);
  };

  //Al actualizar los datos de la agencia, debo actualizar el hook de agencias
  useEffect(() => {
    if (agencia) {
      if (state != agencia) {
        actualizarListaAgencias(state, agencia);
        actualizarState(agencia);
      }
    }
  }, [agencia]);

  const miItemTemplate = (option) => option.nombre;

  const Seleccionar = () => {
    return (
      <Dropdown
        style={{ width: "90%" }}
        autoWidth={true}
        value={state}
        options={agenciasList}
        itemTemplate={miItemTemplate}
        optionLabel={"nombre"}
        onChange={onChange}
        placeholder="Seleccione Agencia"
      />
    );
  };

  return [state, Seleccionar, actualizarState];
};

export default useAgencia;
