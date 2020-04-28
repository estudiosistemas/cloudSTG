import React, { useState, useContext, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import PropTypes from "prop-types";

import authContext from "../../context/auth/authContext";
import notificacionContext from "../../context/notificaciones/notificacionContext";
import SidebarConfirmar from "../common/SidebarConfirmar";

const AppTopbar = (props) => {
  const [sidebarState, setSideBarState] = useState({ visible: false });

  //notificacion state
  const notificacionCtx = useContext(notificacionContext);
  const { nuevasNotificaciones } = notificacionCtx;

  //auth state
  const authCtx = useContext(authContext);
  const { logout } = authCtx;

  let history = useHistory();

  const toggleSidebar = () => {
    setSideBarState({ visible: !sidebarState.visible });
  };

  return (
    <Fragment>
      <SidebarConfirmar
        texto={"¿Está seguro que desea salir?"}
        visible={sidebarState.visible}
        funcConfimar={logout}
        toggleSidebar={toggleSidebar}
      />
      <div className="layout-topbar clearfix">
        <button
          className="p-link layout-menu-button"
          onClick={props.onToggleMenu}
        >
          <span className="pi pi-bars" />
        </button>
        <div className="layout-topbar-icons">
          <span className="layout-topbar-search">
            <InputText type="text" placeholder="Buscar Guía" />
            <span className="layout-topbar-search-icon pi pi-search" />
          </span>
          <button
            className="p-link"
            onClick={() => {
              history.push("/stg/notificaciones");
            }}
          >
            <span className="layout-topbar-item-text">Notificaciones</span>
            <span className="layout-topbar-icon pi pi-fw pi-bell" />
            <span className="layout-topbar-badge">{nuevasNotificaciones}</span>
          </button>
          <button
            className="p-link"
            onClick={() => {
              history.push("/stg/profile");
            }}
          >
            <span className="layout-topbar-item-text">Perfil</span>
            <span className="layout-topbar-icon pi pi-user" />
          </button>

          <button className="p-link" onClick={() => toggleSidebar()}>
            <span className="layout-topbar-item-text">Logout</span>
            <span className="layout-topbar-icon pi pi-fw pi-power-off" />
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default AppTopbar;
