import React, { useState, useContext, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import authContext from "../../context/auth/authContext";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  //auth state
  const authCtx = useContext(authContext);
  const { isAuthenticated, login } = authCtx;

  const handleSubmit = e => {
    e.preventDefault();
    login(username, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/stg/dashboard" />;
  }

  return (
    <Fragment>
      <div className="p-grid  p-align-center p-justify-center">
        <div className="card" style={{ margin: "100px 0px 0px 0px" }}>
          <h1>Login</h1>
          <br />
          <form onSubmit={handleSubmit}>
            <div className="p-col-12 p-md-4">
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-user"></i>
                </span>
                <InputText
                  placeholder="Username"
                  id="username"
                  type="text"
                  name="username"
                  onChange={e => setUserName(e.target.value)}
                  value={username}
                  size="40"
                />
              </div>
            </div>

            <div className="p-col-12 p-md-4">
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-lock"></i>
                </span>
                <InputText
                  placeholder="Password"
                  id="passw"
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                  size="40"
                />
              </div>
            </div>

            <Button
              style={{ margin: "20px 0px 0px 0px" }}
              label="Login"
              icon="pi pi-check"
              className="p-button-success"
              type="submit"
            />

            <p>
              Dont' have an account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default Login;
