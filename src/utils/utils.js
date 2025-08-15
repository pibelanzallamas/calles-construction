import axios from "axios";

//upload image to the cloud
export const uploadImages = async (pic) => {
  //las funciones async siempre van a devolver una promesa
  const f = new FormData();
  f.append("file", pic);
  f.append("upload_preset", "calles_preset_images");
  f.append("api_key", import.meta.env.VITE_API_KEY);

  try {
    const { data } = await axios.post(
      "https://api.cloudinary.com/v1_1/daynclfo8/image/upload",
      f
    );
    return data.secure_url;
  } catch (e) {
    console.log(e);
    throw new Error("Failed to upload image to the cloud");
  }
};

//upload image to the database   --> devuleve true
export const imagesDb = async (link, category, jid) => {
  try {
    await axios.post(
      "https://calles-construction-back.onrender.com/api/images/create",
      {
        image: link,
        category,
        jid,
      }
    );

    return true;
  } catch (e) {
    console.log(e);
    throw new Error("Failed to upload image to the database");
  }
};
