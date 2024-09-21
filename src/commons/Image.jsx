import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import trash from "../assets/trash.svg";
import axios from "axios";
import { alerts } from "../utils/alerts";
import ReactLoading from "react-loading";

function Image({ image, disparador, handleDelete }) {
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
      console.log("link de img pa update", link);

      // if (link) {
      //   const res = await axios.put(
      //     `https://calles-construction-back.onrender.com/api/images/update/${image.id}`,
      //     { link }
      //   );
      //   console.log("res from images/update/id", res);

      //   // if (res.data) {
      //   //   disparador();
      //   //   alerts("Okey!", "Image updated successfuly", "success");
      //   // } else {
      //   //   alerts("Sorry!", "Image couldn't be updated", "warning");
      //   // }
      // }
      const res = await axios.put(
        `https://calles-construction-back.onrender.com/api/images/update/${image.id}`,
        { link }
      );

      // Manejo de respuesta exitosa
      if (res.status === 200) {
        console.log(res.data.message); // 'Imagen actualizada con éxito.'
        // Aquí puedes realizar alguna acción como mostrar una notificación o actualizar el estado
      }
    } catch (error) {
      // console.log("error del catch", e);
      // alerts("Sorry!", "Image couldn't be updated", "danger");
      if (error.response) {
        // La respuesta del servidor tiene un código de error (4xx o 5xx)
        if (error.response.status === 404) {
          console.error("No se encontró la imagen con el id proporcionado.");
          // Maneja el caso de que no se encontró la imagen
        } else if (error.response.status === 500) {
          console.error("Error del servidor al actualizar la imagen.");
          // Maneja el caso de error del servidor
        } else {
          console.error("Error inesperado:", error.response.data.message);
          // Maneja cualquier otro tipo de error
        }
      } else {
        // Error que no tiene respuesta del servidor (problema de red, etc.)
        console.error("Error de red o de conexión:", error.message);
      }
    }
    setLoading(false);
  };

  const handleNewImage = (e) => {
    setNewImg(e.target.files[0]);
    handleChangeImage();
  };

  return (
    <div className="image-card" key={image.id}>
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

//borrar se puede, agregar se puede, pero no actualiza en el momento
//modificar nada, -> error 404

//pasa a jobs despues
