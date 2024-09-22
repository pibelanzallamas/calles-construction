import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { alerts } from "../utils/alerts";
import axios from "axios";
import TopButton from "../commons/TopButton";
import Image from "../commons/Image";
import moreButton from "../assets/moreButton.svg";
import lessButton from "../assets/lessButton.svg";
import UserModals from "../modals/UserModals";
import ReactLoading from "react-loading";
import plus from "../assets/plus.svg";
import minus from "../assets/minus.svg";

function Gallery() {
  const user = useSelector((state) => state.user);
  const [image, setImage] = useState(null); //input
  const [gallery, setGallery] = useState([]); //all images
  const [loading, setLoading] = useState(false);
  const [more, setMore] = useState(false);
  const [estado, setEstado] = useState(false); //state listener
  const [confirmBox, setConfirmBox] = useState(false);
  const [jid, setJid] = useState({});
  const [rubro, setRubro] = useState("");
  const [finalJobs, setFinalJobs] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const [moreImages, setMoreImages] = useState(1);

  const divs = Array.from({ length: moreImages });
  const [category, setCategory] = useState("");
  const [allImages, setAllImages] = useState([]);

  const openBox = () => setConfirmBox(true);
  const closeBox = () => setConfirmBox(false);

  function handleDelete(id) {
    setJid(id);
    openBox();
  }

  //get images
  useEffect(() => {
    axios
      .get("https://calles-construction-back.onrender.com/api/images/")
      .then((resp) => setGallery(resp.data))
      .catch((err) => console.log(err));
  }, [estado, rubro]);

  console.log(gallery);

  //upload images to cloud
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

  //upload images into db
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

  //upload images manager
  const createImage = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      for (let i = 0; i < allImages.length; i++) {
        const link = await uploadImages(allImages[i]);
        await imagesDb(link, category, 848484);
      }

      setEstado(!estado);
      alerts(
        "Image Uploaded",
        "The image(s) have been uploaded successfully.",
        "success"
      );
    } catch (e) {
      alerts("Upload Error", "The image(s) could not be uploaded.", "warning");
      console.log(e);
    }

    setImage(null);
    setLoading(false);
  };

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

  //select default value
  useEffect(() => {
    if (rubro) {
      setCategory(rubro.toLowerCase());
    }
  }, [rubro]);

  //delete images
  const confirmDelete = async () => {
    setDeleting(true);
    try {
      const res = await axios.delete(
        `https://calles-construction-back.onrender.com/api/images/delete/${jid}`
      );

      if (res.data) {
        setEstado(!estado);
        alerts("Okey!", "Image erased successfuly", "success");
      } else {
        alerts("Sorry!", "Image couldn't be erased", "warning");
      }
    } catch (e) {
      console.log(e);
      alerts("Sorry!", "Image couldn't be erased", "danger");
    }
    closeBox();
    setDeleting(false);
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
          <>
            <Image
              disparador={() => setEstado(!estado)}
              image={img}
              handleDelete={handleDelete}
            />
            {deleting && (
              <ReactLoading
                type={"spin"}
                color="#0f4c61"
                height={50}
                width={50}
              />
            )}
          </>
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
                      id="image"
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
                  <p className="loading-text"> Loading ...</p>
                ) : (
                  <button type="submit">Send</button>
                )}
              </form>
            </div>
          )}
        </>
      )}

      {rubro && <TopButton />}

      <UserModals
        isOpen={confirmBox}
        onClose={closeBox}
        onConfirm={confirmDelete}
        text={"You sure you want to delete this picture?"}
      />
    </section>
  );
}

export default Gallery;
