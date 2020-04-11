import React, { lazy, Suspense } from "react";
import { render } from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "@babel/polyfill";

import Spinner from "./layout/Spinner";

const Landing = lazy(() => import("./landing/Landing"));

//primereact
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";

import "./layout/layout.scss";
import "./App.scss";

import Alertas from "./layout/Alertas";
import Login from "./accounts/Login";
import Stg from "./layout/Stg";
//const Stg = lazy(() => retry(() => import("./layout/Stg")));

//importar states
import AuthState from "../context/auth/authState";
import GlobalState from "../context/global/globalState";
import NotificacionState from "../context/notificaciones/notificacionState";

const App = () => {
  return (
    <Router>
      <Alertas />
      <Suspense fallback={<Spinner />}>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <NotificacionState>
          <Route path="/stg" render={(props) => <Stg {...props} />} />
        </NotificacionState>
      </Suspense>
    </Router>
  );
};

export default App;

const container = document.getElementById("app");
render(
  <GlobalState>
    <AuthState>
      <App />
    </AuthState>
  </GlobalState>,
  container
);
