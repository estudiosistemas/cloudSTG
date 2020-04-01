import React, { useContext, Fragment } from "react";
import condicionIVAContext from "../../../context/tablas/condicionIVA/condicionIVAContext";
import globalContext from "../../../context/global/globalContext";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { isEmpty } from "../../common/CoustomFunctions";

const CondicionIVAForm = ({ editar }) => {
  //context state
  const condicionIVACtx = useContext(condicionIVAContext);
  const {
    condicion,
    showFormCondicion,
    mostrarFormularioCondiciones,
    addCondicion,
    updateCondicion,
    setCondicion
  } = condicionIVACtx;

  const { id, codigo_afip, nombre } = condicion;

  //global state
  const GlobalCtx = useContext(globalContext);
  const { showMessage } = GlobalCtx;

  const onChange = e => {
    setCondicion({
      ...condicion,
      [e.target.name]: e.target.value.toUpperCase()
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    //valido formulario
    if (isEmpty(codigo_afip) | isEmpty(nombre)) {
      console.log(isEmpty(codigo_afip));
      console.log(isEmpty(nombre));
      showMessage({
        msg: "Hay campos vacíos",
        title: "Error",
        type: "error"
      });
    } else {
      //Agrego
      if (!editar) {
        addCondicion({ codigo_afip, nombre });
        //Reseteo el form
        setCondicion({
          nombre: "",
          codigo_afip: ""
        });
      } else {
        updateCondicion(condicion);
      }
      mostrarFormularioCondiciones();
    }
  };

  return (
    <Fragment>
      {showFormCondicion ? (
        <div
          className="p-grid  p-justify-center"
          style={{ margin: "20px 0px 50px 0px" }}
        >
          <div className="p-col ">
            <div className="card">
              {editar ? (
                <h1>Editar Condicion de IVA</h1>
              ) : (
                <h1>Agregar Condicion de IVA</h1>
              )}

              <form onSubmit={handleSubmit}>
                <div className="p-col-4">
                  <span
                    className="p-float-label"
                    style={{ margin: "25px 0px 25px 0px" }}
                  >
                    <InputText
                      id="id"
                      name="id"
                      size="50"
                      disabled
                      value={id}
                    />
                    <label htmlFor="id">Id</label>
                  </span>

                  <span
                    className="p-float-label"
                    style={{ margin: "25px 0px 0px 0px" }}
                  >
                    <InputText
                      id="codAfip"
                      name="codigo_afip"
                      onChange={onChange}
                      value={codigo_afip}
                      size="50"
                      autoFocus
                      keyfilter="pnum"
                    />
                    <label htmlFor="codAfip">Código AFIP</label>
                  </span>

                  <span
                    className="p-float-label"
                    style={{ margin: "25px 0px 25px 0px" }}
                  >
                    <InputText
                      id="nombre"
                      name="nombre"
                      onChange={onChange}
                      value={nombre}
                      size="50"
                    />
                    <label htmlFor="nombre">Condicion IVA</label>
                  </span>

                  <br />
                </div>
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
                    onClick={() => mostrarFormularioCondiciones()}
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

export default CondicionIVAForm;
