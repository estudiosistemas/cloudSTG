import React, { Fragment } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import NotificacionesEnviadas from "./NotificacionesEnviadas";
import NotificacionesRecibidas from "./NotificacionesRecibidas";

const Notificaciones = () => (
  <TabView>
    <TabPanel header="Recibidas">
      <NotificacionesRecibidas />
    </TabPanel>
    <TabPanel header="Enviadas">
      <NotificacionesEnviadas />
    </TabPanel>
  </TabView>
);

export default Notificaciones;
