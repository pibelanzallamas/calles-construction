import React from "react";

function Text({ text }) {
  return (
    <div className="text-compo">
      <h3> {text.title}</h3>
      <p> {text.desc}</p>
    </div>
  );
}

export default Text;
