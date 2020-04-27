import React, { useContext, Fragment, useEffect } from "react";
import globalContext from "../../../context/global/globalContext";
import puntoventaContext from "../../../context/agencias/puntosventa/puntoventaContext";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import { isEmpty } from "../../common/CoustomFunctions";

//hook
import useChoiceList from "../../../hooks/useChoiceList";

const PuntosVentaForm = ({ editar }) => {
  //context state
  const puntoventaCtx = useContext(puntoventaContext);
  const {
    puntoventa,
    showForm,
    mostrarFormulario,
    addPuntoVenta,
    updatePuntoVenta,
    setPuntoVenta,
  } = puntoventaCtx;

  const { punto_venta, descripcion, concepto } = puntoventa;

  //global state
  const GlobalCtx = useContext(globalContext);
  const { showMessage } = GlobalCtx;

  //Hook tipo comprobante
  const [
    stateConcepto,
    SelectConcepto,
    actualizarStateConcepto,
  ] = useChoiceList("conceptocomprobante", {});

  const onChange = (e) => {
    setPuntoVenta({
      ...puntoventa,
      [e.target.name]: e.target.value.toUpperCase(),
    });
  };

  const handleSubmit = () => {
    //valido formulario
    if (
      isEmpty(punto_venta) ||
      isEmpty(descripcion) ||
      stateConcepto == undefined
    ) {
      showMessage({
        msg: "Los campos con * son obligatorios",
        title: "Error",
        type: "error",
      });
    } else {
      const miPuntoVenta = {
        ...puntoventa,
        concepto: stateConcepto.id,
      };
      //Agrego
      if (!editar) {
        addPuntoVenta(miPuntoVenta);
      } else {
        updatePuntoVenta(miPuntoVenta);
      }
    }
  };

  useEffect(() => {
    actualizarStateConcepto(concepto);
  }, [concepto]);

  return (
    <Fragment>
      {showForm ? (
        <Fragment>
          <div className="card">
            <div className="p-grid p-fluid">
              <div className="p-col-12">
                {editar ? (
                  <h1>Editar Punto de Venta</h1>
                ) : (
                  <h1>Agregar Punto de Venta</h1>
                )}
              </div>
              <div className="p-col-12 p-md-6">
                <label style={{ marginTop: "1em" }}>Punto de Venta*</label>
                <InputText
                  id="punto_venta"
                  name="punto_venta"
                  value={punto_venta || ""}
                  onChange={onChange}
                  maxLength="5"
                  autoFocus
                />
              </div>
              <div className="p-col-12 p-md-6">
                <label style={{ marginTop: "1em" }}>Descripción*</label>
                <InputText
                  id="descripcion"
                  name="descripcion"
                  value={descripcion || ""}
                  onChange={onChange}
                  maxLength="100"
                />
              </div>
              <div className="p-col-12 p-md-6">
                <label style={{ marginTop: "1em" }}>Concepto*</label>
                <SelectConcepto />
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

export default PuntosVentaForm;
