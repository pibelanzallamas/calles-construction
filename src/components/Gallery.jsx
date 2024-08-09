import React from "react";
import pic from "../assets/gallery1.jpg";
import pic2 from "../assets/gallery-carpentry.jpeg";
import pic5 from "../assets/gallery5.jpg";
import pic3 from "../assets/gallery3.jpg";
import pic4 from "../assets/gallery-painting.jpeg";
import pic6 from "../assets/gallery-paintings-2.jpeg";
import pic8 from "../assets/gallery-electrician.jpeg";
import TopButton from "../commons/TopButton";
import { useSelector } from "react-redux";
import { images } from "../utilities/gallery";
import moreButton from "../assets/moreButton.svg";
import lessButton from "../assets/lessButton.svg";
import axios from "axios";
import { useEffect, useState } from "react";

function Gallery() {
  const user = useSelector((state) => state.user);
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [more, setMore] = useState(false);
  const [gallery, setGallery] = useState({});
  const [estado, setEstado] = useState(false);

  //get images

  //upload images
  function createImage() {}

  //delete images

  return (
    <section className="jobs-compo" id="gallery">
      <h2>Gallery</h2>
      {images.map((image) => (
        <figure>
          <img src={image.url} alt={image.url} />
        </figure>
      ))}

      {user.id && (
        <>
          {more ? (
            <figure onClick={() => setMore(false)} className="less-button">
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
                  <label>Image</label>
                  <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                  />
                </div>
                <div className="field">
                  <label>Description</label>
                  <textarea
                    type="text"
                    onChange={(e) => setDesc(e.target.value)}
                    value={desc}
                    required
                    rows={3}
                    maxLength={140}
                    placeholder="description"
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
    </section>
  );
}

export default Gallery;
