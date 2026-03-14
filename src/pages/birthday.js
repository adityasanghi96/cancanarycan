import { useGSAP } from "@gsap/react"; // Import useGSAP hook
import gsap from "gsap";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import balloon1 from "../assets/birthday/ballon1.png";
import balloon2 from "../assets/birthday/ballon2.png";
import balloon3 from "../assets/birthday/ballon3.png";
import can from "../assets/birthday/can.png";
import hat from "../assets/birthday/hat.png";
import SEO from "../components/seo/SEO";
const balloons = [balloon1, balloon2, balloon3];

gsap.registerPlugin(useGSAP);

const Birthday = () => {
  // Refs for accessing DOM elements
  const containerRef = useRef();
  const textBoxCharsRef = useRef();
  const hbdRef = useRef();
  const replyBtnRef = useRef();
  const navigate = useNavigate();

  // Define the animations using useGSAP
  useGSAP(
    () => {
      // GSAP code here...

      // Split text into animated spans
      gsap.set(textBoxCharsRef.current, {
        innerHTML: `<span>${textBoxCharsRef.current.innerHTML
          .split("")
          .join("</span><span>")}</span>`,
      });

      gsap.set(hbdRef.current, {
        innerHTML: `<span>${hbdRef.current.innerHTML
          .split("")
          .join("</span><span>")}</span>`,
      });

      const ideaTextTrans = {
        opacity: 0,
        y: -20,
        rotationX: 5,
        skewX: "15deg",
      };

      const ideaTextTransLeave = {
        opacity: 0,
        y: 20,
        rotationY: 5,
        skewX: "-15deg",
      };

      // Create the animation timeline
      const tl = gsap.timeline();

      tl.to(containerRef.current, { visibility: "visible", duration: 0.1 })
        .from(".one", { opacity: 0, y: 10, duration: 0.7 })
        .from(".two", { opacity: 0, y: 10, duration: 0.4 })
        .to(".one", { opacity: 0, y: 10, duration: 0.7 }, "+=2.5")
        .to(".two", { opacity: 0, y: 10, duration: 0.7 }, "-=1")
        .from(".three", { opacity: 0, y: 10, duration: 0.7 })
        .to(".three", { opacity: 0, y: 10, duration: 0.7 }, "+=2")
        .from(".four", { scale: 0.2, opacity: 0, duration: 0.7 })
        .from(".fake-btn", { scale: 0.2, opacity: 0, duration: 0.3 })
        .to(".hbd-chatbox span", { visibility: "visible", stagger: 0.05 })
        .to(".fake-btn", {
          backgroundColor: "rgb(127, 206, 248)",
          duration: 0.1,
        })
        .to(
          ".four",
          { scale: 0.2, opacity: 0, y: -150, duration: 0.5 },
          "+=0.7"
        )
        .from(".idea-1", { ...ideaTextTrans, duration: 0.7 })
        .to(".idea-1", { ...ideaTextTransLeave, duration: 0.7 }, "+=1.5")
        .from(".idea-2", { ...ideaTextTrans, duration: 0.7 })
        .to(".idea-2", { ...ideaTextTransLeave, duration: 0.7 }, "+=1.5")
        .from(".idea-3", { ...ideaTextTrans, duration: 0.7 })
        .to(".idea-3 strong", {
          scale: 1.2,
          x: 10,
          backgroundColor: "rgb(21, 161, 237)",
          color: "#fff",
          duration: 0.5,
        })
        .to(".idea-3", { ...ideaTextTransLeave, duration: 0.7 }, "+=1.5")
        .from(".idea-4", { ...ideaTextTrans, duration: 0.7 })
        .to(".idea-4", { ...ideaTextTransLeave, duration: 0.7 }, "+=1.5")
        .from(
          ".idea-5",
          {
            rotationX: 15,
            rotationZ: -10,
            skewY: "-5deg",
            y: 50,
            z: 10,
            opacity: 0,
            duration: 0.7,
          },
          "+=0.5"
        )
        .to(
          ".idea-5 .smiley",
          {
            rotation: 90,
            x: 8,
            duration: 0.7,
          },
          "+=0.4"
        )
        .to(
          ".idea-5",
          {
            scale: 0.2,
            opacity: 0,
            duration: 0.7,
          },
          "+=2"
        )
        .from(".idea-6 span", {
          scale: 3,
          opacity: 0,
          rotation: 15,
          ease: "expo.out",
          stagger: 0.2,
          duration: 0.8,
        })
        .to(
          ".idea-6 span",
          {
            scale: 3,
            opacity: 0,
            rotation: -15,
            ease: "expo.out",
            stagger: 0.2,
            duration: 0.8,
          },
          "+=1"
        )
        .fromTo(
          ".baloons img",
          { opacity: 0.9, y: 1400 },
          { opacity: 1, y: -1000, stagger: 0.2, duration: 2.5 }
        )
        .from(
          ".lydia-dp",
          {
            scale: 3.5,
            opacity: 0,
            x: 25,
            y: -25,
            rotationZ: -45,
            duration: 0.5,
          },
          "-=2"
        )
        .from(".hat", {
          x: -100,
          y: 350,
          rotation: -180,
          opacity: 0,
          duration: 0.5,
        })
        .from(".wish-hbd span", {
          opacity: 0,
          y: -50,
          rotation: 150,
          skewX: "30deg",
          ease: "elastic.out(1, 0.5)",
          stagger: 0.1,
          duration: 0.7,
        })
        .fromTo(
          ".wish-hbd span",
          { scale: 1.4, rotationY: 150 },
          {
            scale: 1,
            rotationY: 0,
            color: "#ff69b4",
            ease: "expo.out",
            duration: 8,
          },
          "party"
        )
        .from(
          ".wish h5",
          {
            opacity: 0,
            y: 10,
            skewX: "-15deg",
            duration: 0.5,
          },
          "party"
        )
        .to(".eight svg", {
          visibility: "visible",
          opacity: 0,
          scale: 80,
          repeat: 3,
          repeatDelay: 1.4,
          stagger: 0.3,
          duration: 1.5,
        })
        .to(".six", { opacity: 0, y: 30, zIndex: "-1", duration: 0.5 })
        .from(".nine p", { ...ideaTextTrans, duration: 1, stagger: 1.2 })
        .to(".last-smile", { rotation: 90, duration: 0.5 }, "+=1");

      // Restart animation on click
      replyBtnRef.current.addEventListener("click", () => {
        navigate("/pac-can");
      });

      // Cleanup function to remove the event listener
      return () => {
        replyBtnRef.current.removeEventListener("click", () => {
          tl.restart();
        });
      };
    },
    { scope: containerRef }
  ); // Use containerRef as scope

  return (
    <>
    <SEO title="Canary | CanCanaryCan | Birthday Wish"/>
    <div className="container" ref={containerRef}>
      <div className="one">
        <h1 className="one">
          <span data-node-name="greeting">Hey</span>
          <span data-node-name="name" className="pl-3">
            Can
          </span>
        </h1>
        <p className="two" data-node-name="greetingText">
          We really like you and your streams
        </p>
      </div>
      <div className="three">
        <p data-node-name="text1">It's your birthday!!! :D</p>
      </div>
      <div className="four">
        <div className="text-box">
          <p
            className="hbd-chatbox"
            data-node-name="textInChatBox"
            ref={textBoxCharsRef}
          >
            Happy birthday to you!! Yeee! Many many happy blah...
          </p>
          <p className="fake-btn" data-node-name="sendButtonLabel">
            Send
          </p>
        </div>
      </div>
      <div className="five">
        <p className="idea-1" data-node-name="text2">
          That's what we were going to do.
        </p>
        <p className="idea-2" data-node-name="text3">
          But then we stopped.
        </p>
        <p className="idea-3">
          <span data-node-name="text4">
            We realised, We wanted to do something
          </span>
          <strong data-node-name="text4Adjective" className="ml-3">
            special
          </strong>
          .
        </p>
        <p className="idea-4" data-node-name="text5Entry">
          Because,
        </p>
        <p className="idea-5">
          <span data-node-name="text5Content" className="pr-3">
            You are Special
          </span>
          <span className="smiley pl-3" data-node-name="smiley">
            :)
          </span>
        </p>
        <p className="idea-6">
          <span data-node-name="bigTextPart1">S</span>
          <span data-node-name="bigTextPart2">O</span>
        </p>
      </div>
      <div className="six">
        <img src={can} alt="" className="lydia-dp" data-node-name="imagePath" />
        <img src={hat} alt="" className="hat" />
        <div className="wish">
          <h3 className="wish-hbd" data-node-name="wishHeading" ref={hbdRef}>
            Happy Birthday CHITRA!
          </h3>
          <h5 data-node-name="wishText">May god bless you! ;)</h5>
        </div>
      </div>
      <div className="seven">
        <div className="baloons">
          {/* Balloon images */}
          {[...Array(32)].map((_, index) => (
            <img key={index} src={balloons[index % 3]} alt="" />
          ))}
        </div>
      </div>
      <div className="eight">
        {/* SVG Circles */}
        {[...Array(9)].map((_, index) => (
          <svg
            key={index}
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="20" cy="20" r="20" />
          </svg>
        ))}
      </div>
      <div className="nine">
        <p data-node-name="outroText">Make sure to tell us if you liked it.</p>
        <p id="replay" data-node-name="replayText" ref={replyBtnRef}>
          Click Here to go to special page
        </p>
        <p className="last-smile" data-node-name="outroSmiley">
          :)
        </p>
      </div>
    </div>
    </>
  );
};

export default Birthday;
