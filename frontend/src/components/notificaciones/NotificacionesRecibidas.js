import React, { useEffect, Fragment, useState, useContext } from "react";
import Moment from "react-moment";
import "moment/locale/es";

import notificacionContext from "../../context/notificaciones/notificacionContext";

//Prime-React
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
//import NotificacionForm from "./NotificacionForm";
import { Sidebar } from "primereact/sidebar";

function NotificacionesEnviadas(props) {
  const [sidebarState, setSideBarState] = useState({ visible: false });

  //Datatable State
  const [globalFilter, setglobalFilter] = useState("");
  const [selectedItem, setSelectedItem] = useState({});
  const [expandedRows, setExpandedRows] = useState({});
  const [loadingData, setLoadingData] = useState(true);

  //notificacion state
  const notificacionCtx = useContext(notificacionContext);
  const {
    notificaciones_recibidas,
    getNotificaciones_Recibidas,
    setNotificacion,
    toggleNotificacionLeida
  } = notificacionCtx;

  const setLeida = data => {
    setNotificacion(data);
    data.leida = !data.leida;
    toggleNotificacionLeida(data);
  };

  const actionTemplate = (rowData, column) => {
    let estilo = "p-button-success";
    let tip = "Marcar como no leída";
    if (!rowData.leida) {
      estilo = "p-button-danger";
      tip = "Click para leer";
    }
    return (
      <Button
        type="button"
        icon="pi pi-file-o"
        className={estilo}
        tooltip={tip}
        tooltipOptions={{ position: "bottom" }}
        onClick={() => setLeida(rowData)}
      ></Button>
    );
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
        <span style={{ fontWeight: estilo }}>{rowData.userfrom}</span>
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
            <div className="p-md-2">De: </div>
            <div className="p-md-10" style={{ fontWeight: "bold" }}>
              {`${data.userfrom} (${data.uc.username})`}
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

  useEffect(() => {
    getNotificaciones_Recibidas();
    setLoadingData(false);
  }, []);

  return (
    <Fragment>
      {/* <NotificacionForm editar={editar} /> */}
      <div className="p-grid">
        <div className="p-col-12">
          <div className="card">
            <h1>Notificaciones Recibidas</h1>

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
            </div>
            <div className="datatable-doc-demo">
              <DataTable
                style={{ margin: "20px 0px 0px 0px" }}
                loading={loadingData}
                value={notificaciones_recibidas}
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
                onRowExpand={e => {
                  if (!e.data.leida) setLeida(e.data);
                }}
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
                  body={actionTemplate}
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
                  field="userfrom"
                  header="De"
                  sortable={true}
                  body={ucTemplate}
                />
                <Column field="asunto" header="Asunto" body={asuntoTemplate} />
              </DataTable>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default NotificacionesEnviadas;
