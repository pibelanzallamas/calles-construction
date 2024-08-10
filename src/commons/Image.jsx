import React from "react";

function Image({ image }) {
  return (
    <div className="image-card">
      <figure>
        <img src={image.url} className="job-img" />
      </figure>
      <p>{image.desc}</p>
    </div>
  );
}

export default Image;
