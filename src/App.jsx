import "./app.css";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Hidden from "./components/Hidden";
import Footer from "./components/Footer";
import AppRoutes from "./components/AppRoutes";

function App() {
  const [hamburger, setHamburger] = useState(false);

  function handleOpen(state) {
    setHamburger(state);
  }

  return (
    <>
      <Navbar openFunc={handleOpen} />
      <Hidden isOpen={hamburger} />
      <div className="home">
        <AppRoutes />
      </div>
      <Footer />
    </>
  );
}

export default App;
