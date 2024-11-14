import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Squash as Hamburger } from "hamburger-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import defaultLogo from "../assets/nav-logo.png";
import { alerts } from "../utils/alerts";
import { uploadImages } from "../utils/utils";

function Navbar({ openFunc }) {
  const user = useSelector((state) => state.user);
  const [isOpen, setOpen] = useState(false);
  const [logo, setLogo] = useState({ link: defaultLogo });
  const [newLogo, setNewLogo] = useState("");
  const [loading, setLoading] = useState(false);

  const [estado, setEstado] = useState(false);
  const imgUpdater = useRef(null);

  useEffect(() => {
    openFunc(isOpen);
  }, [isOpen]);

  //get latest logo
  useEffect(() => {
    const getLogo = async () => {
      try {
        const resp = await axios.get(
          "https://calles-construction-back.onrender.com/api/descriptions/"
        );

        if (resp.data.length > 0) {
          setLogo(resp.data[resp.data.length - 1]);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getLogo();
  }, [estado]);

  //upload new logo
  const handleNewImage = (e) => {
    setNewLogo(e.target.files[0]);
  };

  useEffect(() => {
    console.log("newImg dentro del useEffect", newLogo);

    if (newLogo) {
      handleChangeImage();
    }
  }, [newLogo]);

  const handleChangeImage = async () => {
    //cambio el valor de Loading...
    setLoading(true);

    try {
      //creo link de imagen newLogo
      const link = await uploadImages(newLogo);

      //guardo el link del newLogo en la bdd
      await axios.post(
        "https://calles-construction-back.onrender.com/api/descriptions/create",
        { link }
      );

      //cambio el estado del front
      setEstado(!estado);

      //le muestro un alert al usuario de que todo salió bien
      alerts("Okey!", "Logo updated successfuly", "success");
    } catch (e) {
      //muestro por consola si hubo un error
      console.log("error de cliente", e);
      //le muestro un alert al usuario de que algo salió mal
      alerts("Sorry!", "Logo couldn't be updated, try again", "danger");
    }
    //vuelvo el valor de loading a falso
    setLoading(false);
  };

  return (
    <nav id="navbar">
      <div className="logo-section">
        <Link to="/">
          <figure className="nav-logo">
            {logo.link && <img src={logo.link} alt="calles-logo" />}
          </figure>
        </Link>
        {user.id && loading ? (
          <ReactLoading type={"spin"} color="#0f4c61" height={30} width={30} />
        ) : (
          <button id="logo-button" onClick={() => imgUpdater.current.click()}>
            Change
          </button>
        )}
      </div>
      <ul className="desktop-navbar">
        <Link to="/services">Services</Link>
        <Link to="/jobs">Jobs</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/location">Location</Link>
      </ul>
      <div className="hamburger">
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </div>
      <input
        ref={imgUpdater}
        id="imagen-updater"
        type="file"
        onChange={(e) => handleNewImage(e)}
        style={{ display: "none" }}
      ></input>
    </nav>
  );
}

export default Navbar;

//entrar,
//cargar logo con el ultimo objet de mi ar, cada que esta mod
//la primera vez, length == 0, set con defa
//subir una nueva, mod el estado
