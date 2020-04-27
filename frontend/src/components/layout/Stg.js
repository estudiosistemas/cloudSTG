import React, { useState, useEffect, useContext, lazy, Suspense } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";

import classNames from "classnames";
//import "primereact/resources/themes/nova-light/theme.css";

import { retry } from "../common/CoustomFunctions";

//importar states
import ClienteState from "../../context/clientes/clienteState";

//importar contexts
import notificacionContext from "../../context/notificaciones/notificacionContext";
import authContext from "../../context/auth/authContext";

//importar componentes
import AppMenu from "./AppMenu";
//const AppMenu = lazy(() => retry(() => import("./AppMenu")));
import AppTopbar from "./AppTopbar";
//const AppTopbar = lazy(() => retry(() => import("./AppTopbar")));
import AppProfile from "./AppProfile";
//const AppProfile = lazy(() => retry(() => import("./AppProfile")));
import AppFooter from "./AppFooter";
import Spinner from "./Spinner";
//const AppFooter = lazy(() => retry(() => import("./AppFooter")));
const Profile = lazy(() => retry(() => import("../accounts/Profile")));
const Clientes = lazy(() => retry(() => import("../clientes/Clientes")));
// const Provincias = lazy(() =>
//   retry(() => import("../bases/tablas/Provincias"))
// );
const Tablas = lazy(() => retry(() => import("../bases/tablas/Tablas_Loader")));
const Agencias_Loader = lazy(() =>
  retry(() => import("../agencias/Agencias_Loader"))
);
const Notificaciones = lazy(() =>
  retry(() => import("../notificaciones/Notificaciones"))
);
const Dashboard = lazy(() => retry(() => import("./Dashboard")));

const Stg = (props) => {
  const [layoutMode, setlayoutMode] = useState("static");
  const [layoutColorMode, setlayoutColorMode] = useState("dark");
  const [staticMenuInactive, setstaticMenuInactive] = useState(false);
  const [overlayMenuActive, setoverlayMenuActive] = useState(false);
  const [mobileMenuActive, setmobileMenuActive] = useState(false);
  const [menuClick, setmenuClick] = useState(false);
  const [notifys, setNotifys] = useState(0);

  //auth state
  const authCtx = useContext(authContext);
  const { loadUser, isAuthenticated } = authCtx;

  //notificacion state
  const notificacionCtx = useContext(notificacionContext);
  const { getNotificaciones_Recibidas } = notificacionCtx;

  let history = useHistory();

  const onWrapperClick = (event) => {
    if (!menuClick) {
      setoverlayMenuActive(false);
      setmobileMenuActive(false);
    }

    setmenuClick(false);
  };

  const onToggleMenu = (event) => {
    setmenuClick(true);

    if (isDesktop()) {
      if (layoutMode === "overlay") {
        setoverlayMenuActive(!overlayMenuActive);
      } else if (layoutMode === "static") {
        setstaticMenuInactive(!staticMenuInactive);
      }
    } else {
      const mobileMenuActive = mobileMenuActive;
      setmobileMenuActive(!mobileMenuActive);
    }
    event.preventDefault();
  };

  const onSidebarClick = (event) => {
    setmenuClick(true);
  };

  const onMenuItemClick = (event) => {
    if (!event.item.items) {
      setoverlayMenuActive(false);
      setmobileMenuActive(false);
    }
  };

  const menu = [
    {
      label: "Dashboard",
      icon: "pi pi-fw pi-home",
      command: () => {
        history.push("/stg/dashboard");
      },
    },
    {
      label: "Clientes",
      icon: "pi pi-user pi-align-left",
      items: [
        {
          label: "Administrar Clientes",
          icon: "pi pi-fw pi-user-plus",
          command: () => history.push("/stg/clientes"),
        },
        {
          label: "Resúmen de Cuenta",
          icon: "pi pi-fw pi-user-plus",
          command: () => history.push("/stg"),
        },
        {
          label: "Listado de Saldos",
          icon: "pi pi-fw pi-user-plus",
          command: () => history.push("/stg"),
        },
      ],
    },
    {
      label: "Agencia",
      icon: "pi pi-fw pi-cog",
      items: [
        {
          label: "Configuración",
          icon: "pi pi-fw pi-bars",
          command: () => {
            history.push("/stg/agencia");
          },
        },
        {
          label: "Puntos de Venta",
          icon: "pi pi-fw pi-bars",
          command: () => {
            history.push("/stg/puntosventa");
          },
        },
        {
          label: "Cobradores",
          icon: "pi pi-fw pi-bars",
          command: () => {
            history.push("/stg/cobradores");
          },
        },
        {
          label: "Zonas",
          icon: "pi pi-fw pi-bars",
          command: () => {
            history.push("/stg/zonas");
          },
        },
        {
          label: "Tarifas",
          icon: "pi pi-fw pi-bars",
          command: () => {
            history.push("/stg/tarifas");
          },
        },
      ],
    },
    {
      label: "Tablas del Sistema",
      icon: "pi pi-fw pi-cog",
      items: [
        {
          label: "Provincias",
          icon: "pi pi-fw pi-bars",
          command: () => {
            history.push("/stg/provincias");
          },
        },
        {
          label: "Códigos Postales",
          icon: "pi pi-fw pi-bars",
          command: () => {
            history.push("/stg/codigospostales");
          },
        },
        {
          label: "Alicuotas IVA",
          icon: "pi pi-fw pi-bars",
          command: () => {
            history.push("/stg/alicuotasiva");
          },
        },
        {
          label: "Condiciones de IVA",
          icon: "pi pi-fw pi-bars",
          command: () => {
            history.push("/stg/condicioniva");
          },
        },
        {
          label: "Comprobantes",
          icon: "pi pi-fw pi-bars",
          command: () => {
            history.push("/stg/comprobantes");
          },
        },
      ],
    },
    // {
    //   label: "Menu Hierarchy",
    //   icon: "pi pi-fw pi-search",
    //   items: [
    //     {
    //       label: "Submenu 1",
    //       icon: "pi pi-fw pi-bookmark",
    //       items: [
    //         {
    //           label: "Submenu 1.1",
    //           icon: "pi pi-fw pi-bookmark",
    //           items: [
    //             { label: "Submenu 1.1.1", icon: "pi pi-fw pi-bookmark" },
    //             { label: "Submenu 1.1.2", icon: "pi pi-fw pi-bookmark" },
    //             { label: "Submenu 1.1.3", icon: "pi pi-fw pi-bookmark" },
    //           ],
    //         },
    //         {
    //           label: "Submenu 1.2",
    //           icon: "pi pi-fw pi-bookmark",
    //           items: [
    //             { label: "Submenu 1.2.1", icon: "pi pi-fw pi-bookmark" },
    //             { label: "Submenu 1.2.2", icon: "pi pi-fw pi-bookmark" },
    //           ],
    //         },
    //       ],
    //     },
    //     {
    //       label: "Submenu 2",
    //       icon: "pi pi-fw pi-bookmark",
    //       items: [
    //         {
    //           label: "Submenu 2.1",
    //           icon: "pi pi-fw pi-bookmark",
    //           items: [
    //             { label: "Submenu 2.1.1", icon: "pi pi-fw pi-bookmark" },
    //             { label: "Submenu 2.1.2", icon: "pi pi-fw pi-bookmark" },
    //             { label: "Submenu 2.1.3", icon: "pi pi-fw pi-bookmark" },
    //           ],
    //         },
    //         {
    //           label: "Submenu 2.2",
    //           icon: "pi pi-fw pi-bookmark",
    //           items: [
    //             { label: "Submenu 2.2.1", icon: "pi pi-fw pi-bookmark" },
    //             { label: "Submenu 2.2.2", icon: "pi pi-fw pi-bookmark" },
    //           ],
    //         },
    //       ],
    //     },
    //   ],
    // },
  ];

  const addClass = (element, className) => {
    if (element.classList) element.classList.add(className);
    else element.className += " " + className;
  };

  const removeClass = (element, className) => {
    if (element.classList) element.classList.remove(className);
    else
      element.className = element.className.replace(
        new RegExp(
          "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
          "gi"
        ),
        " "
      );
  };

  const isDesktop = () => {
    return window.innerWidth > 1024;
  };

  useEffect(() => {
    if (mobileMenuActive) {
      addClass(document.body, "body-overflow-hidden");
    } else {
      removeClass(document.body, "body-overflow-hidden");
    }
  });

  useEffect(() => {
    function cargarNotifys() {
      return new Promise((resolve) => {
        if (isAuthenticated) {
          resolve(getNotificaciones_Recibidas());
        }
      });
    }

    async function cargarUsuario() {
      if (!isAuthenticated) {
        loadUser();
      }
      const result = await cargarNotifys();
    }

    cargarUsuario();
  }, [isAuthenticated]);

  // const logo =
  //   layoutColorMode === "dark"
  //     ? "assets/layout/images/logo-white.svg"
  //     : "assets/layout/images/logo.svg";

  const wrapperClass = classNames("layout-wrapper", {
    "layout-overlay": layoutMode === "overlay",
    "layout-static": layoutMode === "static",
    "layout-static-sidebar-inactive":
      staticMenuInactive && layoutMode === "static",
    "layout-overlay-sidebar-active":
      overlayMenuActive && layoutMode === "overlay",
    "layout-mobile-sidebar-active": mobileMenuActive,
  });

  const sidebarClassName = classNames("layout-sidebar", {
    "layout-sidebar-dark": layoutColorMode === "dark",
    "layout-sidebar-light": layoutColorMode === "light",
  });

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  } else
    return (
      <div className={wrapperClass} onClick={onWrapperClick}>
        <AppTopbar onToggleMenu={onToggleMenu} />

        <div className={sidebarClassName} onClick={onSidebarClick}>
          <div className="layout-logo">
            <h1>
              <span style={{ color: "#FFFFFF" }}>CloudSTG</span>
            </h1>
            {/* <img alt="Logo" src={logo} /> */}
          </div>
          <AppProfile noyifys={notifys} />
          <AppMenu model={menu} onMenuItemClick={onMenuItemClick} />
        </div>

        <div className="layout-main">
          <Suspense fallback={<Spinner />}>
            <Route
              path="/stg/dashboard"
              render={(props) => {
                return <Dashboard {...props} />;
              }}
            />
            <Tablas />
            <Agencias_Loader />
            <Route
              path="/stg/profile"
              render={(props) => {
                return <Profile {...props} />;
              }}
            />
            <Route
              path="/stg/notificaciones"
              render={(props) => {
                return <Notificaciones {...props} />;
              }}
            />
            <ClienteState>
              <Route
                path="/stg/clientes"
                render={(props) => {
                  return <Clientes {...props} />;
                }}
              />
            </ClienteState>
          </Suspense>
        </div>

        <AppFooter />

        <div className="layout-mask"></div>
      </div>
    );
};

export default Stg;
