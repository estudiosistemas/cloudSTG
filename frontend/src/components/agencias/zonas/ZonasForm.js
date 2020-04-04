import React, { useContext, Fragment, useEffect } from "react";
import globalContext from "../../../context/global/globalContext";
import zonaContext from "../../../context/agencias/zonas/zonaContext";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import { isEmpty } from "../../common/CoustomFunctions";

const ZonasForm = ({ editar }) => {
  //context state
  const zonaCtx = useContext(zonaContext);
  const {
    zona,
    showForm,
    mostrarFormulario,
    addZona,
    updateZona,
    setZona
  } = zonaCtx;

  const { nombre } = zona;

  //global state
  const GlobalCtx = useContext(globalContext);
  const { showMessage } = GlobalCtx;

  const onChange = e => {
    setZona({
      ...zona,
      [e.target.name]: e.target.value.toUpperCase()
    });
  };

  const handleSubmit = () => {
    //valido formulario
    if (isEmpty(nombre)) {
      showMessage({
        msg: "Los campos con * son obligatorios",
        title: "Error",
        type: "error"
      });
    } else {
      //Agrego
      if (!editar) {
        addZona(zona);
      } else {
        updateZona(zona);
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
                {editar ? <h1>Editar Zona</h1> : <h1>Agregar Zona</h1>}
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

export default ZonasForm;
