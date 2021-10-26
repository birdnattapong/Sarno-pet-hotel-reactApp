import React, { useState } from "react";
import "./loginPage.css";
import { PersonOutlined, HttpsOutlined } from "@material-ui/icons";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const resetInputField = () => {
    setUsername("");
    setPassword("");
  };

  const [loginStatus, setLoginStatus] = useState("");
  const history = useHistory();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    resetInputField();
    setOpen(false);
  };

  const login = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/Admin/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.data.notfound) {
          setLoginStatus(res.data.notfound);
          handleClickOpen();
        } else if (res.status === 200) {
          history.push("/POS");
        }
      });
  };

  return (
    <div className="loginPage">
      <form className="login-form" onSubmit={login}>
        <img className="logo-loginPage" src="../img/sarno_logo.png" alt="" />
        <div className="loginTag">Login</div>
        <div className="usernameTag">Username</div>
        <div className="usernameInputSection">
          <PersonOutlined className="usernameIcon" />
          <input
            type="text"
            className="usernameInput"
            value={username}
            placeholder="Type your username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            autoFocus
            required
          />
        </div>

        <div className="passwordTag">Password</div>
        <div className="passwordInputSection">
          <HttpsOutlined className="passwordIcon" />
          <input
            type="password"
            className="passwordInput"
            value={password}
            placeholder="Type your password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </div>
        <button type="submit" className="loginBtn">
          LOGIN
        </button>
      </form>

      <Dialog open={open}>
        <DialogTitle>
          <div className="dialogTitle">Login Error</div>
        </DialogTitle>
        <DialogContent>
          <div className="dialogContentText">{loginStatus}</div>
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose} className="closeDialog">
            OK
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
