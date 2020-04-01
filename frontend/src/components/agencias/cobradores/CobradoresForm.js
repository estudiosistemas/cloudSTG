import React, { useContext, Fragment, useEffect } from "react";
import cobradoreContext from "../../../context/agencias/cobradores/cobradorContext";
import globalContext from "../../../context/global/globalContext";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { Checkbox } from "primereact/checkbox";

import { isEmpty } from "../../common/CoustomFunctions";
import cobradorContext from "../../../context/agencias/cobradores/cobradorContext";

const CobradoresForm = ({ editar }) => {
  //context state
  const cobradorCtx = useContext(cobradorContext);
  const {
    cobrador,
    showForm,
    mostrarFormulario,
    addCobrador,
    updateCobrador,
    setCobrador
  } = cobradorCtx;

  if (cobrador) {
    const { nombre } = cobrador;
  }

  //global state
  const GlobalCtx = useContext(globalContext);
  const { showMessage } = GlobalCtx;

  const onChange = e => {
    setCobrador({
      ...cobrador,
      [e.target.name]: e.target.value.toUpperCase()
    });
  };

  const handleSubmit = () => {
    //valido formulario
    if (isEmpty(nombre)) {
      showMessage({
        msg: "Los campos con * son obligatorios.",
        title: "Error",
        type: "error"
      });
    } else {
      //Agrego
      const miCobrador = {
        ...cobrador
      };

      if (!editar) {
        addCobrador(miCobrador);
      } else {
        updateCobrador(miCobrador);
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
                {editar ? <h1>Editar Cobrador</h1> : <h1>Agregar Cobrador</h1>}
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

              <div className="p-col-6"></div>

              <div className="p-col-12 p-md-2">
                <label style={{ marginTop: "1em" }}>Domicilio</label>

                <InputText
                  id="domicilio"
                  name="domicilio"
                  onChange={onChange}
                  value={domicilio}
                  maxLength="100"
                />
              </div>

              <div className="p-col-6"></div>

              <div className="p-col-12 p-md-6">
                <label style={{ marginTop: "1em" }}>Teléfono</label>

                <InputText
                  id="telefono"
                  name="telefono"
                  onChange={onChange}
                  value={telefono}
                  maxLength="100"
                />
              </div>
              <div className="p-col-6"></div>
              <div className="p-col-12 p-md-6">
                <label style={{ marginTop: "1em" }}>Comisión</label>

                <InputText
                  id="comision"
                  name="comision"
                  onChange={onChange}
                  value={comision}
                  maxLength="5"
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

export default CobradoresForm;
