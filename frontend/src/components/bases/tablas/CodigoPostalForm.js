import React, { useContext, Fragment, useEffect } from "react";
import codigopostalContext from "../../../context/tablas/codigos_postales/codigopostalContext";
import globalContext from "../../../context/global/globalContext";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { isEmpty } from "../../common/CoustomFunctions";

import useProvincia from "../../../hooks/useProvincia";

const CodigoPostalForm = ({ editar }) => {
  //context state
  const cpCtx = useContext(codigopostalContext);
  const { cp, showFormCP, mostrarFormularioCP, addCP, updateCP, setCP } = cpCtx;

  const { codigo, localidad, provincia } = cp;

  //global state
  const GlobalCtx = useContext(globalContext);
  const { showMessage } = GlobalCtx;

  //usar custom hook
  const [
    stateProvincia,
    SelectProvincia,
    actualizarStateProvincia
  ] = useProvincia({});

  const onChange = e => {
    setCP({
      ...cp,
      [e.target.name]: e.target.value.toUpperCase()
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    //valido formulario

    if (isEmpty(codigo) | isEmpty(localidad) | (stateProvincia == undefined)) {
      showMessage({
        msg: "Hay campos vacíos",
        title: "Error",
        type: "error"
      });
    } else {
      //Agrego
      const miCP = {
        codigo,
        localidad,
        provincia: stateProvincia
      };
      if (!editar) {
        addCP(miCP);
        //Reseteo el form
        setCP({
          localidad: "",
          codigo: "",
          provincia: {}
        });
      } else {
        updateCP(miCP);
      }
    }
  };

  useEffect(() => {
    actualizarStateProvincia(provincia);
  }, [cp]);

  return (
    <Fragment>
      {showFormCP ? (
        <div
          className="p-grid  p-justify-center"
          style={{ margin: "20px 0px 50px 0px" }}
        >
          <div className="p-col ">
            <div className="card">
              {editar ? (
                <h1>Editar Código Postal</h1>
              ) : (
                <h1>Agregar Código Postal</h1>
              )}

              <form onSubmit={handleSubmit}>
                <div className="p-col-4">
                  <span
                    className="p-float-label"
                    style={{ margin: "25px 0px 25px 0px" }}
                  >
                    <InputText
                      id="cod"
                      name="codigo"
                      size="50"
                      disabled={editar}
                      value={codigo}
                      onChange={onChange}
                      autoFocus
                    />
                    <label htmlFor="cod">Código Postal</label>
                  </span>
                  <span
                    className="p-float-label"
                    style={{ margin: "25px 0px 25px 0px" }}
                  >
                    <InputText
                      id="localidad"
                      name="localidad"
                      onChange={onChange}
                      autoFocus={editar}
                      value={localidad}
                      size="50"
                    />
                    <label htmlFor="alicuota">Localidad</label>
                  </span>
                  <SelectProvincia />
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
                    onClick={() => mostrarFormularioCP()}
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

export default CodigoPostalForm;
