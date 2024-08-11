import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Image from "../commons/Image";
import TopButton from "../commons/TopButton";
import moreButton from "../assets/moreButton.svg";
import lessButton from "../assets/lessButton.svg";
import trash from "../assets/trash.svg";
import images from "../utilities/gallery";

function Gallery() {
  const user = useSelector((state) => state.user);
  const [image, setImage] = useState(""); //input
  const [desc, setDesc] = useState(""); //input
  const [gallery, setGallery] = useState({}); //all images
  const [loading, setLoading] = useState(false);
  const [more, setMore] = useState(false);
  const [estado, setEstado] = useState(false); //state listener

  //get images

  //upload images
  function createImage() {}

  //delete images
  function handleDelete() {}

  return (
    <section className="gallery-compo" id="gallery">
      <h2>Gallery</h2>

      {images.map((img, i) => (
        <div className="image-card" key={i} id={i}>
          <div className="gallery-image">
            <figure>
              <img src={img.url} className="job-img" />
            </figure>
            {user.id && (
              <figure onClick={handleDelete}>
                <img src={trash} alt="trash-icon" />
              </figure>
            )}
          </div>
          <p>{img.desc}</p>
        </div>
      ))}

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
