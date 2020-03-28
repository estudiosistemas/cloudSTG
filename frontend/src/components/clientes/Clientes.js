import React, { useEffect, Fragment, useState, useContext } from "react";

import clienteContext from "../../context/clientes/clienteContext";

//Prime-React
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import classNames from "classnames";
import ClientesForm from "./ClientesForm";
import Moment from "react-moment";
import "moment/locale/es";

import SidebarInactivar from "../common/SidebarInactivar";
import TablasActionTemplate from "../common/TablasActionTemplate";

function Clientes(props) {
  const [sidebarState, setSideBarState] = useState({ visible: false });
  const [editar, setEditar] = useState(false);

  //Datatable State
  const [globalFilter, setglobalFilter] = useState("");
  const [selectedItem, setSelectedItem] = useState({});
  const [filtroEstado, setFiltroEstado] = useState("true");
  const [expandedRows, setExpandedRows] = useState({});
  const [loadingData, setLoadingData] = useState(true);

  //local state
  const clienteCtx = useContext(clienteContext);
  const {
    clientes,
    mostrarFormulario,
    getClientes,
    setCliente,
    toggleEstadoCliente
  } = clienteCtx;

  const setEstado = data => {
    setCliente(data);
    data.estado = !data.estado;
    toggleEstadoCliente(data);
  };

  const handleAgregar = () => {
    setEditar(false);
    setCliente({});
    mostrarFormulario();
  };

  const handleEditar = dato => {
    setCliente(dato);
    setEditar(true);
    mostrarFormulario();
  };

  const handleInhabilitar = item => {
    setSelectedItem(item);
    toggleSidebar();
  };

  const handleSetup = item => {
    setSelectedItem(item);
    toggleSidebar();
  };

  const estadoTemplate = rowData => {
    return (
      <span
        className={classNames("customer-badge", "status-" + rowData.estado)}
      >
        {rowData.estado ? "ACTIVO" : "INACTIVO"}
      </span>
    );
  };

  const actionTemplate = (rowData, column) => {
    return (
      <TablasActionTemplate
        //handleBorrar={handleBorrar}
        handleEditar={handleEditar}
        handleInhabilitar={handleInhabilitar}
        handleSetup={handleSetup}
        rowData={rowData}
      />
    );
  };

  const toggleSidebar = () => {
    setSideBarState({ visible: !sidebarState.visible });
  };

  let dt = React.createRef();

  const onEstadoChange = event => {
    dt.filter(event.value, "estado", "equals");
    setFiltroEstado(event.value);
  };

  const estados = [
    { label: "ACTIVOS", value: "true" },
    { label: "INACTIVOS", value: "false" },
    { label: "TODOS", value: null }
  ];

  const estadoFilter = (
    <Dropdown
      style={{ width: "100%" }}
      placeholder="ACTIVOS"
      value={filtroEstado}
      options={estados}
      onChange={onEstadoChange}
    />
  );

  const rowExpansionTemplate = data => {
    return (
      <div className="p-grid p-fluid" style={{ padding: "2em 1em 1em 1em" }}>
        <div className="p-col-12 p-md-6">
          <div className="p-grid">
            <div className="p-md-2">Id: </div>
            <div className="p-md-10" style={{ fontWeight: "bold" }}>
              {data.id}
            </div>
            <div className="p-md-2">Nombre: </div>
            <div className="p-md-10" style={{ fontWeight: "bold" }}>
              {data.nombre}
            </div>
            <div className="p-md-2">Documento: </div>
            <div className="p-md-10" style={{ fontWeight: "bold" }}>
              {data.tipo_documento.nombre} {data.nro_documento}
            </div>
            <div className="p-md-2">I.V.A: </div>
            <div className="p-md-10" style={{ fontWeight: "bold" }}>
              {data.iva.nombre}
            </div>
          </div>
        </div>
        <div className="p-col-12 p-md-6">
          <div className="p-grid">
            <div className="p-md-2">Domicilio: </div>
            <div className="p-md-10" style={{ fontWeight: "bold" }}>
              {data.domicilio}
            </div>

            <div className="p-md-2">Localidad: </div>
            <div className="p-md-10" style={{ fontWeight: "bold" }}>
              {`(${data.codigo_postal.codigo}) ${data.codigo_postal.localidad}`}
            </div>

            <div className="p-md-2">Teléfono: </div>
            <div className="p-md-10" style={{ fontWeight: "bold" }}>
              {data.telefono}
            </div>

            <div className="p-md-2">Representante: </div>
            <div className="p-md-10" style={{ fontWeight: "bold" }}>
              {data.representante}
            </div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    getClientes();
    setLoadingData(false);
  }, []);

  //Ejecuto el fitro estado para seleccionar los activos por defecto
  useEffect(() => {
    dt.filter(filtroEstado, "estado", "equals");
  }, []);

  return (
    <Fragment>
      <ClientesForm editar={editar} />
      <div className="p-grid">
        <div className="p-col-12">
          <div className="card">
            <h1>Clientes</h1>

            <SidebarInactivar
              texto={`¿Está seguro de ${
                selectedItem.estado ? "Inactivar" : "Activar"
              } este Cliente?`}
              visible={sidebarState.visible}
              setEstado={setEstado}
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
                label="Agregar"
                icon="pi pi-plus"
                className="p-button-success"
                onClick={() => handleAgregar()}
              />
            </div>
            <div className="datatable-doc-demo">
              <DataTable
                ref={el => (dt = el)}
                style={{ margin: "20px 0px 0px 0px" }}
                value={clientes}
                globalFilter={globalFilter}
                emptyMessage="No se encontraron registros"
                paginator={true}
                rows={25}
                rowsPerPageOptions={[5, 10, 25, 50]}
                className="p-datatable-customers"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                expandedRows={expandedRows}
                onRowToggle={e => setExpandedRows(e.data)}
                // onRowExpand={e => {
                //   if (!e.data.leida) setLeida(e.data);
                // }}
                rowExpansionTemplate={rowExpansionTemplate}
                dataKey="id"
                responsive
              >
                <Column expander={true} style={{ width: "3em" }} />
                <Column
                  field="nro_documento"
                  header="Documento"
                  sortable={true}
                  style={{ width: "150px", textAlign: "center" }}
                  filter={true}
                  filterPlaceholder="Filtrar"
                  filterMatchMode="contains"
                />
                <Column
                  field="nombre"
                  header="Nombre/Razón Social"
                  sortable={true}
                  filter={true}
                  filterPlaceholder="Filtrar"
                  filterMatchMode="contains"
                />
                <Column field="telefono" header="Teléfono" />
                <Column
                  field="estado"
                  header="Estado"
                  body={estadoTemplate}
                  style={{ textAlign: "center", width: "14em" }}
                  filter={true}
                  filterElement={estadoFilter}
                />

                <Column
                  header="Acciones"
                  body={actionTemplate}
                  style={{ textAlign: "center", width: "12em" }}
                />
              </DataTable>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Clientes;
