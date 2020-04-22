import React, { lazy, Fragment } from "react";
import { Route } from "react-router-dom";
import { retry } from "../common/CoustomFunctions";

//importar states
import CobradorState from "../../context/agencias/cobradores/cobradorState";
import ZonaState from "../../context/agencias/zonas/zonaState";
import TarifaState from "../../context/agencias/tarifas/tarifaState";

const Agencias = lazy(() => retry(() => import("./Agencias")));
const Cobradores = lazy(() => retry(() => import("./cobradores/Cobradores")));
const Zonas = lazy(() => retry(() => import("./zonas/Zonas")));
const Tarifas = lazy(() => retry(() => import("./tarifas/Tarifas")));

const Agencias_Loader = () => {
  return (
    <Fragment>
      <Route
        path="/stg/agencia"
        render={(props) => {
          return <Agencias {...props} />;
        }}
      />
      <CobradorState>
        <Route
          path="/stg/cobradores"
          render={(props) => {
            return <Cobradores {...props} />;
          }}
        />
      </CobradorState>

      <ZonaState>
        <Route
          path="/stg/zonas"
          render={(props) => {
            return <Zonas {...props} />;
          }}
        />
      </ZonaState>

      <TarifaState>
        <Route
          path="/stg/tarifas"
          render={(props) => {
            return <Tarifas {...props} />;
          }}
        />
      </TarifaState>
    </Fragment>
  );
};

export default Agencias_Loader;
