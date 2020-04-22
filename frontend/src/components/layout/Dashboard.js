import React, { useContext } from "react";

import notificacionContext from "../../context/notificaciones/notificacionContext";
import useChoiceList from "../../hooks/useChoiceList";

const Dashboard = () => {
  //notificacion state
  const notificacionCtx = useContext(notificacionContext);
  const { nuevasNotificaciones } = notificacionCtx;

  //usar custom hook
  const [
    stateConcepto,
    SelectConcepto,
    actualizarStateConcepto,
  ] = useChoiceList("conceptocomprobante", {});

  const [stateTipo, SelectTipo, actualizarStateTipo] = useChoiceList(
    "tipocomprobante",
    {}
  );

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
      <div>
        <SelectConcepto />
        <SelectTipo />
      </div>
    </div>
  );
};

export default Dashboard;
