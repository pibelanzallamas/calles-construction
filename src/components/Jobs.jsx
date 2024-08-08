import React, { useState } from "react";
import Text from "../commons/Text";
import Job from "../commons/Job";
import { useSelector } from "react-redux";
import { services } from "../utilities/services";
import jobs from "../assets/jobs-img.jpg";
import TopButton from "../commons/TopButton";

function Jobs() {
  const texts = [
    {
      title: "Philosophy",
      desc: "We are a solid group that cares for each other, cares about the work and cares about the people who hired us. We pay attention to details because we believe those are the most important things.",
    },
    {
      title: "Methodology",
      desc: "We ensure quality by using top-notch materials, maintaining clear communication, adhering to safety standards, and delivering timely results with attention to team work.",
    },
  ];
  const user = useSelector((state) => state.user);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");

  return (
    <section id="jobs" className="jobs-compo">
      <h2>Jobs</h2>

      <form onSubmit={handleLogin}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            maxLength={40}
            placeholder="email"
          />
        </div>
        <div className="field">
          <div className="peak-line">
            <label>Password</label>
            <figure onClick={handlePeak}>
              <img src={peak ? eyeOpen : eyeClose}></img>
            </figure>
          </div>
          <input
            type={peak ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            maxLength={20}
            placeholder="password"
          />
        </div>
        {loading ? (
          <p className="loading-text"> Loading ...</p>
        ) : (
          <button type="submit">Send</button>
        )}
      </form>

      {/* <figure className="jobs-img">
        <img src={jobs} alt="jobs-img" />
      </figure> */}

      {/* {jobs.length > 0 && jobs.map(())} */}

      {/* <Text text={texts[0]} />

      <Job service={services[0]} />

      <Job service={services[1]} />

      <Job service={services[2]} />

      <Text text={texts[1]} />

      <Job service={services[3]} />

      <Job service={services[4]} />

      <Job service={services[5]} /> */}

      <TopButton />
    </section>
  );
}

export default Jobs;
