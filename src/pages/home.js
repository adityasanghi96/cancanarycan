import React from "react";
import Banner from "../components/banner/Banner";
import Contact from "../components/contact/Contact";
import FooterBottom from "../components/footer/FooterBottom";
import Navbar from "../components/navbar/Navbar";
import Projects from "../components/projects/Projects";

function Home() {
  return (
    <>
      <Navbar />
      <div className="max-w-screen-xl mx-auto">
        <Banner />
        <Projects />
        {/* <Resume /> */}
        {/* <Testimonial /> */}
        <Contact />
        {/* <Footer /> */}
        <FooterBottom />
      </div>
    </>
  );
}

export default Home;
