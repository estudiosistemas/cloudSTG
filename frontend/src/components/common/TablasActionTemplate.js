import React from "react";
import { Button } from "primereact/button";

const TablasActionTemplate = ({
  handleEditar,
  handleBorrar,
  handleInhabilitar,
  handleSetup,
  rowData
}) => {
  let miBotonInactivar = {
    label: "Inactivar",
    className: "p-button-warning",
    icon: "pi pi-thumbs-down"
  };
  if (!rowData.estado) {
    miBotonInactivar = {
      label: "Activar",
      className: "p-button-success",
      icon: "pi pi-thumbs-up"
    };
  }

  return (
    <div>
      {handleBorrar ? (
        <Button
          type="button"
          icon="pi pi-trash"
          className="p-button-danger"
          tooltip="Borrar"
          tooltipOptions={{ position: "bottom" }}
          style={{ marginRight: ".5em" }}
          onClick={() => handleBorrar(rowData)}
        ></Button>
      ) : null}
      {handleInhabilitar ? (
        <Button
          type="button"
          icon={miBotonInactivar.icon}
          className={miBotonInactivar.className}
          tooltip={miBotonInactivar.label}
          tooltipOptions={{ position: "bottom" }}
          style={{ marginRight: ".5em" }}
          onClick={() => handleInhabilitar(rowData)}
        ></Button>
      ) : null}

      {handleEditar ? (
        <Button
          type="button"
          icon="pi pi-pencil"
          className="p-button-info"
          tooltip="Editar"
          tooltipOptions={{ position: "bottom" }}
          style={{ marginRight: ".5em" }}
          onClick={() => handleEditar(rowData)}
        ></Button>
      ) : null}
      {handleSetup ? (
        <Button
          type="button"
          icon="pi pi-cog"
          className="p-button-secondary"
          tooltip="Configurar"
          tooltipOptions={{ position: "bottom" }}
          style={{ marginRight: ".5em" }}
          onClick={() => handleSetup(rowData)}
        ></Button>
      ) : null}
    </div>
  );
};

export default TablasActionTemplate;
