import React, { useContext, Fragment } from "react";
import alicuotaContext from "../../../context/tablas/alicuotas/alicuotaContext";
import globalContext from "../../../context/global/globalContext";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { isEmpty } from "../../common/CoustomFunctions";

const AlicuotasForm = ({ editar }) => {
  //context state
  const alicuotaCtx = useContext(alicuotaContext);
  const {
    alicuota,
    showFormAlicuota,
    mostrarFormularioAlicuotas,
    addAlicuota,
    updateAlicuota,
    setAlicuota
  } = alicuotaCtx;

  const { id, nombre, tasa, codigo_Afip } = alicuota;

  //global state
  const GlobalCtx = useContext(globalContext);
  const { showMessage } = GlobalCtx;

  const onChange = e => {
    setAlicuota({
      ...alicuota,
      [e.target.name]: e.target.value.toUpperCase()
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    //valido formulario
    if (isEmpty(id) | isEmpty(nombre) | isEmpty(tasa) | isEmpty(codigo_Afip)) {
      showMessage({
        msg: "Hay campos vacíos",
        title: "Error",
        type: "error"
      });
    } else {
      //Agrego
      if (!editar) {
        addAlicuota({ nombre, tasa, codigo_Afip });
        //Reseteo el form
        setAlicuota({
          nombre: "",
          tasa: "",
          codigo_Afip: ""
        });
      } else {
        updateAlicuota(alicuota);
      }
    }
  };

  return (
    <Fragment>
      {showFormAlicuota ? (
        <div
          className="p-grid  p-justify-center"
          style={{ margin: "20px 0px 50px 0px" }}
        >
          <div className="p-col ">
            <div className="card">
              {editar ? (
                <h1>Editar Alicuota IVA</h1>
              ) : (
                <h1>Agregar Alicuota IVA</h1>
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
                    style={{ margin: "25px 0px 25px 0px" }}
                  >
                    <InputText
                      id="alicuota"
                      name="nombre"
                      onChange={onChange}
                      autoFocus
                      value={nombre}
                      size="50"
                    />
                    <label htmlFor="alicuota">Alícuota</label>
                  </span>
                  <span
                    className="p-float-label"
                    style={{ margin: "25px 0px 0px 0px" }}
                  >
                    <InputText
                      id="tasa"
                      name="tasa"
                      onChange={onChange}
                      value={tasa}
                      size="50"
                      keyfilter="pnum"
                    />
                    <label htmlFor="tasa">Tasa</label>
                  </span>
                  <span
                    className="p-float-label"
                    style={{ margin: "25px 0px 0px 0px" }}
                  >
                    <InputText
                      id="codAfip"
                      name="codigo_Afip"
                      onChange={onChange}
                      value={codigo_Afip}
                      size="50"
                      keyfilter="pnum"
                    />
                    <label htmlFor="codAfip">Código AFIP</label>
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
                    onClick={() => mostrarFormularioAlicuotas()}
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

export default AlicuotasForm;
