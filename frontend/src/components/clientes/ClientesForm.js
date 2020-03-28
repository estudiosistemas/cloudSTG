import React, { useContext, Fragment, useEffect } from "react";
import clienteContext from "../../context/clientes/clienteContext";
import globalContext from "../../context/global/globalContext";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { isEmpty } from "../common/CoustomFunctions";

import useTipo_Documento from "../../hooks/useTipo_Documento";
import useCondicionIva from "../../hooks/useCondicionIva";
import useCodigoPostal from "../../hooks/useCodigoPostal";

const ClientesForm = ({ editar }) => {
  //context state
  const clientesCtx = useContext(clienteContext);
  const {
    cliente,
    showForm,
    mostrarFormulario,
    addCliente,
    updateCliente,
    setCliente
  } = clientesCtx;

  const {
    nombre,
    tipo_documento,
    nro_documento,
    iva,
    domicilio,
    telefono,
    email,
    representante
  } = cliente;

  //global state
  const GlobalCtx = useContext(globalContext);
  const { showMessage } = GlobalCtx;

  //usar custom hook
  const [
    stateTipo_Documento,
    SelectTipo_Documento,
    actualizarStateTipo_Documento
  ] = useTipo_Documento({});

  const [
    stateCondicionIva,
    SelectCondicionIva,
    actualizarStateCondicionIva
  ] = useCondicionIva({});

  const [
    stateCodigoPostal,
    SelectCodigoPostal,
    actualizarStateCodigoPostal
  ] = useCodigoPostal({});

  const onChange = e => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value.toUpperCase()
    });
  };

  const handleSubmit = () => {
    //valido formulario
    if (isEmpty(nombre) | (stateTipo_Documento == undefined)) {
      showMessage({
        msg: "Hay campos vacíos",
        title: "Error",
        type: "error"
      });
    } else {
      //Agrego
      const miCliente = {
        nombre,
        tipo_documento: stateTipo_Documento
      };
      if (!editar) {
        addCliente(miCliente);
        //Reseteo el form
        setCliente({
          nombre: "",
          provincia: {}
        });
      } else {
        updateCliente(miCliente);
      }
    }
  };

  // useEffect(() => {
  //   actualizarStateTipo_Documento(tipo_documento);
  // }, [cp]);

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
                <label style={{ marginTop: "1em" }}>Nombre/Razón Social</label>
                <InputText
                  id="nombre"
                  name="nombre"
                  value={nombre}
                  onChange={onChange}
                  autoFocus
                />
              </div>

              <div className="p-col-6"></div>

              <div className="p-col-12 p-md-4">
                <label style={{ marginTop: "1em" }}>Tipo Documento</label>
                <SelectTipo_Documento />
              </div>

              <div className="p-col-12 p-md-2">
                <label style={{ marginTop: "1em" }}>Nro. Documento</label>

                <InputText
                  id="nro_documento"
                  name="nro_documento"
                  onChange={onChange}
                  value={nro_documento}
                />
              </div>

              <div className="p-col-6"></div>

              <div className="p-col-12 p-md-6">
                <label style={{ marginTop: "1em" }}>Cond. I.V.A.</label>
                <SelectCondicionIva />
              </div>

              <div className="p-col-6"></div>

              <div className="p-col-12 p-md-6">
                <label style={{ marginTop: "1em" }}>Domicilio</label>

                <InputText
                  id="domicilio"
                  name="domicilio"
                  onChange={onChange}
                  value={domicilio}
                />
              </div>
              <div className="p-col-6"></div>
              <div className="p-col-12 p-md-6">
                <label style={{ marginTop: "1em" }}>Localidad</label>
                <SelectCodigoPostal />
              </div>

              <div className="p-col-6"></div>

              <div className="p-col-12 p-md-6">
                <label style={{ marginTop: "1em" }}>Teléfono</label>

                <InputText
                  id="telefono"
                  name="telefono"
                  onChange={onChange}
                  value={telefono}
                />
              </div>
              <div className="p-col-6"></div>
              <div className="p-col-12 p-md-6">
                <label style={{ marginTop: "1em" }}>Email</label>

                <InputText
                  id="email"
                  name="email"
                  onChange={onChange}
                  value={email}
                />
              </div>

              <div className="p-col-6"></div>

              <div className="p-col-12 p-md-6">
                <label style={{ marginTop: "1em" }}>Representante</label>

                <InputText
                  id="representante"
                  name="representante"
                  onChange={onChange}
                  value={representante}
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

export default ClientesForm;
