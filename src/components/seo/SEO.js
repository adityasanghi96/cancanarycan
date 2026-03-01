import React from "react";
import { Helmet } from "react-helmet-async";

const defaultImage = `${process.env.PUBLIC_URL || ""}/profilePhoto.png`;

/**
 * SEO component: meta tags + JSON-LD.
 * Pass jsonLd as object or array of objects for multiple schemas.
 */
function SEO({
  title = "Can Canary Can",
  description = "Variety streamer and enthusiastic gamer from India. Love playing FPS multiplayer and story-driven games. Watch entertaining live streams and gaming videos.",
  canonical,
  image = defaultImage,
  imageAlt = "Can Canary Can",
  jsonLd,
}) {
  const baseUrl =
    process.env.REACT_APP_SITE_URL ||
    (typeof window !== "undefined" ? window.location.origin : "");
  const canonicalUrl = canonical || baseUrl;
  const imageUrl = image.startsWith("http") ? image : `${baseUrl}${image}`;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:alt" content={imageAlt} />
        <meta property="og:site_name" content={title} />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:image:alt" content={imageAlt} />
      </Helmet>
      {jsonLd && (
        <Helmet>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                Array.isArray(jsonLd) ? jsonLd : [jsonLd]
              ),
            }}
          />
        </Helmet>
      )}
    </>
  );
}

export default SEO;
