import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import trash from "../assets/trash.svg";
import axios from "axios";
import { alerts } from "../utils/alerts";

function Image({ image, key, disparador, handleDelete }) {
  const user = useSelector((state) => state.user);
  const imgUpdater = useRef(null);
  const [newImg, setNewImg] = useState("");

  //mod imagen
  const handleChangeImage = async () => {
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
      alerts("Sorry!", "Image couldn't be erased", "danger");
    }
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
            <figure onClick={() => handleDelete(image.id)}>
              <img src={trash} alt="trash-icon" />
            </figure>
          </div>
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

//modificar las fotos de galleries
//hacer click en edit image
//seleccionar una imagen de mi compu
//esa imagen tiene que mostrarse en mi gallery

//abrir un input type file
//guardar los datos de esa imagen
//subirla a la nube
//obtener el numero de id de la imagen
//remplazar el link de ese registro de gallery por el nuevo
//volver a pedir todas las imagenes
//mostrar el nuevo registro con la nueva imagen

//input type display:off
//
//el mod lo hacemos en image
//el cartel de alert en image
//disparar un funcion pasada por props
//
//disparar estado en gallery
//pedir todas las fotos de nuevo
