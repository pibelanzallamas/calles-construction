import "./app.css";
import { useState } from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Hidden from "./components/Hidden";
import Services from "./components/Services";
import Jobs from "./components/Jobs";
import Gallery from "./components/Gallery";
import Estimate from "./components/Estimate";
import Location from "./components/Location";
import Footer from "./components/Footer";
import AppRoutes from "./components/AppRoutes";

function App() {
  const [open, setOpen] = useState(false);

  function handleOpen(state) {
    setOpen(state);
  }

  return (
    <>
      <Navbar openFunc={handleOpen} />
      <Hidden isOpen={open} />
      <div className="home">
        <AppRoutes />
        {/* <Home /> */}
        {/* <Services /> */}
        {/* <Jobs /> */}
        {/* <Gallery /> */}
        {/* <Estimate /> */}
        {/* <Location /> */}
      </div>
      <Footer />
    </>
  );
}

export default App;
