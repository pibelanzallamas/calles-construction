import React, { useState } from "react";
import { useSelector } from "react-redux";
import trash from "../assets/trash.svg";

function Image({ image, key }) {
  const user = useSelector((state) => state.user);
  const [newImg, setNewImg] = useState(null);

  return (
    <div className="image-card" {...key} id={image.id}>
      <div className="gallery-image">
        <figure>
          <img src={image.image} className="job-img" />
        </figure>
        {user.id && (
          <div className="gallery-edit-button">
            <button onClick={() => handleChangeImage(image.id)}>
              Edit image
            </button>
            <figure onClick={() => handleDelete(image.id)}>
              <img src={trash} alt="trash-icon" />
            </figure>
          </div>
        )}
      </div>
      <input
        type="file"
        // onChange={}
        style={{ display: "none" }}
      ></input>
    </div>
  );
}

export default Image;
