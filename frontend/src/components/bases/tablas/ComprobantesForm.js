import React, { useContext, Fragment, useEffect } from "react";
import comprobanteContext from "../../../context/tablas/comprobantes/comprobanteContext";
import globalContext from "../../../context/global/globalContext";
import useChoiceList from "../../../hooks/useChoiceList";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { isEmpty } from "../../common/CoustomFunctions";
import { Checkbox } from "primereact/checkbox";

const ComprobantesForm = ({ editar }) => {
  //context state
  const comprobanteCtx = useContext(comprobanteContext);
  const {
    comprobante,
    showForm,
    mostrarFormulario,
    addComprobante,
    updateComprobante,
    setComprobante,
  } = comprobanteCtx;

  const {
    id,
    codigo_AFIP,
    descripcion,
    tipo_comprobante,
    es_sistema,
  } = comprobante;

  //Hook tipo comprobante
  const [stateTipo, SelectTipo, actualizarStateTipo] = useChoiceList(
    "tipocomprobante",
    {}
  );

  //global state
  const GlobalCtx = useContext(globalContext);
  const { showMessage } = GlobalCtx;

  const onChange = (e) => {
    setComprobante({
      ...comprobante,
      [e.target.name]: e.target.value.toUpperCase(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //valido formulario
    if (isEmpty(descripcion) | (stateTipo == undefined)) {
      showMessage({
        msg: "Hay campos vacíos",
        title: "Error",
        type: "error",
      });
    } else {
      const miCompro = {
        ...comprobante,
        tipo_comprobante: stateTipo,
      };
      if (!editar) {
        //Agrego
        addComprobante(miCompro);
      } else {
        //actualizo
        updateComprobante(miCompro);
      }
    }
  };

  useEffect(() => {
    actualizarStateTipo(tipo_comprobante);
  }, [tipo_comprobante]);

  return (
    <Fragment>
      {showForm ? (
        <div
          className="p-grid  p-justify-center"
          style={{ margin: "20px 0px 50px 0px" }}
        >
          <div className="p-col ">
            <div className="card">
              {editar ? (
                <h1>Editar Comprobante</h1>
              ) : (
                <h1>Agregar Comprobante</h1>
              )}

              <form onSubmit={handleSubmit}>
                <div className="p-col-4">
                  <span
                    className="p-float-label"
                    style={{ margin: "25px 0px 25px 0px" }}
                  >
                    <InputText
                      id="descripcion"
                      name="descripcion"
                      onChange={onChange}
                      value={descripcion || ""}
                      size="50"
                      maxLength="100"
                      autoFocus
                    />
                    <label htmlFor="descripcion">Descripción Comprobante</label>
                  </span>
                  <span
                    className="p-float-label"
                    style={{ margin: "25px 0px 0px 0px" }}
                  >
                    <InputText
                      id="codAfip"
                      name="codigo_AFIP"
                      onChange={onChange}
                      value={codigo_AFIP || ""}
                      size="50"
                      keyfilter="pnum"
                      maxLength="3"
                    />
                    <label htmlFor="codAfip">Código AFIP</label>
                  </span>
                  <div style={{ margin: "25px 0px 25px 0px" }}>
                    <SelectTipo />
                  </div>

                  <label
                    style={{
                      marginTop: "1em",
                      marginRight: "1em",
                    }}
                  >
                    Es Sistema
                  </label>
                  <Checkbox
                    checked={es_sistema}
                    onChange={(e) => {
                      setComprobante({
                        ...comprobante,
                        es_sistema: e.checked,
                      });
                    }}
                  />
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
                    onClick={() => mostrarFormulario()}
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

export default ComprobantesForm;
