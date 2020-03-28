import React, { useContext, useEffect } from "react";

import { Growl } from "primereact/growl";
import globalContext from "../../context/global/globalContext";

function Alertas() {
  const GlobalCtx = useContext(globalContext);
  const { message } = GlobalCtx;

  let growl = React.createRef();

  const showGrowl = msg => {
    growl.show({
      severity: message.type,
      summary: message.title,
      detail: msg
    });
  };

  useEffect(() => {
    let miMensaje = "";
    if (Object.keys(message).length !== 0) {
      if (typeof message.msg === "object") {
        if (message.msg.detail) miMensaje = message.msg.detail;
        else if (message.msg.non_field_errors)
          miMensaje = message.msg.non_field_errors;
        else if (message.msg.username) miMensaje = message.msg.username;
        else if (message.msg.codigo) miMensaje = message.msg.codigo[0];
        else if (message.msg.email) miMensaje = message.msg.email[0];
      } else {
        miMensaje = message.msg;
      }
      showGrowl(miMensaje);
    }
  }, [message]);

  return <Growl ref={el => (growl = el)} />;
}

export default Alertas;
