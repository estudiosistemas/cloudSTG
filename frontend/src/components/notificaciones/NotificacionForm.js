import React, { useContext, Fragment, useEffect } from "react";
import notificacionContext from "../../context/notificaciones/notificacionContext";
import globalContext from "../../context/global/globalContext";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { SelectButton } from "primereact/selectbutton";
import { isEmpty } from "../common/CoustomFunctions";

import useUsuario from "../../hooks/useUsuario";

const NotificacionForm = ({ editar }) => {
  //context state
  const notifyCtx = useContext(notificacionContext);
  const {
    notificacion,
    showFormNotificacion,
    mostrarFormularioNotificacion,
    addNotificacion,
    updateNotificacion,
    setNotificacion
  } = notifyCtx;

  const {
    id,
    estado,
    asunto,
    mensaje,
    prioridad,
    leida,
    user_destino
  } = notificacion;

  //global state
  const GlobalCtx = useContext(globalContext);
  const { showMessage } = GlobalCtx;

  //usar custom hook
  const [stateUsuario, SelectUsuario, actualizarStateUsuario] = useUsuario({});

  const onChange = e => {
    setNotificacion({
      ...notificacion,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    //valido formulario

    if (
      isEmpty(asunto) ||
      isEmpty(mensaje) ||
      isEmpty(prioridad) ||
      stateUsuario == undefined
    ) {
      showMessage({
        msg: "Hay campos vacíos",
        title: "Error",
        type: "error"
      });
    } else {
      //Agrego
      const miNotificacion = {
        usuario: stateUsuario,
        asunto,
        mensaje,
        prioridad,
        estado: true,
        leida: false
      };
      console.log(miNotificacion);
      if (!editar) {
        addNotificacion(miNotificacion);
        //Reseteo el form
        setNotificacion({ asunto: "", mensaje: "", prioridad: null });
      } else {
        updateNotificacion(miCP);
      }
    }
  };

  const prioridadNotify = [
    { label: "Baja", value: "B" },
    { label: "Media", value: "M" },
    { label: "Alta", value: "A" }
  ];

  return (
    <Fragment>
      {showFormNotificacion ? (
        <div
          className="p-grid  p-justify-center"
          style={{ margin: "20px 0px 50px 0px" }}
        >
          <div className="p-col ">
            <div className="card">
              {editar ? (
                <h1>Editar Notificacion</h1>
              ) : (
                <h1>Agregar Notificacion</h1>
              )}

              <form onSubmit={handleSubmit}>
                <div className="p-col-4">
                  <span
                    className="p-float-label"
                    style={{ margin: "25px 0px 25px 0px" }}
                  >
                    <InputText id="id" name="id" size="50" hidden value={id} />
                  </span>
                  <SelectUsuario />
                  <span
                    className="p-float-label"
                    style={{ margin: "25px 0px 25px 0px" }}
                  >
                    <InputText
                      id="asunto"
                      name="asunto"
                      onChange={onChange}
                      value={asunto}
                      size="50"
                    />
                    <label htmlFor="asunto">Asunto</label>
                  </span>
                  <span
                    className="p-float-label"
                    style={{ margin: "25px 0px 25px 0px" }}
                  >
                    <InputTextarea
                      rows={5}
                      cols={50}
                      id="mensaje"
                      name="mensaje"
                      onChange={onChange}
                      value={mensaje}
                    />
                    <label htmlFor="mensaje">Mensaje</label>
                  </span>

                  <label htmlFor="prioridad">Prioridad</label>
                  <SelectButton
                    style={{ marginTop: "0.5em" }}
                    id="prioridad"
                    name="prioridad"
                    value={prioridad}
                    options={prioridadNotify}
                    onChange={onChange}
                  ></SelectButton>

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
                    onClick={() => mostrarFormularioNotificacion()}
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

export default NotificacionForm;
