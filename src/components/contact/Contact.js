import React, { useState, useRef } from "react";
import Title from "../layouts/Title";
import ContactLeft from "./ContactLeft";

// Google Form: create a form at forms.google.com with fields (name, phone, email, subject, message).
// Use the /e/FORM_ID from the form's "Send" link. Get entry IDs via "Get pre-filled link" (⋮) or view form source.
const GOOGLE_FORM_ACTION =
  process.env.REACT_APP_GOOGLE_FORM_ACTION ||
  "https://docs.google.com/forms/d/e/1FAIpQLSe4pkUHoRG7lTMj8eCM7VglhR6IpF8qgyjTlNjM43Mi3E5ehQ/formResponse";
const ENTRY_IDS = {
  name: process.env.REACT_APP_GF_ENTRY_NAME || "entry.402142467",
  phone: process.env.REACT_APP_GF_ENTRY_PHONE || "entry.2125331410",
  email: process.env.REACT_APP_GF_ENTRY_EMAIL || "entry.1876758487",
  subject: process.env.REACT_APP_GF_ENTRY_SUBJECT || "entry.2064560768",
  message: process.env.REACT_APP_GF_ENTRY_MESSAGE || "entry.1498634018",
};

const Contact = () => {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const googleFormRef = useRef(null);
  const hiddenIframeRef = useRef(null);

  // ========== Email Validation start here ==============
  const emailValidation = () => {
    return String(email)
      .toLocaleLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };
  // ========== Email Validation end here ================

  const handleSend = (e) => {
    e.preventDefault();
    if (username === "") {
      setErrMsg("Username is required!");
    } else if (phoneNumber === "") {
      setErrMsg("Phone number is required!");
    } else if (email === "") {
      setErrMsg("Please give your Email!");
    } else if (!emailValidation(email)) {
      setErrMsg("Give a valid Email!");
    } else if (subject === "") {
      setErrMsg("Please give your Subject!");
    } else if (message === "") {
      setErrMsg("Message is required!");
    } else {
      // Submit to Google Form via hidden form + iframe (avoids CORS)
      if (googleFormRef.current && GOOGLE_FORM_ACTION.includes("formResponse")) {
        const form = googleFormRef.current;
        form.action = GOOGLE_FORM_ACTION;
        form.elements[ENTRY_IDS.name].value = username;
        form.elements[ENTRY_IDS.phone].value = phoneNumber;
        form.elements[ENTRY_IDS.email].value = email;
        form.elements[ENTRY_IDS.subject].value = subject;
        form.elements[ENTRY_IDS.message].value = message;
        form.submit();
      }
      setSuccessMsg(
        `Thank you dear ${username}, Your message has been sent successfully!`
      );
      setErrMsg("");
      setUsername("");
      setPhoneNumber("");
      setEmail("");
      setSubject("");
      setMessage("");
    }
  };
  return (
    <section
      id="contact"
      className="w-full py-20 border-b-[1px] border-b-black"
    >
      <div className="flex justify-center items-center text-center">
        <Title title="CONTACT" des="Contact With Me" />
      </div>
      <div className="w-full">
        <div className="w-full h-auto flex flex-col lgl:flex-row items-stretch justify-between">
          <ContactLeft />
          <div className="w-full lgl:w-[60%] h-full py-10 bg-gradient-to-r from-[#1e2024] to-[#23272b] flex flex-col gap-8 p-4 lgl:p-8 rounded-lg shadow-shadowOne">
            {/* Hidden form POSTs to Google Forms; response loads in iframe to avoid CORS */}
            <form
              ref={googleFormRef}
              action={GOOGLE_FORM_ACTION}
              method="POST"
              target="google-form-iframe"
              style={{ display: "none" }}
            >
              <input name={ENTRY_IDS.name} type="text" />
              <input name={ENTRY_IDS.phone} type="text" />
              <input name={ENTRY_IDS.email} type="text" />
              <input name={ENTRY_IDS.subject} type="text" />
              <input name={ENTRY_IDS.message} type="text" />
            </form>
            <iframe
              ref={hiddenIframeRef}
              name="google-form-iframe"
              title="Form submission"
              style={{ position: "absolute", width: 0, height: 0, border: 0 }}
            />
            <form className="w-full flex flex-col gap-4 lgl:gap-6 py-2 lgl:py-5">
              {errMsg && (
                <p className="py-3 bg-gradient-to-r from-[#1e2024] to-[#23272b] shadow-shadowOne text-center text-orange-500 text-base tracking-wide animate-bounce">
                  {errMsg}
                </p>
              )}
              {successMsg && (
                <p className="py-3 bg-gradient-to-r from-[#1e2024] to-[#23272b] shadow-shadowOne text-center text-green-500 text-base tracking-wide animate-bounce">
                  {successMsg}
                </p>
              )}
              <div className="w-full flex flex-col lgl:flex-row gap-10">
                <div className="w-full lgl:w-1/2 flex flex-col gap-4">
                  <p className="text-sm text-gray-400 uppercase tracking-wide">
                    Your name
                  </p>
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    className={`${
                      errMsg === "Username is required!" &&
                      "outline-designColor"
                    } contactInput`}
                    type="text"
                  />
                </div>
                <div className="w-full lgl:w-1/2 flex flex-col gap-4">
                  <p className="text-sm text-gray-400 uppercase tracking-wide">
                    Phone Number
                  </p>
                  <input
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phoneNumber}
                    className={`${
                      errMsg === "Phone number is required!" &&
                      "outline-designColor"
                    } contactInput`}
                    type="text"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-sm text-gray-400 uppercase tracking-wide">
                  Email
                </p>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className={`${
                    errMsg === "Please give your Email!" &&
                    "outline-designColor"
                  } contactInput`}
                  type="email"
                />
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-sm text-gray-400 uppercase tracking-wide">
                  Subject
                </p>
                <input
                  onChange={(e) => setSubject(e.target.value)}
                  value={subject}
                  className={`${
                    errMsg === "Please give your Subject!" &&
                    "outline-designColor"
                  } contactInput`}
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-sm text-gray-400 uppercase tracking-wide">
                  Message
                </p>
                <textarea
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  className={`${
                    errMsg === "Message is required!" && "outline-designColor"
                  } contactTextArea`}
                  cols="30"
                  rows="8"
                ></textarea>
              </div>
              <div className="w-full">
                <button
                  onClick={handleSend}
                  className="w-full h-12 bg-[#141518] rounded-lg text-base text-gray-400 tracking-wider uppercase hover:text-white duration-300 hover:border-[1px] hover:border-designColor border-transparent"
                >
                  Send Message
                </button>
              </div>
              {errMsg && (
                <p className="py-3 bg-gradient-to-r from-[#1e2024] to-[#23272b] shadow-shadowOne text-center text-orange-500 text-base tracking-wide animate-bounce">
                  {errMsg}
                </p>
              )}
              {successMsg && (
                <p className="py-3 bg-gradient-to-r from-[#1e2024] to-[#23272b] shadow-shadowOne text-center text-green-500 text-base tracking-wide animate-bounce">
                  {successMsg}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
