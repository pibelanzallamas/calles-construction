import axios from "axios";
import React, { useState } from "react";
import { alerts } from "../utils/alerts";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../state/userState";
import ReactLoading from "react-loading";
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
    console.log(email, password);
    setLoading(true);
    e.preventDefault();
    axios
      .post("https://calles-construction-back.onrender.com/api/user/login", {
        email,
        password,
      })
      .then((user) => {
        alerts("Hello!", `Logged in successfully`, "success");
        dispatch(setUser(user.data));
        navigate("/");
        setLoading(false);
      })
      .catch((err) => {
        console.log("erro del front, ", err);
        alerts("Sorry!", "Email or password are not correct!", "warning");
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
              <img src={peak ? eyeClose : eyeOpen}></img>
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
          <div style={{ margin: "0 auto" }}>
            <ReactLoading
              type={"spin"}
              color="#0f4c61"
              height={50}
              width={50}
            />
          </div>
        ) : (
          <button type="submit">Send</button>
        )}
      </form>
    </section>
  );
}

export default Login;
