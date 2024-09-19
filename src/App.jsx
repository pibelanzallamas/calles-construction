import "./app.css";
import { useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/Navbar";
import Hidden from "./components/Hidden";
import Footer from "./components/Footer";
import AppRoutes from "./components/AppRoutes";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [hamburger, setHamburger] = useState(false);

  function handleOpen(state) {
    setHamburger(state);
  }

  return (
    <>
      {/* <Analytics /> */}
      <Navbar openFunc={handleOpen} />
      <Hidden isOpen={hamburger} />
      <ScrollToTop />
      <div className="home">
        <AppRoutes />
      </div>
      <Footer />
    </>
  );
}

export default App;
