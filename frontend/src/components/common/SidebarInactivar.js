import React, { Fragment } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";

const SidebarInactivar = ({
  texto,
  visible,
  setEstado,
  toggleSidebar,
  selectedItem
}) => {
  //Cambio la etiquieta y color del boton de acuerdo al estado
  let miBotonOk = {
    label: "Inactivar",
    className: "p-button-warning",
    icon: "pi pi-thumbs-down"
  };
  if (!selectedItem.estado) {
    miBotonOk = {
      label: "Activar",
      className: "p-button-success",
      icon: "pi pi-thumbs-up"
    };
  }

  return (
    <Sidebar
      visible={visible}
      position="top"
      className="ui-sidebar-sm"
      onHide={e => toggleSidebar()}
    >
      <Fragment>
        <div className="p-grid">
          <div className="p-col-12" style={{ textAlign: "center" }}>
            <h2>{texto}</h2>
          </div>
          <div
            className="p-col"
            style={{ marginTop: "1em", textAlign: "center" }}
          >
            <Button
              label={miBotonOk.label}
              icon={miBotonOk.icon}
              className={miBotonOk.className}
              onClick={() => {
                setEstado(selectedItem);
                toggleSidebar();
              }}
            />
            <Button
              style={{ margin: "0px 4px 4px 8px" }}
              label="Cancelar"
              icon="pi pi-undo"
              className="p-button-primary"
              onClick={() => toggleSidebar()}
            />
          </div>
        </div>
      </Fragment>
    </Sidebar>
  );
};

export default SidebarInactivar;
