import React, { useState, useEffect, useContext, lazy, Suspense } from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import classNames from "classnames";
import { retry } from "../common/CoustomFunctions";

//importar states
import ProvinciaState from "../../context/tablas/provincias/provinciaState";
import AlicuotaState from "../../context/tablas/alicuotas/alicuotaState";
import CodigoPostalState from "../../context/tablas/codigos_postales/codigopostalState";
import CondicionIVAState from "../../context/tablas/condicionIVA/condicionIVAState";
import ClienteState from "../../context/clientes/clienteState";
import CobradorState from "../../context/agencias/cobradores/cobradorState";
import ZonaState from "../../context/agencias/zonas/zonaState";
import TarifaState from "../../context/agencias/tarifas/tarifaState";

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
const Alicuotas = lazy(() => retry(() => import("../bases/tablas/Alicuotas")));
const CodigosPostales = lazy(() =>
  retry(() => import("../bases/tablas/CodigosPostales"))
);
const CondicionIVA = lazy(() =>
  retry(() => import("../bases/tablas/CondicionIVA"))
);
const Profile = lazy(() => retry(() => import("../accounts/Profile")));
const Clientes = lazy(() => retry(() => import("../clientes/Clientes")));
const Provincias = lazy(() =>
  retry(() => import("../bases/tablas/Provincias"))
);
const Agencias = lazy(() => retry(() => import("../agencias/Agencias")));
const Notificaciones = lazy(() =>
  retry(() => import("../notificaciones/Notificaciones"))
);
const Dashboard = lazy(() => retry(() => import("./Dashboard")));
const Cobradores = lazy(() =>
  retry(() => import("../agencias/cobradores/Cobradores"))
);
const Zonas = lazy(() => retry(() => import("../agencias/zonas/Zonas")));
const Tarifas = lazy(() => retry(() => import("../agencias/tarifas/Tarifas")));

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
      ],
    },
    {
      label: "Components",
      icon: "pi pi-fw pi-globe",
      badge: "9",
      items: [
        { label: "Sample Page", icon: "pi pi-fw pi-th-large", to: "/sample" },
        { label: "Forms", icon: "pi pi-fw pi-file", to: "/forms" },
        { label: "Data", icon: "pi pi-fw pi-table", to: "/data" },
        { label: "Panels", icon: "pi pi-fw pi-list", to: "/panels" },
        { label: "Overlays", icon: "pi pi-fw pi-clone", to: "/overlays" },
        { label: "Menus", icon: "pi pi-fw pi-plus", to: "/menus" },
        { label: "Messages", icon: "pi pi-fw pi-spinner", to: "/messages" },
        { label: "Charts", icon: "pi pi-fw pi-chart-bar", to: "/charts" },
        { label: "Misc", icon: "pi pi-fw pi-upload", to: "/misc" },
      ],
    },
    {
      label: "Template Pages",
      icon: "pi pi-fw pi-file",
      items: [
        { label: "Empty Page", icon: "pi pi-fw pi-circle-off", to: "/empty" },
      ],
    },
    {
      label: "Menu Hierarchy",
      icon: "pi pi-fw pi-search",
      items: [
        {
          label: "Submenu 1",
          icon: "pi pi-fw pi-bookmark",
          items: [
            {
              label: "Submenu 1.1",
              icon: "pi pi-fw pi-bookmark",
              items: [
                { label: "Submenu 1.1.1", icon: "pi pi-fw pi-bookmark" },
                { label: "Submenu 1.1.2", icon: "pi pi-fw pi-bookmark" },
                { label: "Submenu 1.1.3", icon: "pi pi-fw pi-bookmark" },
              ],
            },
            {
              label: "Submenu 1.2",
              icon: "pi pi-fw pi-bookmark",
              items: [
                { label: "Submenu 1.2.1", icon: "pi pi-fw pi-bookmark" },
                { label: "Submenu 1.2.2", icon: "pi pi-fw pi-bookmark" },
              ],
            },
          ],
        },
        {
          label: "Submenu 2",
          icon: "pi pi-fw pi-bookmark",
          items: [
            {
              label: "Submenu 2.1",
              icon: "pi pi-fw pi-bookmark",
              items: [
                { label: "Submenu 2.1.1", icon: "pi pi-fw pi-bookmark" },
                { label: "Submenu 2.1.2", icon: "pi pi-fw pi-bookmark" },
                { label: "Submenu 2.1.3", icon: "pi pi-fw pi-bookmark" },
              ],
            },
            {
              label: "Submenu 2.2",
              icon: "pi pi-fw pi-bookmark",
              items: [
                { label: "Submenu 2.2.1", icon: "pi pi-fw pi-bookmark" },
                { label: "Submenu 2.2.2", icon: "pi pi-fw pi-bookmark" },
              ],
            },
          ],
        },
      ],
    },
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

  const logo =
    layoutColorMode === "dark"
      ? "assets/layout/images/logo-white.svg"
      : "assets/layout/images/logo.svg";

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

            <Route
              path="/stg/agencias"
              render={(props) => {
                return <Agencias {...props} />;
              }}
            />
          </Suspense>
        </div>

        <AppFooter />

        <div className="layout-mask"></div>
      </div>
    );
};

export default Stg;
