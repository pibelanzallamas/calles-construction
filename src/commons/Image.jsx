import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import trash from "../assets/trash.svg";
import axios from "axios";
import { alerts } from "../utils/alerts";
import ReactLoading from "react-loading";

function Image({ image, key, disparador, handleDelete }) {
  const user = useSelector((state) => state.user);
  const imgUpdater = useRef(null);
  const [newImg, setNewImg] = useState("");
  const [loading, setLoading] = useState(false);

  //mod imagen
  const handleChangeImage = async () => {
    setLoading(true);
    const f = new FormData();
    f.append("file", newImg);
    f.append("upload_preset", "nfi9e7vs");
    f.append("api_key", import.meta.env.VITE_API_KEY);

    try {
      const clou = await axios.post(
        "https://api.cloudinary.com/v1_1/dh71ewqgp/image/upload",
        f
      );
      const link = clou.data.secure_url;

      const res = await axios.put(
        `https://calles-construction-back.onrender.com/api/images/update/${key}`,
        { link }
      );

      if (res.data) {
        disparador();
        alerts("Okey!", "Image updated successfuly", "success");
      } else {
        alerts("Sorry!", "Image couldn't be updated", "warning");
      }
    } catch (e) {
      console.log(e);
      alerts("Sorry!", "Image couldn't be updated", "danger");
    }
    setLoading(false);
  };

  const handleNewImage = (e) => {
    setNewImg(e.target.files[0]);
    handleChangeImage();
  };

  return (
    <div className="image-card" {...key} id={image.id}>
      <div className="gallery-image">
        <figure>
          <img src={image.image} className="job-img" />
        </figure>
        {user.id && (
          <div className="gallery-edit-button">
            <button onClick={() => imgUpdater.current.click()}>
              Edit image
            </button>

            <figure
              onClick={() => {
                handleDelete(image.id);
              }}
            >
              <img src={trash} alt="trash-icon" />
            </figure>
          </div>
        )}
        {loading && (
          <ReactLoading type={"spin"} color="#0f4c61" height={50} width={50} />
        )}
      </div>
      <input
        ref={imgUpdater}
        id="imagen-updater"
        type="file"
        onChange={handleNewImage}
        style={{ display: "none" }}
      ></input>
    </div>
  );
}

export default Image;
