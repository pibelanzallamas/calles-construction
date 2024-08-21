import React, { useEffect, useState } from "react";
import logo from "../assets/nav-logo.png";
import { Squash as Hamburger } from "hamburger-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Navbar({ openFunc }) {
  const [isOpen, setOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const [nl, setNl] = useState(""); //link
  const [i, setI] = useState(""); //imagen
  const [finalLogo, setFinalLogo] = useState("");

  useEffect(() => {
    openFunc(isOpen);
  }, [isOpen]);

  function subirImagen() {
    //poner url en nl
  }

  function handleLogo() {
    //seleccionar un logo .svg, .png, .jpeg
    //subir a cloudinary, en carpeta logos
    //obtener url www.site.com/archivo.jpg
    //cambiar el src de img
    //se muestra la imagen
    setNl(
      "https://upload.wikimedia.org/wikipedia/commons/4/4a/100x100_logo.png"
    );
  }

  useEffect(() => {
    if (nl) setFinalLogo(nl);
    else setFinalLogo(logo);
  }, [nl]);

  /*
   * buscar remotamente y obtener el ultimo
   * si el usuario carga uno, subirlo
   * obtener el ultimo de nuevo y recargar el valor
   */

  return (
    <nav id="navbar">
      <div className="logo-section">
        <Link to="/">
          <figure className="nav-logo">
            <img src={finalLogo} alt="calles-logo" />
          </figure>
        </Link>
        {user.id && (
          <button id="logo-button" onClick={handleLogo}>
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
    </nav>
  );
}

export default Navbar;
