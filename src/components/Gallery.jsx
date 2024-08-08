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

function Gallery() {
  const user = useSelector((state) => state.user);

  return (
    <div className="gallery-compo" id="gallery">
      <h2>Gallery</h2>
      <figure>
        <img src={pic} alt="pic1" />
      </figure>
      <figure>
        <img src={pic3} alt="pic3" />
      </figure>
      <figure>
        <img src={pic4} alt="pic4" />
      </figure>
      <figure>
        <img src={pic6} alt="pic6" />
      </figure>
      <figure>
        <img src={pic2} alt="pic1" />
      </figure>
      <figure>
        <img src={pic8} alt="pic8" />
      </figure>
      <figure>
        <img src={pic5} alt="pic3" />
      </figure>
      <TopButton />
    </div>
  );
}

export default Gallery;
