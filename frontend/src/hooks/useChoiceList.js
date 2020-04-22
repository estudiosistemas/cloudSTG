import React, { Fragment, useState, useEffect, useContext } from "react";
import axios from "axios";

import { Dropdown } from "primereact/dropdown";

import authContext from "../context/auth/authContext";

const useChoiceList = (choiceInicial, stateInicial) => {
  //state del hook
  const [state, actualizarState] = useState(stateInicial);
  const [Lista, setLista] = useState([]);

  //auth state
  const authCtx = useContext(authContext);
  const { tokenConfig } = authCtx;

  const onChange = (e) => {
    actualizarState(e.value);
  };

  const selectOptions = () => {
    switch (choiceInicial) {
      case "tipocomprobante":
        return {
          url: "/api/tiposcomprobantechoice",
          placeholder: "Seleccione Tipo",
          elemento: null,
        };
      case "conceptocomprobante":
        return {
          url: "/api/conceptoscomprobante",
          placeholder: "Seleccione Concepto",
          elemento: 0,
        };
    }
  };

  useEffect(() => {
    axios
      .get(selectOptions().url, tokenConfig())
      .then((res) => {
        //Convierto el array de arrays en array de objetos
        const lista = res.data.reduce((acc, cur) => {
          return [...acc, { id: cur[0], nombre: cur[1] }];
        }, []);
        setLista(lista);

        //selecciono un elemento de la lista si no es null
        if (selectOptions().elemento != null) {
          actualizarState(lista[selectOptions().elemento]);
        }
      })
      .catch((err) => console.log(err.response.statusText));
  }, []);

  const miItemTemplate = (option) => option.nombre;

  const Seleccionar = () => {
    return (
      <Dropdown
        style={{ width: "90%" }}
        autoWidth={true}
        value={state}
        options={Lista}
        itemTemplate={miItemTemplate}
        optionLabel={"nombre"}
        onChange={onChange}
        placeholder={selectOptions().placeholder}
      />
    );
  };

  return [state, Seleccionar, actualizarState];
};

export default useChoiceList;
