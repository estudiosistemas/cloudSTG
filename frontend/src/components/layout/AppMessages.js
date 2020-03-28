import React, { Component, useContext } from "react";
import { Messages } from "primereact/messages";
import { Message } from "primereact/message";
import { Growl } from "primereact/growl";

import globalContext from "../../context/global/globalContext";

export default class AppMessages extends Component {
  constructor() {
    super();

    this.showInfo = this.showInfo.bind(this);
    this.showSuccess = this.showSuccess.bind(this);
    this.showWarn = this.showWarn.bind(this);
    this.showError = this.showError.bind(this);
  }

  static contextType = globalContext;

  showSuccess() {
    let msg = {
      severity: "success",
      summary: "Success Message",
      detail: "Order submitted"
    };
    this.growl.show(msg);
    this.messages.show(msg);
  }

  showInfo() {
    let msg = {
      severity: "info",
      summary: "Info Message",
      detail: "PrimeReact rocks"
    };
    this.growl.show(msg);
    this.messages.show(msg);
  }

  showWarn() {
    let msg = {
      severity: "warn",
      summary: "Warn Message",
      detail: "There are unsaved changes"
    };
    this.growl.show(msg);
    this.messages.show(msg);
  }

  showError() {
    let msg = {
      severity: "error",
      summary: "Error Message",
      detail: "Validation failed"
    };
    this.growl.show(msg);
    this.messages.show(msg);
  }

  render() {
    if (this.context.messages)
      return <Messages ref={el => (this.messages = el)} />;
    else if (this.context.messages)
      return (
        <Growl ref={el => (this.growl = el)} style={{ marginTop: "75px" }} />
      );
    else return null;
  }
}
