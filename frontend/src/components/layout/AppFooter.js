import React, { Component } from "react";

export default class AppFooter extends Component {
  render() {
    return (
      <div className="layout-footer">
        <span className="footer-text" style={{ marginRight: "5px" }}>
          Estudio de Sistemas
        </span>
        {/* <img src="assets/layout/images/logo.svg" alt="" width="80" /> */}
        <span className="footer-text" style={{ marginLeft: "5px" }}>
          Todos los derechos reservados.
        </span>
      </div>
    );
  }
}
