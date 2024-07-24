import React from "react";

function TopButton() {
  function handleGo() {
    const refe = document.getElementById("navbar");

    if (refe) {
      refe.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className="button-estimate-div">
      <button onClick={handleGo}>Go to Top</button>
    </div>
  );
}

export default TopButton;
