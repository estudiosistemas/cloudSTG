import React, { useEffect, Fragment, useState, useContext } from "react";

import provinciaContext from "../../../context/tablas/provincias/provinciaContext";

//Prime-React
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import ProvinciaForm from "./ProvinciaForm";
import SidebarBorrar from "../../common/SidebarBorrar";
import TablasActionTemplate from "../../common/TablasActionTemplate";

function Provincias(props) {
  const [sidebarState, setSideBarState] = useState({ visible: false });
  const [editar, setEditar] = useState(false);

  //Datatable State
  const [globalFilter, setglobalFilter] = useState("");
  const [selectedItem, setSelectedItem] = useState({});

  //provincia state
  const provinciasContext = useContext(provinciaContext);
  const {
    provincias,
    mostrarFormularioProvincias,
    getProvincias,
    deleteProvincia,
    setProvincia
  } = provinciasContext;

  const handleAgregar = () => {
    setEditar(false);
    setProvincia({});
    mostrarFormularioProvincias();
  };

  const handleEditar = dato => {
    setProvincia(dato);
    setEditar(true);
    mostrarFormularioProvincias();
  };

  const handleBorrar = item => {
    setSelectedItem(item);
    toggleSidebar();
  };

  const handleButtonClick = () => {
    console.log("clicked");
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
    getProvincias();
  }, []);

  return (
    <Fragment>
      <ProvinciaForm editar={editar} />
      <div className="p-grid">
        <div className="p-col-12">
          <div className="card">
            <h1>Provincias</h1>

            <SidebarBorrar
              texto={"¿Está seguro de borrar esta Provincia?"}
              visible={sidebarState.visible}
              handleBorrar={deleteProvincia}
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
              value={provincias}
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
                field="codigo"
                header="Codigo"
                sortable={true}
                style={{ width: "150px", textAlign: "center" }}
              />
              <Column field="nombre" header="Provicia" sortable={true} />
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

export default Provincias;
