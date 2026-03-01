import React from "react";
import Banner from "../components/banner/Banner";
import Contact from "../components/contact/Contact";
import FooterBottom from "../components/footer/FooterBottom";
import Navbar from "../components/navbar/Navbar";
import Projects, { playlists } from "../components/projects/Projects";
import SEO from "../components/seo/SEO";

const baseUrl = process.env.REACT_APP_SITE_URL || "";
const personId = baseUrl ? `${baseUrl.replace(/\/$/, "")}#person` : null;

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    ...(personId && { "@id": personId }),
    name: "Chitra",
    alternateName: "CanCanaryCan",
    description:
      "Variety streamer and enthusiastic gamer from India. Love playing FPS multiplayer and story-driven games.",
    email: "heyitsblackcanary@gmail.com",
    jobTitle: "Streamer",
    ...(baseUrl && {
      url: baseUrl,
      mainEntityOfPage: baseUrl,
      image: {
        "@type": "ImageObject",
        url: `${baseUrl}/profilePhoto.png`,
      },
    }),
    sameAs: [
      "https://www.youtube.com/@cancanarycan",
      "https://www.discord.gg/6pk7FHMe9k",
      "https://www.instagram.com/cancanarycan",
      "https://www.facebook.com/notthatcanary",
      "https://www.x.com/cancanarycan",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Can Canary Can",
    description:
      "Variety streamer and enthusiastic gamer from India. Watch entertaining live streams and gaming videos.",
    ...(baseUrl && {
      url: baseUrl,
      publisher: personId ? { "@id": personId } : undefined,
      logo: `${baseUrl}/logo.png`,
      potentialAction: [
        {
          "@type": "ViewAction",
          target: "https://www.youtube.com/@cancanarycan",
          name: "Watch on YouTube",
        },
        {
          "@type": "FollowAction",
          target: "https://www.youtube.com/@cancanarycan",
          name: "Subscribe on YouTube",
        },
      ],
    }),
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "YouTube playlists – Can Canary Can",
    description: "Gaming playlists and walkthroughs by Can Canary Can.",
    numberOfItems: playlists.length,
    ...(personId && { author: { "@id": personId } }),
    itemListElement: playlists.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "VideoObject",
        name: item.title,
        url: item.url,
        ...(item.src && { thumbnailUrl: item.src }),
        ...(personId && { author: { "@id": personId } }),
      },
    })),
  },
  ...(baseUrl
    ? [
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: baseUrl,
            },
          ],
        },
      ]
    : []),
];

function Home() {
  return (
    <>
      <SEO jsonLd={jsonLd} />
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
