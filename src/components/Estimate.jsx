import React, { useState } from "react";
import emailjs from "emailjs-com";
import { alerts } from "../utils/alerts";
import ReactLoading from "react-loading";

function Estimate() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
  const USER_ID = import.meta.env.VITE_USER_ID;

  const handleForm = async (e) => {
    e.preventDefault();

    setSending(true);

    const templateParams = {
      from_name: name,
      from_email: email,
      number: number,
      message: message,
      reply_to: email,
    };

    console.log(SERVICE_ID, TEMPLATE_ID, USER_ID);

    try {
      const res = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        USER_ID
      );

      if (res) {
        alerts(
          "Thanks!",
          "You will get a response as soon as posible!",
          "success"
        );

        setNumber("");
        setEmail("");
        setName("");
        setMessage("");
        setSending(false);
      } else {
        alerts("Sorry!", "Please contact me in another way!", "warning");
      }
    } catch (e) {
      alerts("Sorry!", "Please contact me in another way!", "warning");
      console.log(e);
    }
    setSending(false);
  };

  return (
    <section id="estimate" className="estimate-compo">
      <h2>Ask me</h2>

      <form onSubmit={handleForm}>
        <div className="field">
          <label htmlFor="name">Your Name</label>
          <input
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            type="text"
            maxLength={25}
          ></input>
        </div>
        <div className="field">
          <label htmlFor="email">Your Email</label>
          <input
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            maxLength={30}
          ></input>
        </div>
        <div className="field">
          <label htmlFor="number">Your Number</label>
          <input
            id="number"
            name="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
            type="number"
            max={999999999999999}
            min={1111}
          ></input>
        </div>
        <div className="field">
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={4}
            maxLength={400}
          ></textarea>
        </div>
        <div className="estimate-button">
          {sending ? (
            <div style={{ margin: "0 auto" }}>
              <ReactLoading
                type={"spin"}
                color="#0f4c61"
                height={50}
                width={50}
              />
            </div>
          ) : (
            <button type="submit">Get Estimate</button>
          )}
        </div>
      </form>
    </section>
  );
}

export default Estimate;
