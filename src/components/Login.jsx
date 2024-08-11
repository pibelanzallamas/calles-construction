import axios from "axios";
import React, { useState } from "react";
import { alerts } from "../utils/alerts";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../state/userState";
import eyeOpen from "../assets/eye-outline.svg";
import eyeClose from "../assets/eye-off-outline.svg";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [peak, setPeak] = useState(false);

  function handleLogin(e) {
    setLoading(true);
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/user/login", {
        email,
        password,
      })
      .then((user) => {
        alerts("Aloha!", `Logged in successfully`, "info");
        dispatch(setUser(user.data));
        navigate("/");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alerts("Nope!", "Email or password incorrect", "danger");
        setLoading(false);
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
          <div className="peak-line">
            <label>Password</label>
            <figure onClick={() => setPeak(!peak)}>
              <img src={peak ? eyeOpen : eyeClose}></img>
            </figure>
          </div>
          <input
            type={peak ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            maxLength={20}
            placeholder="password"
          />
        </div>
        {loading ? (
          <p className="loading-text"> Loading ...</p>
        ) : (
          <button type="submit">Send</button>
        )}
      </form>
    </section>
  );
}

export default Login;
