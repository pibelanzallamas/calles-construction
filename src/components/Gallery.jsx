import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Image from "../commons/Image";
import TopButton from "../commons/TopButton";
import moreButton from "../assets/moreButton.svg";
import lessButton from "../assets/lessButton.svg";
import images from "../utilities/gallery";

function Gallery() {
  const user = useSelector((state) => state.user);
  const [image, setImage] = useState(""); //input
  const [desc, setDesc] = useState(""); //input
  const [loading, setLoading] = useState(false);
  const [more, setMore] = useState(false);
  const [gallery, setGallery] = useState({}); //all images
  const [estado, setEstado] = useState(false); //state listener

  //get images

  //upload images
  function createImage() {}

  //delete images

  return (
    <section className="jobs-compo gallery-compo gallery-gap" id="gallery">
      <h2>Gallery</h2>

      {images.map((img, i) => (
        <div className="image-card" key={i} id={i}>
          <figure>
            <img src={img.url} className="job-img" />
          </figure>
          <p>{img.desc}</p>
        </div>
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
