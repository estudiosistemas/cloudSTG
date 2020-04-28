import React, { Fragment } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";

const SidebarConfirmar = ({ texto, visible, funcConfimar, toggleSidebar }) => {
  return (
    <Sidebar
      visible={visible}
      position="top"
      className="ui-sidebar-sm"
      onHide={(e) => toggleSidebar()}
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
              label="Confirmar"
              icon="pi pi-thumbs-up"
              className="p-button-success"
              onClick={() => {
                funcConfimar();
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

export default SidebarConfirmar;
