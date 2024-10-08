import React from "react";
import {
  FaDiscord,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { Cursor, useTypewriter } from "react-simple-typewriter";

const LeftBanner = () => {
  const [text] = useTypewriter({
    words: ["Gamer", "Entertainer", "Streamer"],
    loop: true,
    typeSpeed: 20,
    deleteSpeed: 10,
    delaySpeed: 2000,
  });
  return (
    <div className="w-full lgl:w-1/2 flex flex-col gap-20">
      <div className="flex flex-col gap-5">
        <h4 className=" text-lg font-normal">WELCOME TO MY WORLD</h4>
        <h1 className="text-6xl font-bold text-white">
          Hi, I'm <span className="text-designColor capitalize">Chitra</span>
        </h1>
        <h2 className="text-4xl font-bold text-white">
          {text.startsWith("E") ? "an" : "a"} <span>{text}</span>
          <Cursor
            cursorBlinking="false"
            cursorStyle="|"
            cursorColor="#ff014f"
          />
        </h2>
        <p className="text-base font-bodyFont leading-6 tracking-wide">
          I'm an enthusiastic gamer from India. I love playing FPS multiplayer
          and story-driven games. Join my youtube channel which is the perfect
          place to watch entertaining live streams and gaming videos.
        </p>
      </div>
      <div className="flex flex-col xl:flex-row gap-6 lgl:gap-0 justify-between">
        <div>
          <h2 className="text-base uppercase font-titleFont mb-4">
            Find me in
          </h2>
          <div className="flex gap-4">
            <span
              className="bannerIcon"
              onClick={() => {
                window.open("https://www.youtube.com/@blackcanaryYT", "_blank");
              }}
            >
              <FaYoutube />
            </span>
            <span
              className="bannerIcon"
              onClick={() => {
                window.open("https://www.discord.gg/6pk7FHMe9k", "_blank");
              }}
            >
              <FaDiscord />
            </span>
            <span
              className="bannerIcon"
              onClick={() => {
                window.open("https://www.instagram.com/lilcanary", "_blank");
              }}
            >
              <FaInstagram />
            </span>
            <span
              className="bannerIcon"
              onClick={() => {
                window.open("https://www.facebook.com/notthatcanary", "_blank");
              }}
            >
              <FaFacebookF />
            </span>
            <span
              className="bannerIcon"
              onClick={() => {
                window.open("https://www.x.com/blackcanaryYT", "_blank");
              }}
            >
              <FaTwitter />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBanner;
