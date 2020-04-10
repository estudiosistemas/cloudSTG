import React, { Fragment, useContext, useEffect } from "react";
import { render } from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "@babel/polyfill";

// import { transitions, positions, Provider as AlertProvider } from "react-alert";

// import AlertTemplate from "react-alert-template-basic";

import Landing from "./landing/Landing";
import Stg from "./layout/Stg";

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
import Page from "react-page-loading";

//importar states
import AuthState from "../context/auth/authState";
import GlobalState from "../context/global/globalState";
import NotificacionState from "../context/notificaciones/notificacionState";

//import authContext from "../context/auth/authContext";

//Alet options
// const alertOptions = {
//   position: positions.TOP_RIGHT,
//   timeout: 3000,
//   offset: "60px",
//   transition: transitions.SCALE
// };

const App = () => {
  return (
    <Router>
      <Fragment>
        <Page loader={"resize-spin"} color={"#1fa1fc"} size={6}>
          <Alertas />
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <NotificacionState>
            <Route path="/stg" render={(props) => <Stg {...props} />} />
          </NotificacionState>
        </Page>
      </Fragment>
    </Router>
    //</AlertProvider>
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
