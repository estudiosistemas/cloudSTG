import React, { useContext, Fragment, useEffect, useState } from "react";
import clienteContext from "../../context/clientes/clienteContext";
import globalContext from "../../context/global/globalContext";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { Checkbox } from "primereact/checkbox";
import { Calendar } from "primereact/calendar";

import { calendar_locale_es } from "../common/component_constants";

import { isEmpty, dateCalendarToSave } from "../common/CoustomFunctions";

import useTipo_Documento from "../../hooks/useTipo_Documento";
import useCondicionIva from "../../hooks/useCondicionIva";
import useCodigoPostal from "../../hooks/useCodigoPostal";
import useCobrador from "../../hooks/useCobrador";
import useZona from "../../hooks/useZona";
import useTarifa from "../../hooks/useTarifa";

const ClientesForm = ({ editar }) => {
  //context state
  const clientesCtx = useContext(clienteContext);
  const {
    cliente,
    showForm,
    mostrarFormulario,
    addCliente,
    updateCliente,
    setCliente,
    cliente_agencia,
    setClienteAgencia,
  } = clientesCtx;

  const {
    nombre,
    tipo_documento,
    nro_documento,
    iva,
    codigo_postal,
    domicilio,
    telefono,
    email,
    representante,
    seguro_propio,
    seguro_propio_vencimiento,
  } = cliente;

  const {
    cobrador,
    zona,
    tarifa,
    tarifa_bulto,
    tarifa_kg,
    tarifa_m3,
    tarifa_porcentaje,
    cta_cte,
  } = cliente_agencia;

  //global state
  const GlobalCtx = useContext(globalContext);
  const { showMessage } = GlobalCtx;

  //usar custom hook
  const [
    stateTipo_Documento,
    SelectTipo_Documento,
    actualizarStateTipo_Documento,
  ] = useTipo_Documento({});

  const [
    stateCondicionIva,
    SelectCondicionIva,
    actualizarStateCondicionIva,
  ] = useCondicionIva({});

  const [
    stateCodigoPostal,
    SelectCodigoPostal,
    actualizarStateCodigoPostal,
  ] = useCodigoPostal({});

  const [stateCobrador, SelectCobrador, actualizarStateCobrador] = useCobrador(
    {}
  );

  const [stateZona, SelectZona, actualizarStateZona] = useZona({});

  const [stateTarifa, SelectTarifa, actualizarStateTarifa] = useTarifa({});

  const [agregoClienteAgencia, setAgregoClienteAgencia] = useState(true);

  const onChange = (e) => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value.toUpperCase(),
    });
  };

  const handleSubmit = () => {
    //valido formulario
    if (
      isEmpty(nombre) |
      (stateTipo_Documento == undefined) |
      (stateCondicionIva == undefined) |
      (stateCodigoPostal == undefined) |
      (stateCobrador == undefined) |
      (stateZona == undefined) |
      (stateTarifa == undefined)
    ) {
      showMessage({
        msg: "Los campos con * son obligatorios.",
        title: "Error",
        type: "error",
      });
    } else {
      //Agrego
      //Doy formato a la fecha del seguro
      const miVtoSeguro = dateCalendarToSave(seguro_propio_vencimiento);

      const miCliente = {
        ...cliente,
        tipo_documento: stateTipo_Documento,
        iva: stateCondicionIva,
        codigo_postal: stateCodigoPostal,
        seguro_propio_vencimiento: miVtoSeguro,
      };

      const miClienteAgencia = {
        ...cliente_agencia,
        cobrador: stateCobrador,
        zona: stateZona,
        tarifa: stateTarifa,
      };

      if (!editar) {
        addCliente(miCliente, miClienteAgencia);
      } else {
        updateCliente(miCliente, miClienteAgencia);
      }
    }
  };

  useEffect(() => {
    actualizarStateTipo_Documento(tipo_documento);
    actualizarStateCodigoPostal(codigo_postal);
    actualizarStateCondicionIva(iva);
    actualizarStateCobrador(cobrador);
    actualizarStateZona(zona);
    actualizarStateTarifa(tarifa);
  }, [tipo_documento, codigo_postal, iva, cobrador, zona, tarifa]);

  return (
    <Fragment>
      {showForm ? (
        <Fragment>
          <div className="card">
            <div className="p-grid p-fluid">
              <div className="p-col-12">
                {editar ? <h1>Editar Cliente</h1> : <h1>Agregar Cliente</h1>}
              </div>
              <div className="p-col-12 p-md-6">
                <label style={{ marginTop: "1em" }}>Nombre/Razón Social*</label>
                <InputText
                  id="nombre"
                  name="nombre"
                  value={nombre}
                  onChange={onChange}
                  maxLength="150"
                  autoFocus
                />
              </div>

              <div className="p-col-6"></div>

              <div className="p-col-12 p-md-4">
                <label style={{ marginTop: "1em" }}>Tipo Documento*</label>
                <SelectTipo_Documento />
              </div>

              <div className="p-col-12 p-md-2">
                <label style={{ marginTop: "1em" }}>Nro. Documento</label>

                <InputText
                  id="nro_documento"
                  name="nro_documento"
                  onChange={onChange}
                  value={nro_documento}
                  maxLength="11"
                />
              </div>

              <div className="p-col-12 p-md-6">
                <label style={{ marginTop: "1em" }}>Cond. I.V.A.*</label>
                <SelectCondicionIva />
              </div>

              <div className="p-col-12 p-md-6">
                <label style={{ marginTop: "1em" }}>Domicilio</label>

                <InputText
                  id="domicilio"
                  name="domicilio"
                  onChange={onChange}
                  value={domicilio}
                  maxLength="150"
                />
              </div>
              <div className="p-col-12 p-md-6">
                <label style={{ marginTop: "1em" }}>Localidad*</label>
                <SelectCodigoPostal />
              </div>

              <div className="p-col-12 p-md-6">
                <label style={{ marginTop: "1em" }}>Teléfono</label>

                <InputText
                  id="telefono"
                  name="telefono"
                  onChange={onChange}
                  value={telefono}
                  maxLength="150"
                />
              </div>
              <div className="p-col-12 p-md-6">
                <label style={{ marginTop: "1em" }}>Email</label>

                <InputText
                  id="email"
                  name="email"
                  onChange={onChange}
                  value={email}
                  maxLength="150"
                />
              </div>

              <div className="p-col-12 p-md-6">
                <label style={{ marginTop: "1em" }}>Representante</label>

                <InputText
                  id="representante"
                  name="representante"
                  onChange={onChange}
                  value={representante}
                  maxLength="150"
                />
              </div>
              <div className="p-col-12 p-md-6">
                <label style={{ marginTop: "1em" }}>Cobrador*</label>
                <SelectCobrador />
              </div>
              <div className="p-col-12 p-md-6">
                <label style={{ marginTop: "1em" }}>Zona*</label>
                <SelectZona />
              </div>
              <div className="p-col-12 p-md-6">
                <label style={{ marginTop: "1em" }}>Tarifa*</label>
                <SelectTarifa />
              </div>

              <div className="p-col-12 p-md-3 p-col-align-center">
                <label
                  style={{
                    marginTop: "1em",
                    marginRight: "1em",
                  }}
                >
                  Tarifa Bulto
                </label>
                <Checkbox
                  checked={tarifa_bulto}
                  onChange={(e) => {
                    setClienteAgencia({
                      ...cliente_agencia,
                      tarifa_bulto: e.checked,
                    });
                  }}
                />
              </div>
              <div className="p-col-12 p-md-3 p-col-align-center">
                <label
                  style={{
                    marginTop: "1em",
                    marginRight: "1em",
                  }}
                >
                  Tarifa Kg
                </label>
                <Checkbox
                  checked={tarifa_kg}
                  onChange={(e) => {
                    setClienteAgencia({
                      ...cliente_agencia,
                      tarifa_kg: e.checked,
                    });
                  }}
                />
              </div>
              <div className="p-col-12 p-md-3 p-col-align-center">
                <label
                  style={{
                    marginTop: "1em",
                    marginRight: "1em",
                  }}
                >
                  Tarifa m3
                </label>
                <Checkbox
                  checked={tarifa_m3}
                  onChange={(e) => {
                    setClienteAgencia({
                      ...cliente_agencia,
                      tarifa_m3: e.checked,
                    });
                  }}
                />
              </div>

              <div className="p-col-12 p-md-3 p-col-align-center">
                <label
                  style={{
                    marginTop: "1em",
                    marginRight: "1em",
                  }}
                >
                  Tarifa %
                </label>
                <Checkbox
                  checked={tarifa_porcentaje}
                  onChange={(e) => {
                    setClienteAgencia({
                      ...cliente_agencia,
                      tarifa_porcentaje: e.checked,
                    });
                  }}
                />
              </div>

              <div className="p-col-12 p-md-3 p-col-align-center">
                <label
                  style={{
                    marginTop: "1em",
                    marginRight: "1em",
                  }}
                >
                  Seguro Propio
                </label>
                <Checkbox
                  checked={seguro_propio}
                  onChange={(e) => {
                    setCliente({
                      ...cliente,
                      seguro_propio: e.checked,
                    });
                  }}
                />
              </div>
              <div className="p-col-12 p-md-3 p-col-align-center">
                <Calendar
                  value={seguro_propio_vencimiento}
                  onChange={(e) => {
                    setCliente({
                      ...cliente,
                      seguro_propio_vencimiento: e.value,
                    });
                  }}
                  locale={calendar_locale_es}
                  dateFormat="dd/mm/yy"
                  placeholder="Fecha Vencimiento Seguro"
                  showIcon={true}
                  disabled={!seguro_propio}
                />
              </div>
              <div className="p-col-12 p-md-6 p-col-align-center">
                <label
                  style={{
                    marginTop: "1em",
                    marginRight: "1em",
                  }}
                >
                  Cuenta Corriente
                </label>
                <Checkbox
                  checked={cta_cte}
                  onChange={(e) => {
                    setClienteAgencia({
                      ...cliente_agencia,
                      cta_cte: e.checked,
                    });
                  }}
                />
              </div>
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
                  onClick={() => {
                    mostrarFormulario();
                  }}
                />
              </div>
            </div>
          </div>
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default ClientesForm;
