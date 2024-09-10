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
import { services } from "../utilities/services";
import { fakeGallery } from "../utilities/gallery";
import ReactLoading from "react-loading";
import plus from "../assets/plus.svg";
import minus from "../assets/minus.svg";

function Gallery() {
  const user = useSelector((state) => state.user);
  const [image, setImage] = useState(null); //input
  const [gallery, setGallery] = useState({}); //all images
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

  const openBox = () => setConfirmBox(true);
  const closeBox = () => setConfirmBox(false);

  function handleDelete(id) {
    setJid(id);
    openBox();
  }

  //filtrar
  useEffect(() => {
    const filter1 = services.filter(
      (ele) => ele.category == rubro.toLowerCase()
    );
    const filter2 = fakeGallery.filter(
      (ele) => ele.category == rubro.toLowerCase()
    );

    setFinalJobs(filter2.concat(filter1));
  }, [rubro, gallery]); // si se modifica gallery se vuelve afiltrar

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
          description: "desc",
        }
      );

      alerts("Okey!", "Image upload successfuly", "success");
      setEstado(!estado);
    } catch (e) {
      console.log(e);
      alerts("Sorry!", "Image couldn't be uploaded", "danger");
    }

    setImage(null);
    setLoading(false);
  };

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
              key={img.id}
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
          {more ? (
            <figure onClick={() => setMore(false)} className="more-button">
              <img src={lessButton} alt="less-button"></img>
            </figure>
          ) : (
            <figure onClick={() => setMore(true)} className="more-button">
              <img src={moreButton} alt="more-button"></img>
            </figure>
          )}
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
                    <option value="Drywall">Drywall</option>
                    <option value="Painting">Painting</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Carpentry">Carpentry</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Utilities">Utilities</option>
                  </select>
                </div>

                {divs.map((_, index) => (
                  <div key={index} className="field">
                    <label htmlFor="image">Image {index + 1}</label>
                    <input
                      id="image"
                      type="file"
                      onChange={(e) => setImage(e.target.files[0])}
                      required
                    />
                  </div>
                ))}

                <div className="moreLessImages">
                  <figure
                    onClick={() => setMoreImages(moreImages - 1)}
                    className="more-button"
                  >
                    <img src={minus} alt="more-button"></img>
                  </figure>

                  <figure
                    onClick={() => setMoreImages(moreImages + 1)}
                    className="more-button"
                  >
                    <img src={plus} alt="more-button"></img>
                  </figure>
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
