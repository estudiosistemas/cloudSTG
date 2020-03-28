import React, { useEffect, Fragment, useState, useContext } from "react";

import codigopostalContext from "../../../context/tablas/codigos_postales/codigopostalContext";

//Prime-React
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import CodigoPostalForm from "./CodigoPostalForm";
import SidebarBorrar from "../../common/SidebarBorrar";
import TablasActionTemplate from "../../common/TablasActionTemplate";

function CodigosPostales(props) {
  const [sidebarState, setSideBarState] = useState({ visible: false });
  const [editar, setEditar] = useState(false);

  //Datatable State
  const [globalFilter, setglobalFilter] = useState("");
  const [selectedItem, setSelectedItem] = useState({});

  //local state
  const codigopostalCtx = useContext(codigopostalContext);
  const {
    codigospostales,
    mostrarFormularioCP,
    getCP,
    deleteCP,
    setCP
  } = codigopostalCtx;

  const handleAgregar = () => {
    setEditar(false);
    setCP({});
    mostrarFormularioCP();
  };

  const handleEditar = dato => {
    setCP(dato);
    setEditar(true);
    mostrarFormularioCP();
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
    getCP();
  }, []);

  return (
    <Fragment>
      <CodigoPostalForm editar={editar} />
      <div className="p-grid">
        <div className="p-col-12">
          <div className="card">
            <h1>Códigos Postales</h1>

            <SidebarBorrar
              texto={"¿Está seguro de borrar este Código Postal?"}
              visible={sidebarState.visible}
              handleBorrar={deleteCP}
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
              value={codigospostales}
              globalFilter={globalFilter}
              emptyMessage="No se encontraron registros"
              paginator={true}
              rows={10}
              rowsPerPageOptions={[5, 10, 20, 50]}
              sortField="localidad"
              sortOrder={1}
            >
              <Column
                field="codigo"
                header="C.P."
                sortable={true}
                style={{ width: "150px", textAlign: "center" }}
              />
              <Column field="localidad" header="Localidad" sortable={true} />
              <Column
                field="provincia.nombre"
                header="Provincia"
                sortable={true}
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

export default CodigosPostales;
