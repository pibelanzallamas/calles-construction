import React from "react";

function Text({ text }) {
  return (
    <div className="text-compo">
      <h2> {text.title}</h2>
      <p> {text.desc}</p>
    </div>
  );
}

export default Text;
