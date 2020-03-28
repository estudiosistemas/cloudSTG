import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="splash-screen">
      <h1>Landing page...</h1>
      <br />
      <Link to="/stg">Ingresar al Sistema</Link>
    </div>
  );
};

export default Landing;
