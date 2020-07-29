import React, { useState, useContext } from "react";
import "../styles/App.css";
import UserContext from "../contexts/UserContext";

const LoginForm = () => {
  const { login, hasLoginError } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    login(username, password);
  };

  const onInputChange = setter => e => {
    setter(e.target.value);
  };

  return (
    <form className="login-form" onSubmit={onSubmit}>
      <h1>Please Login</h1>
      {hasLoginError && (
        <div id="error" className="login-form-error">
          Login Failed: Incorrect Credentials
        </div>
      )}
      <fieldset>
        <legend>Credentials</legend>
        <label>
          <span>Username</span>
          <input
            type="text"
            name="username"
            value={username}
            onChange={onInputChange(setUsername)}
            placeholder="username"
            required
          />
        </label>
        <label>
          <span>Password</span>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onInputChange(setPassword)}
            placeholder="password"
            required
          />
        </label>
      </fieldset>
      <button>Login</button>
    </form>
  );
};

export default LoginForm;
