import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { alerts } from "../utils/alerts";
import axios from "axios";
import TopButton from "../commons/TopButton";
import moreButton from "../assets/moreButton.svg";
import lessButton from "../assets/lessButton.svg";
import trash from "../assets/trash.svg";
import UserModals from "../modals/UserModals";
import { services } from "../utilities/services";
import { fakeGallery } from "../utilities/gallery";

function Gallery() {
  const user = useSelector((state) => state.user);
  const [image, setImage] = useState(null); //input
  const [desc, setDesc] = useState(""); //input
  const [gallery, setGallery] = useState({}); //all images
  const [loading, setLoading] = useState(false);
  const [more, setMore] = useState(false);
  const [estado, setEstado] = useState(false); //state listener
  const [confirmBox, setConfirmBox] = useState(false);
  const [jid, setJid] = useState({});
  const [rubro, setRubro] = useState("");
  const [finalJobs, setFinalJobs] = useState([]);

  const openBox = () => setConfirmBox(true);
  const closeBox = () => setConfirmBox(false);

  function handleDelete(id) {
    setJid(id);
    openBox();
  }

  //filtrar
  useEffect(() => {
    if (rubro) {
      const filter1 = services.filter(
        (ele) => ele.category == rubro.toLowerCase()
      );
      const filter2 = fakeGallery.filter(
        (ele) => ele.category == rubro.toLowerCase()
      );

      setFinalJobs(filter1.concat(filter2));
    } else {
      setFinalJobs(fakeGallery);
    }
  }, [rubro]);

  //get images
  useEffect(() => {
    axios
      .get("https://calles-construction-back.onrender.com/api/images/")
      .then((resp) => setGallery(resp.data))
      .catch((err) => console.log(err));
  }, [estado]);

  //upload images
  const createImage = async (e) => {
    e.preventDefault();
    const f = new FormData();
    f.append("file", image);
    f.append("upload_preset", "nfi9e7vs");
    f.append("api_key", import.meta.env.VITE_API_KEY);
    setLoading(true);

    try {
      const url = await axios.post(
        "https://api.cloudinary.com/v1_1/dh71ewqgp/image/upload",
        f
      );

      const res = await axios.post(
        "https://calles-construction-back.onrender.com/api/images/create",
        {
          image: url.data.secure_url,
          description: desc,
        }
      );

      alerts("Okey!", "Image upload successfuly", "success");
      setEstado(!estado);
    } catch (e) {
      console.log(e);
      alerts("Sorry!", "Image couldn't be uploaded", "danger");
    }

    setDesc("");
    setImage(null);
    setLoading(false);
  };

  //delete images
  const confirmDelete = async () => {
    try {
      const res = await axios.delete(
        `https://calles-construction-back.onrender.com/api/images/delete/${jid}`
      );

      alerts("Okey!", "Image erased successfuly", "success");
      setEstado(!estado);
    } catch (e) {
      console.log(e);
      alerts("Sorry!", "Image couldn't be erased", "danger");
    }
    closeBox();
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
        finalJobs.map((img, i) => (
          <div className="image-card" key={i} id={img.id}>
            <div className="gallery-image">
              <figure>
                <img src={img.image} className="job-img" />
              </figure>
              {user.id && (
                <figure onClick={() => handleDelete(img.id)}>
                  <img src={trash} alt="trash-icon" />
                </figure>
              )}
            </div>
            {/* <p>{img.description}</p> */}
          </div>
        ))}

      {/* form */}
      {user.id && (
        <>
          <div className="more-button">
            {more ? (
              <figure onClick={() => setMore(false)} className="more-button">
                <img src={lessButton} alt="less-button"></img>
              </figure>
            ) : (
              <figure onClick={() => setMore(true)} className="more-button">
                <img src={moreButton} alt="more-button"></img>
              </figure>
            )}
          </div>
          {more && (
            <div className="form-job">
              <form onSubmit={createImage}>
                <div className="field">
                  <label htmlFor="image">Image</label>
                  <input
                    id="image"
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    type="text"
                    onChange={(e) => setDesc(e.target.value)}
                    value={desc}
                    rows={3}
                    maxLength={40}
                    placeholder="description"
                    required
                  />
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
      <TopButton />
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
