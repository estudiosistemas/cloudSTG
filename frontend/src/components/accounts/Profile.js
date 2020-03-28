import React, { useState, useContext, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import authContext from "../../context/auth/authContext";
import globalContext from "../../context/global/globalContext";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { isEmpty } from "../common/CoustomFunctions";

function Profile() {
  //auth state
  const authCtx = useContext(authContext);
  const { isAuthenticated, user, updateUser } = authCtx;

  //global state
  const GlobalCtx = useContext(globalContext);
  const { showMessage } = GlobalCtx;

  //local state para imagen
  const [selectedFile, setSelectedFile] = useState(null);
  const [usuario, setUsuario] = useState({
    id: user.id,
    username: user.username,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    domicilio: user.profile.domicilio,
    telefono: user.profile.telefono
  });

  const {
    username,
    email,
    first_name,
    last_name,
    domicilio,
    telefono
  } = usuario;

  const handleSubmit = e => {
    e.preventDefault();
    if (isEmpty(username) || isEmpty(first_name) || isEmpty(last_name)) {
      showMessage({
        msg: "Los campos con * son obligatorios",
        title: "Error",
        type: "error"
      });
      return;
    }
    updateUser(usuario, selectedFile);
  };

  const onChangeValue = e => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = e => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <Fragment>
      <div
        className="p-grid p-fluid p-justify-center"
        style={{ margin: "30px 30px 30px 30px" }}
      >
        <div className="p-col-4">
          <div className="card p-align-center">
            <h1>
              {user
                ? user.first_name + " " + user.last_name
                : "Perfil de Usuario"}
            </h1>
            <div
              className="p-grid p-justify-center"
              style={{ margin: "20px 0px 20px 0px" }}
            >
              <img
                src={user ? user.profile.image : null}
                alt="avatar"
                width="150px"
                height="150px"
                style={{ borderRadius: "50%", marginTop: "30px" }}
              />
            </div>
            <div
              className="p-grid p-justify-center"
              style={{ margin: "20px 0px 20px 0px" }}
            >
              <h4>{user.username}</h4>
            </div>
          </div>
        </div>
        <div className="p-col-7">
          <div
            className="card card-w-title"
            style={{ marginLeft: "20px", padding: "20px 40px 20px 40px" }}
          >
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">*Usuario</label>
              <InputText
                style={{ marginBottom: "20px" }}
                placeholder="Username"
                id="username"
                type="text"
                name="username"
                onChange={onChangeValue}
                value={username}
              />
              <label htmlFor="first_name">*Nombre</label>
              <InputText
                style={{ marginBottom: "20px" }}
                placeholder="Nombre"
                id="first_name"
                type="text"
                name="first_name"
                onChange={onChangeValue}
                value={first_name}
              />

              <label htmlFor="last_name">*Apellido</label>
              <InputText
                style={{ marginBottom: "20px" }}
                placeholder="Apellido"
                id="last_name"
                type="text"
                name="last_name"
                onChange={onChangeValue}
                value={last_name}
              />

              <label htmlFor="email">Correo Electrónico</label>
              <InputText
                style={{ marginBottom: "20px" }}
                placeholder="Email"
                id="email"
                type="text"
                name="email"
                onChange={onChangeValue}
                value={email}
                size="40"
              />

              <label htmlFor="domicilio">Domicilio</label>
              <InputText
                style={{ marginBottom: "20px" }}
                placeholder="Domicilio"
                id="domicilio"
                type="text"
                name="domicilio"
                onChange={onChangeValue}
                value={domicilio}
                size="40"
              />

              <label htmlFor="telefono">Teléfono</label>
              <InputText
                style={{ marginBottom: "20px" }}
                placeholder="Teléfono"
                id="telefono"
                type="text"
                name="telefono"
                onChange={onChangeValue}
                value={telefono}
                size="40"
              />
              <div className="p-col-12">
                <label htmlFor="image">Imágen de Perfil</label>
              </div>
              <input
                type="file"
                id="image"
                accept="image/png, image/jpeg"
                onChange={handleImageChange}
              />
              <Button
                style={{
                  width: "150px",
                  float: "right"
                }}
                label="Actualizar"
                icon="pi pi-check"
                className="p-button-success"
                type="submit"
              />
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Profile;
