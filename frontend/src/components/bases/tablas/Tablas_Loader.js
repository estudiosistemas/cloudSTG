import React, { lazy, Fragment } from "react";
import { Route } from "react-router-dom";
import { retry } from "../../common/CoustomFunctions";

//importar states
import ProvinciaState from "../../../context/tablas/provincias/provinciaState";
import AlicuotaState from "../../../context/tablas/alicuotas/alicuotaState";
import CodigoPostalState from "../../../context/tablas/codigos_postales/codigopostalState";
import CondicionIVAState from "../../../context/tablas/condicionIVA/condicionIVAState";
import ComprobanteState from "../../../context/tablas/comprobantes/comprobanteState";

const Provincias = lazy(() => retry(() => import("./Provincias")));
const Alicuotas = lazy(() => retry(() => import("./Alicuotas")));
const CodigosPostales = lazy(() => retry(() => import("./CodigosPostales")));
const CondicionIVA = lazy(() => retry(() => import("./CondicionIVA")));
const Comprobantes = lazy(() => retry(() => import("./Comprobantes")));

const Tablas = () => {
  return (
    <Fragment>
      <ProvinciaState>
        <Route
          path="/stg/provincias"
          render={(props) => {
            return <Provincias {...props} />;
          }}
        />
      </ProvinciaState>
      <CodigoPostalState>
        <Route
          path="/stg/codigospostales"
          render={(props) => {
            return <CodigosPostales {...props} />;
          }}
        />
      </CodigoPostalState>
      <AlicuotaState>
        <Route
          path="/stg/alicuotasiva"
          render={(props) => {
            return <Alicuotas {...props} />;
          }}
        />
      </AlicuotaState>
      <CondicionIVAState>
        <Route
          path="/stg/condicioniva"
          render={(props) => {
            return <CondicionIVA {...props} />;
          }}
        />
      </CondicionIVAState>
      <ComprobanteState>
        <Route
          path="/stg/comprobantes"
          render={(props) => {
            return <Comprobantes {...props} />;
          }}
        />
      </ComprobanteState>
    </Fragment>
  );
};

export default Tablas;
