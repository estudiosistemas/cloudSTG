import React, { useContext, useState } from "react";
import { Chart } from "primereact/chart";

import notificacionContext from "../../context/notificaciones/notificacionContext";

const Dashboard = () => {
  //notificacion state
  const notificacionCtx = useContext(notificacionContext);
  const { nuevasNotificaciones } = notificacionCtx;

  const [lineData, setLineData] = useState({
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"],
    datasets: [
      {
        label: "IVA Ventas",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "#03A9F4",
      },
      {
        label: "Iva Compras",
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: false,
        borderColor: "#FFC107",
      },
    ],
  });

  const [barData, setBarData] = useState({
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"],
    datasets: [
      {
        label: "Ingresos",
        backgroundColor: "#03A9F4",
        borderColor: "#03A9F4",
        data: [65, 59, 80, 81, 56, 55, 40],
      },
      {
        label: "Egresos",
        backgroundColor: "#FFC107",
        borderColor: "#FFC107",
        data: [28, 48, 40, 19, 86, 27, 90],
      },
    ],
  });

  return (
    <div className="p-grid p-fluid dashboard">
      <div className="p-col-12">
        <h1>Dashboard</h1>
      </div>
      <div className="p-col-12 p-lg-4">
        <div className="card summary">
          <span className="title">Notificaciones</span>
          <span className="detail">Notificaciones sin leer</span>
          <span className="count revenue">{nuevasNotificaciones}</span>
        </div>
      </div>
      <div className="p-col-12 p-lg-4">
        <div className="card summary">
          <span className="title">Envíos</span>
          <span className="detail">Cantidad de guías generadas</span>
          <span className="count purchases">534</span>
        </div>
      </div>
      <div className="p-col-12 p-lg-4">
        <div className="card summary">
          <span className="title">Ventas</span>
          <span className="detail">Total facturado del día</span>
          <span className="count visitors">$ 35,200</span>
        </div>
      </div>
      <div className="p-col-12 p-lg-6">
        <div className="card">
          <h1 className="centerText">Posición I.V.A.</h1>
          <Chart type="line" data={lineData} />
        </div>
      </div>
      <div className="p-col-12 p-lg-6">
        <div className="card">
          <h1 className="centerText">Ingresos/Egresos</h1>
          <Chart type="bar" data={barData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
