import React, { useEffect, Fragment, useState, useContext } from "react";

import Moment from "react-moment";
import "moment/locale/es";

import notificacionContext from "../../context/notificaciones/notificacionContext";

//Prime-React
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import NotificacionForm from "./NotificacionForm";
import TablasActionTemplate from "../common/TablasActionTemplate";
import SidebarBorrar from "../common/SidebarBorrar";

function NotificacionesEnviadas(props) {
  const [sidebarState, setSideBarState] = useState({ visible: false });
  const [editar, setEditar] = useState(false);

  //Datatable State
  const [globalFilter, setglobalFilter] = useState("");
  const [selectedItem, setSelectedItem] = useState({});
  const [expandedRows, setExpandedRows] = useState({});
  const [loadingData, setLoadingData] = useState(true);

  //local state
  const notificacionCtx = useContext(notificacionContext);
  const {
    notificaciones_enviadas,
    mostrarFormularioNotificacion,
    getNotificaciones_Enviadas,
    deleteNotificacion,
    setNotificacion
  } = notificacionCtx;

  const handleAgregar = () => {
    setEditar(false);
    setNotificacion({});
    mostrarFormularioNotificacion();
  };

  // const handleEditar = dato => {
  //   setNotificacion(dato);
  //   setEditar(true);
  //   mostrarFormularioNotificacion();
  // };

  const handleBorrar = item => {
    setSelectedItem(item);
    toggleSidebar();
  };

  const actionTemplate = (rowData, column) => {
    return (
      <TablasActionTemplate
        handleBorrar={handleBorrar}
        //handleEditar={handleEditar}
        rowData={rowData}
      />
    );
  };

  const actionLeidaTemplate = (rowData, column) => {
    if (!rowData.leida) {
      return <i className="fas fa-check-double" style={{ color: "red" }}></i>;
    } else {
      return <i className="fas fa-check-double" style={{ color: "green" }}></i>;
    }
  };

  const fcTemplate = (rowData, column) => {
    let estilo = "normal";
    if (!rowData.leida) estilo = "bold";
    return (
      <span style={{ fontWeight: estilo }}>
        <Moment locale="es" format="DD-MM-YYYY HH:mm" fromNowDuring={21600000}>
          {rowData.fc}
        </Moment>
      </span>
    );
  };

  const ucTemplate = (rowData, column) => {
    let estilo = "normal";
    if (!rowData.leida) estilo = "bold";
    return (
      <div className="p-grid p-align-center">
        <img
          src={rowData.avatar}
          alt=""
          width="30px"
          height="30px"
          style={{ borderRadius: "50%", margin: "0 1em 0 1em" }}
        />
        <span style={{ fontWeight: estilo }}>{rowData.userTo}</span>
      </div>
    );
  };

  const asuntoTemplate = (rowData, column) => {
    let estilo = "normal";
    if (!rowData.leida) estilo = "bold";
    return <span style={{ fontWeight: estilo }}>{rowData.asunto}</span>;
  };

  const rowExpansionTemplate = data => {
    const src = data.avatar;

    return (
      <div className="p-grid p-fluid" style={{ padding: "2em 1em 1em 1em" }}>
        <div className="p-col-12 p-md-3" style={{ textAlign: "center" }}>
          <img
            src={src}
            alt={data.username}
            width="100px"
            height="100px"
            style={{ borderRadius: "50%" }}
          />
        </div>
        <div className="p-col-12 p-md-9">
          <div className="p-grid">
            <div className="p-md-2">Para: </div>
            <div className="p-md-10" style={{ fontWeight: "bold" }}>
              {`${data.userTo} (${data.user_destino.username})`}
            </div>

            <div className="p-md-2">Fecha: </div>
            <div className="p-md-10" style={{ fontWeight: "bold" }}>
              <Moment locale="es" format="DD-MM-YYYY HH:mm">
                {data.fc}
              </Moment>
            </div>

            <div className="p-md-2">Asunto: </div>
            <div className="p-md-10" style={{ fontWeight: "bold" }}>
              {data.asunto}
            </div>

            <div className="p-md-2">Mensaje: </div>
            <div className="p-md-10" style={{ fontWeight: "bold" }}>
              {data.mensaje}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const toggleSidebar = () => {
    setSideBarState({ visible: !sidebarState.visible });
  };

  useEffect(() => {
    getNotificaciones_Enviadas();
    setLoadingData(false);
  }, []);

  return (
    <Fragment>
      <NotificacionForm editar={editar} />
      <div className="p-grid">
        <div className="p-col-12">
          <div className="card">
            <h1>Notificaciones Enviadas</h1>

            <SidebarBorrar
              texto={"¿Está seguro de borrar esta notificación?"}
              visible={sidebarState.visible}
              handleBorrar={deleteNotificacion}
              toggleSidebar={toggleSidebar}
              selectedItem={selectedItem}
            />

            <div style={{ textAlign: "right" }} className="p-col-12">
              <i
                className="pi pi-search"
                style={{ margin: "4px 4px 4px 8px" }}
              ></i>
              <InputText
                type="search"
                onInput={e => setglobalFilter(e.target.value)}
                placeholder="Buscar"
                size="50"
              />

              <Button
                style={{ margin: "4px 4px 4px 8px" }}
                label="Nueva"
                icon="pi pi-plus"
                className="p-button-success"
                onClick={() => handleAgregar()}
              />
            </div>
            <div className="datatable-doc-demo">
              <DataTable
                style={{ margin: "20px 0px 0px 0px" }}
                loading={loadingData}
                value={notificaciones_enviadas}
                globalFilter={globalFilter}
                emptyMessage="No se encontraron notificaciones"
                paginator
                rows={20}
                rowsPerPageOptions={[10, 20, 50]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                sortField="fc"
                sortOrder={-1}
                expandedRows={expandedRows}
                onRowToggle={e => setExpandedRows(e.data)}
                rowExpansionTemplate={rowExpansionTemplate}
                dataKey="id"
                responsive
                className="p-datatable-customers"
              >
                <Column expander={true} style={{ width: "3em" }} />
                <Column
                  field="leida"
                  header="Leída"
                  sortable={true}
                  body={actionLeidaTemplate}
                  style={{ textAlign: "center", width: "8em" }}
                />
                <Column
                  field="fc"
                  header="Fecha"
                  body={fcTemplate}
                  sortable={true}
                  style={{ width: "250px" }}
                />
                <Column
                  field="userTo"
                  header="Para"
                  sortable={true}
                  body={ucTemplate}
                />
                <Column field="asunto" header="Asunto" body={asuntoTemplate} />
                <Column
                  body={actionTemplate}
                  style={{ textAlign: "center", width: "8em" }}
                />
              </DataTable>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default NotificacionesEnviadas;
