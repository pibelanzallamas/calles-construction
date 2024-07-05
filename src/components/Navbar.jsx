import React, { useEffect, useState } from "react";
import logo from "../assets/nav-logo.png";
import { Squash as Hamburger } from "hamburger-react";

// crea esta pagina para tu yo del futuro cuando necesites llamar a un handy man

function Navbar({ openFunc }) {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    openFunc(isOpen);
  }, [isOpen]);

  return (
    <nav id="navbar">
      <figure className="nav-logo">
        <img src={logo} alt="calles-logo" />
      </figure>

      <Hamburger toggled={isOpen} toggle={setOpen} />
    </nav>
  );
}

export default Navbar;
