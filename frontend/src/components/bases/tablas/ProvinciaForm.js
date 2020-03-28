import React, { useState, useContext, Fragment } from "react";
import provinciaContext from "../../../context/tablas/provincias/provinciaContext";
import globalContext from "../../../context/global/globalContext";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { isEmpty } from "../../common/CoustomFunctions";

const ProvinciaForm = ({ editar }) => {
  //provincia state
  const provinciasContext = useContext(provinciaContext);
  const {
    provincia,
    showFormProvincia,
    mostrarFormularioProvincias,
    addProvincia,
    updateProvincia,
    setProvincia
  } = provinciasContext;

  const { codigo, nombre } = provincia;

  //global state
  const GlobalCtx = useContext(globalContext);
  const { showMessage } = GlobalCtx;

  const onChange = e => {
    setProvincia({
      ...provincia,
      [e.target.name]: e.target.value.toUpperCase()
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    //valido formulario
    if (isEmpty(codigo) || isEmpty(nombre)) {
      showMessage({
        msg: "Hay campos vacíos",
        title: "Error",
        type: "error"
      });
    } else {
      //Agrego la provincia
      if (!editar) {
        addProvincia(provincia);
        //Reseteo el form
        setProvincia({
          codigo: "",
          nombre: ""
        });
      } else {
        updateProvincia(provincia);
      }
    }
  };

  return (
    <Fragment>
      {showFormProvincia ? (
        <div
          className="p-grid  p-justify-center"
          style={{ margin: "20px 0px 50px 0px" }}
        >
          <div className="p-col ">
            <div className="card">
              {editar ? <h1>Editar Provincia</h1> : <h1>Agregar Provincia</h1>}

              <form onSubmit={handleSubmit}>
                <span
                  className="p-float-label"
                  style={{ margin: "25px 0px 0px 0px" }}
                >
                  <InputText
                    id="in"
                    name="codigo"
                    autoFocus
                    onChange={onChange}
                    disabled={editar}
                    value={codigo}
                    size="50"
                  />
                  <label htmlFor="in">Código</label>
                </span>
                <span
                  className="p-float-label"
                  style={{ margin: "25px 0px 25px 0px" }}
                >
                  <InputText
                    id="provincia"
                    name="nombre"
                    onChange={onChange}
                    autoFocus={editar}
                    value={nombre}
                    size="50"
                  />
                  <label htmlFor="provincia">Provincia</label>
                </span>

                <div>
                  <Button
                    style={{ margin: "15px 0px 0px 0px" }}
                    label="Grabar"
                    icon="pi pi-save"
                    className="p-button-success"
                    type="submit"
                  />
                  <Button
                    style={{ margin: "15px 0px 0px 10px" }}
                    label="Cancelar"
                    icon="pi pi-undo"
                    className="p-button-primary"
                    onClick={() => mostrarFormularioProvincias()}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default ProvinciaForm;
