import React from "react";
import Text from "../commons/Text";
import Job from "../commons/Job";
import { services } from "../utilities/services";
import jobs from "../assets/jobs-img.jpg";
import TopButton from "../commons/TopButton";
import { useSelector } from "react-redux";

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

  return (
    <section id="jobs" className="jobs-compo">
      <h2>Jobs</h2>

      <figure className="jobs-img">
        <img src={jobs} alt="jobs-img" />
      </figure>

      <Text text={texts[0]} />

      <Job service={services[0]} />

      <Job service={services[1]} />

      <Job service={services[2]} />

      <Text text={texts[1]} />

      <Job service={services[3]} />

      <Job service={services[4]} />

      <Job service={services[5]} />

      <TopButton />
    </section>
  );
}

export default Jobs;
