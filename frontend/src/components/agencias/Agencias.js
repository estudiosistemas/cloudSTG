import React, { useState, useContext, Fragment, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

import authContext from "../../context/auth/authContext";
import globalContext from "../../context/global/globalContext";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { PickList } from "primereact/picklist";

import { isEmpty } from "../common/CoustomFunctions";
import useCodigoPostal from "../../hooks/useCodigoPostal";

function Agencias() {
  //auth state
  const authCtx = useContext(authContext);
  const { agencia, updateAgencia, tokenConfig } = authCtx;

  //global state
  const GlobalCtx = useContext(globalContext);
  const { showMessage } = GlobalCtx;

  //local state para imagen
  const [selectedFile, setSelectedFile] = useState(null);

  // local state para picklist
  const [picklistSource, setPicklistSource] = useState([]);
  const [picklistTarget, setPicklistTarget] = useState([]);
  const [codigospostales, setCodigospostales] = useState([]);

  //local state para agencia
  const [miAgencia, setmiAgencia] = useState({});

  const {
    nombre,
    domicilio,
    codigo_postal,
    telefono,
    porcentaje,
    porcentaje_Bs_As,
    logo,
    localidades,
  } = miAgencia;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmpty(nombre) || isEmpty(domicilio) || picklistTarget.length == 0) {
      showMessage({
        msg: "Los campos con * son obligatorios",
        title: "Error",
        type: "error",
      });
      return;
    }
    updateAgencia(miAgencia, selectedFile);
  };

  const onChangeValue = (e) => {
    setmiAgencia({
      ...miAgencia,
      [e.target.name]: e.target.value.toUpperCase(),
    });
  };

  const onChangePicklist = (e) => {
    setPicklistSource(e.source);
    setPicklistTarget(e.target);
    setmiAgencia({
      ...miAgencia,
      localidades: e.target,
    });
  };

  const handleImageChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    axios
      .get("/api/codigospostales/", tokenConfig())
      .then((res) => {
        setCodigospostales(res.data);
      })
      .catch((err) => console.log(err.response.statusText));
  }, []);

  useEffect(() => {
    setmiAgencia({
      id: agencia.id,
      nombre: agencia.nombre,
      domicilio: agencia.domicilio,
      codigo_postal: agencia.codigo_postal.codigo,
      telefono: agencia.telefono,
      porcentaje: agencia.porcentaje,
      porcentaje_Bs_As: agencia.porcentaje_Bs_As,
      logo: agencia.logo,
      empresa: agencia.empresa.id,
      localidades: agencia.localidades,
    });
  }, [agencia]);

  useEffect(() => {
    if (codigospostales.length > 0) {
      const disponibles = codigospostales.filter((cp) => {
        let ok = true;
        for (let i = 0; i < localidades.length && ok; i++) {
          let loc = localidades[i];
          if (loc["codigo"] == cp["codigo"]) ok = false;
        }
        return ok;
      });
      setPicklistSource(disponibles);
      setPicklistTarget(localidades);
    }
  }, [localidades, codigospostales]);

  return (
    <Fragment>
      <div
        className="p-grid p-fluid p-justify-center"
        style={{ margin: "30px 30px 30px 30px" }}
      >
        <div className="p-col-10">
          <div
            className="card card-w-title"
            style={{ marginLeft: "20px", padding: "20px 40px 20px 40px" }}
          >
            <h1>Agencia: {agencia.nombre}</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="nombre">Nombre Agencia*</label>
              <InputText
                style={{ marginBottom: "20px" }}
                placeholder="Nombre Agencia"
                id="nombre"
                type="text"
                name="nombre"
                onChange={onChangeValue}
                value={nombre || ""}
              />

              <label htmlFor="domicilio">Domicilio</label>
              <InputText
                style={{ marginBottom: "20px" }}
                placeholder="Domicilio"
                id="domicilio"
                type="text"
                name="domicilio"
                onChange={onChangeValue}
                value={domicilio || ""}
              />

              <div className="p-grid">
                <div className="p-col-6">
                  <label htmlFor="codigo_postal">Código Postal</label>
                  <InputText
                    style={{ marginBottom: "20px" }}
                    placeholder="Código Postal"
                    id="codigo_postal"
                    type="text"
                    name="codigo_postal"
                    onChange={onChangeValue}
                    value={codigo_postal || ""}
                    disabled
                  />
                </div>
                <div className="p-col-6">
                  <label htmlFor="telefono">Teléfono</label>
                  <InputText
                    style={{ marginBottom: "20px" }}
                    placeholder="Teléfono"
                    id="telefono"
                    type="text"
                    name="telefono"
                    onChange={onChangeValue}
                    value={telefono || ""}
                  />
                </div>
              </div>
              <div className="p-grid">
                <div className="p-col-6">
                  <label htmlFor="telefono">Porcentaje</label>
                  <InputText
                    style={{ marginBottom: "20px" }}
                    placeholder="Porcentaje"
                    id="porcentaje"
                    type="text"
                    name="porcentaje"
                    onChange={onChangeValue}
                    value={porcentaje || "0.00"}
                    keyfilter="pnum"
                  />
                </div>
                <div className="p-col-6">
                  <label htmlFor="telefono">Porcentaje Bs. As.</label>
                  <InputText
                    style={{ marginBottom: "20px" }}
                    placeholder="Porcentaje Bs. As."
                    id="porcentaje_Bs_As"
                    type="text"
                    name="porcentaje_Bs_As"
                    onChange={onChangeValue}
                    value={porcentaje_Bs_As || "0.00"}
                    keyfilter="pnum"
                  />
                </div>
              </div>
              <label htmlFor="asignadas">
                Localidades asignadas a agencia*
              </label>
              <PickList
                id="asignadas"
                source={picklistSource}
                target={picklistTarget}
                sourceHeader="Localidades"
                targetHeader="Asignadas"
                responsive={true}
                showSourceControls={false}
                showTargetControls={false}
                itemTemplate={(picklistSource) => (
                  <span>
                    ({picklistSource.codigo}) {picklistSource.localidad}
                  </span>
                )}
                onChange={(event) => {
                  onChangePicklist(event);
                }}
                style={{ marginBottom: "20px" }}
              />
              <div className="p-col-12">
                <label htmlFor="logo" style={{ marginTop: "1em" }}>
                  Logo
                </label>
              </div>
              <div className="p-col-12">
                <img
                  src={agencia ? agencia.logo : null}
                  alt="logo"
                  width="425px"
                  height="160px"
                />
              </div>
              <input
                type="file"
                id="logo"
                accept="image/png, image/jpeg"
                onChange={handleImageChange}
              />
              <Button
                style={{
                  width: "150px",
                  float: "right",
                }}
                label="Actualizar"
                icon="pi pi-check"
                className="p-button-success"
                type="submit"
              />
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Agencias;
