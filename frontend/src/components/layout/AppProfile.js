import React, { useState, useContext, Fragment, useEffect } from "react";
import { useHistory } from "react-router-dom";
import classNames from "classnames";

import useAgencia from "../../hooks/useAgencia";
import authContext from "../../context/auth/authContext";
import notificacionContext from "../../context/notificaciones/notificacionContext";

const AppProfile = () => {
  const [expanded, setExpanded] = useState(false);

  //auth state
  const authCtx = useContext(authContext);
  const { user, logout } = authCtx;

  //notificacion state
  const notificacionCtx = useContext(notificacionContext);
  const { getNotificaciones_Recibidas, nuevasNotificaciones } = notificacionCtx;

  //usar custom hook
  const [stateAgencia, SelectAgencia, actualizarStateAgencia] = useAgencia({});

  let history = useHistory();

  const onClick = event => {
    setExpanded(!expanded);
    event.preventDefault();
  };

  useEffect(() => {
    let timer1 = setTimeout(() => {
      getNotificaciones_Recibidas();
    }, 60000);

    return () => {
      clearTimeout(timer1);
    };
  });

  return (
    <Fragment>
      <div className="layout-profile">
        <div>
          <img
            style={{ borderRadius: "50%" }}
            src={user ? user.profile.image : null}
            alt="avatar"
          />
        </div>
        <button className="p-link layout-profile-link" onClick={onClick}>
          <span className="username">
            {user ? user.first_name + " " + user.last_name : ""}
          </span>
          <i className="pi pi-fw pi-cog" />
        </button>
        <ul className={classNames({ "layout-profile-expanded": expanded })}>
          <li>
            <button
              className="p-link"
              onClick={() => {
                history.push("/stg/profile");
              }}
            >
              <i className="pi pi-fw pi-user" />
              <span>Perfil</span>
            </button>
          </li>
          <li>
            <button
              className="p-link"
              onClick={() => {
                history.push("/stg/notificaciones");
              }}
            >
              <i className="pi pi-fw pi-bell" />
              <span>Notificaciones</span>
              {nuevasNotificaciones > 0 ? (
                <span className="menuitem-badge">{nuevasNotificaciones}</span>
              ) : null}
            </button>
          </li>
          <li>
            <button className="p-link" onClick={() => logout()}>
              <i className="pi pi-fw pi-power-off" />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
      <div
        className="p-grid p-justify-center"
        style={{ margin: "0px 0px 20px 0px" }}
      >
        <SelectAgencia />
      </div>
    </Fragment>
  );
};

export default AppProfile;
