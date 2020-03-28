import React, { useEffect, Fragment, useState, useContext } from "react";

import condicionIVAContext from "../../../context/tablas/condicionIVA/condicionIVAContext";

//Prime-React
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import CondicionIVAForm from "./CondicionIVAForm";
import SidebarBorrar from "../../common/SidebarBorrar";
import TablasActionTemplate from "../../common/TablasActionTemplate";

function CondicionIVA(props) {
  const [sidebarState, setSideBarState] = useState({ visible: false });
  const [editar, setEditar] = useState(false);

  //Datatable State
  const [globalFilter, setglobalFilter] = useState("");
  const [selectedItem, setSelectedItem] = useState({});

  //local state
  const condIVACtx = useContext(condicionIVAContext);
  const {
    condiciones,
    mostrarFormularioCondiciones,
    getCondiciones,
    deleteCondicion,
    setCondicion
  } = condIVACtx;

  const handleAgregar = () => {
    setEditar(false);
    setCondicion({});
    mostrarFormularioCondiciones();
  };

  const handleEditar = dato => {
    setCondicion(dato);
    setEditar(true);
    mostrarFormularioCondiciones();
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
    getCondiciones();
  }, []);

  return (
    <Fragment>
      <CondicionIVAForm editar={editar} />
      <div className="p-grid">
        <div className="p-col-12">
          <div className="card">
            <h1>Condiciones de IVA</h1>

            <SidebarBorrar
              texto={"¿Está seguro de borrar esta Condición?"}
              visible={sidebarState.visible}
              handleBorrar={deleteCondicion}
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
              value={condiciones}
              globalFilter={globalFilter}
              emptyMessage="No se encontraron registros"
              paginator={true}
              rows={10}
              rowsPerPageOptions={[5, 10, 20, 50]}
              sortField="nombre"
              sortOrder={1}
            >
              <Column
                field="id"
                header="Id"
                sortable={true}
                style={{ width: "150px", textAlign: "center" }}
              />
              <Column field="nombre" header="Condicion IVA" sortable={true} />

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

export default CondicionIVA;
