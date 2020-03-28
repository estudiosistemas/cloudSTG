import React, { useEffect, Fragment, useState, useContext } from "react";

import alicuotaContext from "../../../context/tablas/alicuotas/alicuotaContext";

//Prime-React
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import AlicuotasForm from "./AlicuotasForm";
import { Sidebar } from "primereact/sidebar";
import TablasActionTemplate from "../../common/TablasActionTemplate";
import SidebarBorrar from "../../common/SidebarBorrar";

function Alicuotas(props) {
  const [sidebarState, setSideBarState] = useState({ visible: false });
  const [editar, setEditar] = useState(false);

  //Datatable State
  const [globalFilter, setglobalFilter] = useState("");
  const [selectedItem, setSelectedItem] = useState({});

  //local state
  const alicuotaCtx = useContext(alicuotaContext);
  const {
    alicuotas,
    mostrarFormularioAlicuotas,
    getAlicuotas,
    deleteAlicuota,
    setAlicuota
  } = alicuotaCtx;

  const handleAgregar = () => {
    setEditar(false);
    setAlicuota({});
    mostrarFormularioAlicuotas();
  };

  const handleEditar = dato => {
    setAlicuota(dato);
    setEditar(true);
    mostrarFormularioAlicuotas();
  };

  const handleBorrar = item => {
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
    getAlicuotas();
  }, []);

  return (
    <Fragment>
      <AlicuotasForm editar={editar} />
      <div className="p-grid">
        <div className="p-col-12">
          <div className="card">
            <h1>Alicuotas</h1>

            <SidebarBorrar
              texto={"¿Está seguro de borrar esta alicuota?"}
              visible={sidebarState.visible}
              handleBorrar={deleteAlicuota}
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
            <DataTable
              style={{ margin: "20px 0px 0px 0px" }}
              value={alicuotas}
              //header={header}
              globalFilter={globalFilter}
              emptyMessage="No se encontraron registros"
              paginator={true}
              rows={10}
              rowsPerPageOptions={[5, 10, 20, 50]}
              sortField="codigo"
              sortOrder={1}
            >
              <Column
                field="id"
                header="Id"
                sortable={true}
                style={{ width: "150px", textAlign: "center" }}
              />
              <Column field="nombre" header="Alícuota" sortable={true} />
              <Column
                field="tasa"
                header="Tasa"
                sortable={false}
                style={{ textAlign: "center" }}
              />
              <Column
                field="codigo_Afip"
                header="Cód. AFIP"
                sortable={false}
                style={{ textAlign: "center" }}
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

export default Alicuotas;
