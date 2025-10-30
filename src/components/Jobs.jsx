import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { alerts } from "../utils/alerts";
import { texts } from "../utilities/text";
import Text from "../commons/Text";
import Job from "../commons/Job";
import TopButton from "../commons/TopButton";
import UserModals from "../modals/UserModals";
import portadaJobs from "../assets/jobs-img.jpg";
import moreButton from "../assets/moreButton.svg";
import lessButton from "../assets/lessButton.svg";
import ReactLoading from "react-loading";
import plus from "../assets/plus.svg";
import minus from "../assets/minus.svg";
import { uploadImages, imagesDb } from "../utils/utils";
import { apiSegura } from "../utils/utils.js";

function Jobs({ serv }) {
  const user = useSelector((state) => state.user);
  const [jobs, setJobs] = useState({});
  const [rubro, setRubro] = useState(serv || "Drywall");
  const [finalJobs, setFinalJobs] = useState([]); //jobs filtrados
  const [estado, setEstado] = useState(false);
  const [more, setMore] = useState(false);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [allImages, setAllImages] = useState([]);
  const [moreImages, setMoreImages] = useState(1);
  const divs = Array.from({ length: moreImages });
  const [loading, setLoading] = useState(false);
  const [confirmBox, setConfirmBox] = useState(false);
  const [id, setId] = useState("");
  const [processing, setProcessing] = useState(null);
  const imgUpdater = useRef(null);
  const [newImg, setNewImg] = useState("");
  const [loading2, setLoading2] = useState(true);
  const openBox = () => setConfirmBox(true);
  const closeBox = () => setConfirmBox(false);

  //get all jobs
  useEffect(() => {
    axios
      .get("https://calles-construction-back.onrender.com/api/jobs")
      .then((resp) => {
        const jobsData = resp.data;
        const jobsWithImages = jobsData.map(async (job) => {
          const jid = job.id;
          const imagesResp = await apiSegura.get(
            `https://calles-construction-back.onrender.com/api/images/job/${jid}`
          );
          setLoading2(false);
          return { ...job, images: imagesResp.data };
        });

        Promise.all(jobsWithImages)
          .then((finalJobs) => setJobs(finalJobs))
          .catch((e) => console.log(e));
      })
      .catch((err) => console.log(err));
  }, [estado]);

  //filtrar
  useEffect(() => {
    if (jobs.length > 0) {
      setFinalJobs(
        jobs.filter((ele) => ele.category.toLowerCase() == rubro.toLowerCase())
      );
    }
  }, [rubro, jobs]);

  //select default value for category with rubro
  useEffect(() => {
    if (rubro) {
      setCategory(rubro.toLowerCase());
      setTitle("");
      setDesc("");
      setDate("");
      setAllImages([]);
      setMoreImages(1);
      setMore(false);
    }
  }, [rubro]);

  //create job
  //both data in jobs and images in gallery!
  const createJobs = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newJob = { title, description: desc, date, category };

      const { data } = await apiSegura.post(
        "https://calles-construction-back.onrender.com/api/jobs/create",
        { newJob }
      );

      console.log("data recibida luego de crear job", data[0]);

      for (let i = 0; i < allImages.length; i++) {
        const link = await uploadImages(allImages[i]);
        console.log("link de imagen", link);
        await imagesDb(link, category, data[0].id);
      }

      setEstado(!estado);
      alerts(
        "Job Uploaded",
        "The job have been uploaded successfully.",
        "success"
      );
      setMore(false);
      setMoreImages(1);
      setTitle("");
      setDesc("");
      setDate("");
      setAllImages([]);
    } catch (e) {
      console.log(e);
      alerts("Upload Error", "The job could not be uploaded.", "warning");
    }

    setLoading(false);
  };

  //delete job
  function handleDelete(id) {
    setId(id);
    openBox();
  }
  const confirmDelete = async () => {
    closeBox();
    setProcessing(id);
    try {
      await apiSegura.delete(
        `https://calles-construction-back.onrender.com/api/jobs/delete/${id}`
      );

      setEstado(!estado);
      alerts(
        "Job Deleted",
        "The job has been deleted successfully.",
        "success"
      );
    } catch (e) {
      console.log(e);
      alerts("Deletion Error", "The job could not be deleted.", "warning");
    }
    setProcessing(0);
  };
  //borra de la base y del front solo la primera vez, la seg solo de la base

  //update job
  const updateData = async (id, data) => {
    setProcessing(id);
    console.log("nueva data from updateDAte", data);
    try {
      await apiSegura.put(
        `https://calles-construction-back.onrender.com/api/jobs/update/${id}`,
        { data }
      );

      setEstado(!estado);
      alerts(
        "Job Modified",
        "The job has been modified successfully.",
        "success"
      );
    } catch (e) {
      alerts("Modification Error", "The job could not be modified.", "warning");
      console.log(e);
    }
    setProcessing(0);
  };

  //update image
  const updateImages = (id, sid) => {
    console.log("id del job que pidio mod imagen", sid);
    console.log("id de la imagen a mod", id);
    setProcessing(sid);
    setId(id);
    imgUpdater.current.click();
  };

  const handleNewImage = (e) => {
    const s = e.target.files[0];
    console.log("archivo recibido para mod", s);
    setNewImg(s);
    console.log("archivo newImg", newImg);
  };

  useEffect(() => {
    console.log("newImg dentro del useEffect", newImg);

    if (newImg) {
      handleChangeImage();
    }
  }, [newImg]);

  const handleChangeImage = async () => {
    try {
      console.log("cuando lega la img en handleChangeImage", newImg);
      const link = await uploadImages(newImg);
      await apiSegura.put(
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
    <section id="jobs" className="home">
      <h2>Jobs</h2>
      <figure className="jobs-img">
        <img src={portadaJobs} alt="jobs-img" />
      </figure>

      <Text text={texts[0]} />

      <p
        style={{
          fontWeight: "600",
          color: "#0f4c61",
        }}
        className="category-title"
      >
        Select a category
      </p>

      <div className="botonera">
        <a onClick={() => setRubro("Drywall")}>Drywall</a>
        <a onClick={() => setRubro("Painting")}>Painting</a>
        <a onClick={() => setRubro("Electrical")}>Electrical</a>
        <a onClick={() => setRubro("Carpentry")}>Carpentry</a>
        <a onClick={() => setRubro("Plumbing")}>Plumbing</a>
        <a onClick={() => setRubro("Utilities")}>Utilities</a>
      </div>

      {rubro && <h2 className="rubro-title">{rubro}</h2>}

      {loading2 ? (
        <div style={{ margin: "0 auto" }}>
          <ReactLoading
            type={"spin"}
            color="#0f4c61"
            height={50}
            width={50}
            style={{ maringTop: "1rem" }}
          />
        </div>
      ) : (
        finalJobs.length > 0 &&
        finalJobs.map((job, i) => (
          <Job
            key={job.id}
            indice={i}
            service={job}
            deleteFun={handleDelete}
            updateData={updateData}
            processing={processing}
            updateImages={updateImages}
          />
        ))
      )}
      {user.id && (
        <>
          <div className="more-button">
            <figure onClick={() => setMore(!more)} className="more-button">
              <img src={more ? lessButton : moreButton} alt="less-button"></img>
            </figure>
          </div>
          {more && (
            <div className="form-job">
              <form onSubmit={createJobs}>
                <div className="field">
                  <label htmlFor="title">Title</label>
                  <input
                    id="title"
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    required
                    maxLength={25}
                    placeholder="title"
                  />
                </div>
                <div className="field">
                  <label htmlFor="date">Date</label>
                  <input
                    id="date"
                    type="date"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="desc">Description</label>
                  <textarea
                    id="desc"
                    type="text"
                    onChange={(e) => setDesc(e.target.value)}
                    value={desc}
                    required
                    rows={5}
                    maxLength={240}
                    placeholder="description"
                  />
                </div>
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

      <UserModals
        isOpen={confirmBox}
        onClose={closeBox}
        onConfirm={confirmDelete}
        text={"Are you sure you want to delete this job?"}
      />

      <input
        ref={imgUpdater}
        id="imagen-updater"
        type="file"
        onChange={(e) => handleNewImage(e)}
        style={{ display: "none" }}
      ></input>
    </section>
  );
}

export default Jobs;
