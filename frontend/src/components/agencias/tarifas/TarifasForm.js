import React, { useContext, Fragment, useEffect } from "react";
import globalContext from "../../../context/global/globalContext";
import tarifaContext from "../../../context/agencias/tarifas/tarifaContext";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import { isEmpty } from "../../common/CoustomFunctions";

const TarifasForm = ({ editar }) => {
  //context state
  const tarifaCtx = useContext(tarifaContext);
  const {
    tarifa,
    showForm,
    mostrarFormulario,
    addTarifa,
    updateTarifa,
    setTarifa,
  } = tarifaCtx;

  const { nombre } = tarifa;

  //global state
  const GlobalCtx = useContext(globalContext);
  const { showMessage } = GlobalCtx;

  const onChange = (e) => {
    setTarifa({
      ...tarifa,
      [e.target.name]: e.target.value.toUpperCase(),
    });
  };

  const handleSubmit = () => {
    //valido formulario
    if (isEmpty(nombre)) {
      showMessage({
        msg: "Los campos con * son obligatorios",
        title: "Error",
        type: "error",
      });
    } else {
      //Agrego
      if (!editar) {
        addTarifa(tarifa);
      } else {
        updateTarifa(tarifa);
      }
    }
  };

  return (
    <Fragment>
      {showForm ? (
        <Fragment>
          <div className="card">
            <div className="p-grid p-fluid">
              <div className="p-col-12">
                {editar ? <h1>Editar Tarifa</h1> : <h1>Agregar Tarifa</h1>}
              </div>
              <div className="p-col-12 p-md-6">
                <label style={{ marginTop: "1em" }}>Nombre*</label>
                <InputText
                  id="nombre"
                  name="nombre"
                  value={nombre}
                  onChange={onChange}
                  maxLength="100"
                  autoFocus
                />
              </div>

              <div className="p-col-12 p-md-6"></div>
              <div className="p-col-12 p-md-2">
                <Button
                  style={{ marginTop: "1em" }}
                  label="Grabar"
                  icon="pi pi-save"
                  className="p-button-success"
                  onClick={() => handleSubmit()}
                />
              </div>
              <div className="p-col-12 p-md-2">
                <Button
                  style={{ marginTop: "1em" }}
                  label="Cancelar"
                  icon="pi pi-undo"
                  className="p-button-primary"
                  onClick={() => mostrarFormulario()}
                />
              </div>
            </div>
          </div>
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default TarifasForm;
