import React from "react";
import { useSelector } from "react-redux";
import trash from "../assets/trash.svg";
import ReactLoading from "react-loading";

function Image({ image, handleDelete, handleUpdate, processing }) {
  const user = useSelector((state) => state.user);

  return (
    <div className="image-card" key={image.id}>
      <div className="gallery-image">
        <figure>
          <img src={image.image} className="job-img" />
        </figure>
        {user.id && (
          <div className="gallery-edit-button">
            <button onClick={() => handleUpdate(image.id)}>Edit image</button>
            <figure
              onClick={() => {
                handleDelete(image.id);
              }}
            >
              <img src={trash} alt="trash-icon" />
            </figure>
          </div>
        )}
        {processing == image.id && (
          <ReactLoading type={"spin"} color="#0f4c61" height={50} width={50} />
        )}
      </div>
    </div>
  );
}

export default Image;
