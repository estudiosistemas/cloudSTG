import React, { useEffect, Fragment, useState, useContext } from "react";

import comprobanteContext from "../../../context/tablas/comprobantes/comprobanteContext";

//Prime-React
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
//import AlicuotasForm from "./AlicuotasForm";
import TablasActionTemplate from "../../common/TablasActionTemplate";
import SidebarBorrar from "../../common/SidebarBorrar";
import ComprobantesForm from "./ComprobantesForm";

function Comprobantes(props) {
  const [sidebarState, setSideBarState] = useState({ visible: false });
  const [editar, setEditar] = useState(false);

  //Datatable State
  const [globalFilter, setglobalFilter] = useState("");
  const [selectedItem, setSelectedItem] = useState({});

  //local state
  const comprobanteCtx = useContext(comprobanteContext);
  const {
    comprobantes,
    mostrarFormulario,
    getComprobantes,
    deleteComprobante,
    setComprobante,
  } = comprobanteCtx;

  const handleAgregar = () => {
    setEditar(false);
    setComprobante({});
    mostrarFormulario();
  };

  const handleEditar = (dato) => {
    setComprobante(dato);
    setEditar(true);
    mostrarFormulario();
  };

  const handleBorrar = (item) => {
    setSelectedItem(item);
    toggleSidebar();
  };

  const actionTemplate = (rowData, column) => {
    return (
      <TablasActionTemplate
        handleBorrar={handleBorrar}
        handleEditar={handleEditar}
        rowData={rowData}
      />
    );
  };

  const toggleSidebar = () => {
    setSideBarState({ visible: !sidebarState.visible });
  };

  useEffect(() => {
    getComprobantes();
  }, []);

  return (
    <Fragment>
      <ComprobantesForm editar={editar} />
      <div className="p-grid">
        <div className="p-col-12">
          <div className="card">
            <h1>Comprobantes</h1>

            <SidebarBorrar
              texto={"¿Está seguro de borrar este comprobante?"}
              visible={sidebarState.visible}
              handleBorrar={deleteComprobante}
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
                onInput={(e) => setglobalFilter(e.target.value)}
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
            <DataTable
              style={{ margin: "20px 0px 0px 0px" }}
              value={comprobantes}
              //header={header}
              globalFilter={globalFilter}
              emptyMessage="No se encontraron registros"
              paginator={true}
              rows={10}
              rowsPerPageOptions={[5, 10, 20, 50]}
              sortField="id"
              sortOrder={1}
            >
              <Column
                field="id"
                header="Id"
                sortable={true}
                style={{ width: "150px", textAlign: "center" }}
              />
              <Column
                field="descripcion"
                header="Comprobante"
                sortable={true}
              />
              <Column
                field="codigo_AFIP"
                header="Cód. AFIP"
                sortable={false}
                style={{ textAlign: "center", width: "10em" }}
              />
              <Column
                field="tipo_comprobante.nombre"
                header="Tipo"
                sortable={false}
                style={{ textAlign: "center", width: "8em" }}
              />
              <Column
                body={actionTemplate}
                style={{ textAlign: "center", width: "8em" }}
              />
            </DataTable>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Comprobantes;
