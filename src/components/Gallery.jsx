import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { alerts } from "../utils/alerts";
import axios from "axios";
import Image from "../commons/Image";
import lessButton from "../assets/lessButton.svg";
import moreButton from "../assets/moreButton.svg";
import plus from "../assets/plus.svg";
import minus from "../assets/minus.svg";
import UserModals from "../modals/UserModals";
import ReactLoading from "react-loading";
import TopButton from "../commons/TopButton";

function Gallery() {
  const user = useSelector((state) => state.user);
  const [gallery, setGallery] = useState([]); //all images
  const [rubro, setRubro] = useState("");
  const [finalJobs, setFinalJobs] = useState([]); //filter por rubro
  const [estado, setEstado] = useState(false); //state listener
  const [more, setMore] = useState(false); //guardar datos
  const [category, setCategory] = useState("");
  const [allImages, setAllImages] = useState([]);
  const [moreImages, setMoreImages] = useState(1);
  const divs = Array.from({ length: moreImages });
  const [loading, setLoading] = useState(false);
  const [confirmBox, setConfirmBox] = useState(false);
  const [id, setId] = useState({});
  const [processing, setProcessing] = useState(null);
  const imgUpdater = useRef(null);
  const [newImg, setNewImg] = useState("");
  const openBox = () => setConfirmBox(true);
  const closeBox = () => setConfirmBox(false);

  //get images
  useEffect(() => {
    axios
      .get("https://calles-construction-back.onrender.com/api/images/")
      .then((resp) => setGallery(resp.data))
      .catch((err) => console.log(err));
  }, [estado]);

  // filtrar;
  useEffect(() => {
    if (gallery.length > 0) {
      setFinalJobs(
        gallery.filter(
          (ele) => ele.category.toLowerCase() == rubro.toLowerCase()
        )
      );
    }
  }, [rubro, gallery]);

  //select default value for category with rubro
  useEffect(() => {
    if (rubro) {
      setCategory(rubro.toLowerCase());
      setMore(false);
    }
  }, [rubro]);

  //create images
  //upload image to the cloud
  const uploadImages = async (pic) => {
    //las funciones async siempre van a devolver una promesa
    const f = new FormData();
    f.append("file", pic);
    f.append("upload_preset", "nfi9e7vs");
    f.append("api_key", import.meta.env.VITE_API_KEY);

    try {
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/dh71ewqgp/image/upload",
        f
      );
      return data.secure_url;
    } catch (e) {
      console.log(e);
      throw new Error("Failed to upload image to the cloud");
    }
  };

  //upload image to the database
  const imagesDb = async (link, category, jid) => {
    try {
      await axios.post(
        "https://calles-construction-back.onrender.com/api/images/create",
        {
          image: link,
          category,
          jid,
        }
      );
    } catch (e) {
      console.log(e);
      throw new Error("Failed to upload image to the database");
    }
  };

  //upload image/s
  const createImage = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      for (let i = 0; i < allImages.length; i++) {
        const link = await uploadImages(allImages[i]);
        await imagesDb(link, category, 848484);
      }

      setEstado(!estado);
      setAllImages([]);
      setMoreImages(1);
      setMore(false);
      alerts(
        "Image Uploaded",
        "The image(s) have been uploaded successfully.",
        "success"
      );
    } catch (e) {
      alerts("Upload Error", "The image(s) could not be uploaded.", "warning");
      console.log(e);
    }

    setLoading(false);
  };

  //delete images
  const handleDelete = (id) => {
    setId(id);
    openBox();
  };

  const confirmDelete = async () => {
    closeBox();
    setProcessing(id);
    try {
      await axios.delete(
        `https://calles-construction-back.onrender.com/api/images/delete/${id}`
      );

      setEstado(!estado);
      alerts(
        "Image Deleted",
        "The image has been deleted successfully.",
        "success"
      );
    } catch (e) {
      console.log(e);
      alerts("Deletion Error", "The image could not be deleted.", "warning");
    }
    setProcessing(0);
  };
  console.log(newImg);
  //update image
  const handleUpdate = (id) => {
    setId(id);
    if (imgUpdater) {
      imgUpdater.current.click();
    }
  };

  const handleNewImage = (e) => {
    const s = e.target.files[0];
    setNewImg(s);
    handleChangeImage();
  };

  const handleChangeImage = async () => {
    setProcessing(id);
    try {
      const link = await uploadImages(newImg);
      await axios.put(
        `https://calles-construction-back.onrender.com/api/images/update/${id}`,
        { link }
      );

      setEstado(!estado);
      alerts(
        "Image Modified",
        "The image has been modified successfully.",
        "success"
      );
    } catch (e) {
      alerts(
        "Modification Error",
        "The image could not be modified.",
        "warning"
      );
      console.log(e);
    }
    setProcessing(0);
  };

  return (
    <section className="gallery-compo" id="gallery">
      <h2>Gallery</h2>

      {/* botonera */}
      <div className="botonera">
        <a onClick={() => setRubro("Drywall")}>Drywall</a>
        <a onClick={() => setRubro("Painting")}>Painting</a>
        <a onClick={() => setRubro("Electrical")}>Electrical</a>
        <a onClick={() => setRubro("Carpentry")}>Carpentry</a>
        <a onClick={() => setRubro("Plumbing")}>Plumbing</a>
        <a onClick={() => setRubro("Utilities")}>Utilities</a>
      </div>

      {rubro && <h3>{rubro}</h3>}

      {/* imágenes */}
      {finalJobs.length > 0 &&
        finalJobs.map((img) => (
          <Image
            key={img.id}
            image={img}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            processing={processing}
          />
        ))}

      {/* form */}
      {user.id && (
        <>
          <figure onClick={() => setMore(!more)} className="more-button">
            <img src={more ? lessButton : moreButton} alt="less-button"></img>
          </figure>
          {more && (
            <div className="form-job">
              <form onSubmit={createImage}>
                <div className="field">
                  <label htmlFor="cat">Category</label>
                  <select
                    id="cat"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="drywall">Drywall</option>
                    <option value="painting">Painting</option>
                    <option value="electrical">Electrical</option>
                    <option value="carpentry">Carpentry</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="utilities">Utilities</option>
                  </select>
                </div>

                {divs.map((_, index) => (
                  <div key={index} className="field">
                    <label htmlFor="image">Image {index + 1}</label>
                    <input
                      id={`image-${index}`}
                      type="file"
                      onChange={(e) => {
                        const updatedImages = [...allImages];
                        updatedImages[index] = e.target.files[0];
                        setAllImages(updatedImages);
                      }}
                      required
                    />
                  </div>
                ))}

                <div className="moreLessImages">
                  {moreImages > 1 && (
                    <figure
                      onClick={() =>
                        setMoreImages(
                          moreImages > 1 ? moreImages - 1 : moreImages
                        )
                      }
                      className="more-button"
                    >
                      <img src={minus} alt="more-button"></img>
                    </figure>
                  )}

                  {moreImages < 15 && (
                    <figure
                      onClick={() =>
                        setMoreImages(
                          moreImages < 15 ? moreImages + 1 : moreImages
                        )
                      }
                      className="more-button"
                    >
                      <img src={plus} alt="more-button"></img>
                    </figure>
                  )}
                </div>

                {loading ? (
                  <div style={{ margin: "0 auto" }}>
                    <ReactLoading
                      type={"spin"}
                      color="#0f4c61"
                      height={50}
                      width={50}
                    />
                  </div>
                ) : (
                  <button type="submit">Send</button>
                )}
              </form>
            </div>
          )}
        </>
      )}

      {rubro && <TopButton />}

      <input
        ref={imgUpdater}
        id="imagen-updater"
        type="file"
        onChange={handleNewImage}
        style={{ display: "none" }}
      ></input>

      <UserModals
        isOpen={confirmBox}
        onClose={closeBox}
        onConfirm={confirmDelete}
        text={"Are you sure you want to delete this image?"}
      />
    </section>
  );
}

export default Gallery;
