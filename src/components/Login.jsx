import axios from "axios";
import React, { useState } from "react";
import { alerts } from "../utils/alerts";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../state/userState";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/user/login", {
        email,
        password,
      })
      .then((user) => {
        alerts("Aloha!", `Login successul 🏝`, "success");
        dispatch(setUser(user.data));
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        alerts("Nope!", "Email o password incorrectos ☠️", "danger");
      });
  }

  return (
    <section className="estimate-compo login-compo">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            maxLength={40}
            placeholder="email"
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            maxLength={20}
            placeholder="password"
          />
        </div>
        <button type="submit">Send</button>
      </form>
    </section>
  );
}

export default Login;
