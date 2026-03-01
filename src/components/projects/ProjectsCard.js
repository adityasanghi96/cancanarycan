import React from "react";

const ProjectsCard = ({ title, url, src }) => {
  const className =
    "w-full p-4 xl:px-12 h-auto xl:py-10 rounded-lg shadow-shadowOne flex flex-col bg-gradient-to-r from-bodyColor to-[#202327] group hover:bg-gradient-to-b hover:from-gray-900 hover:gray-900 transition-colors duration-1000";

  const content = (
    <>
      <div className="w-full h-[80%] overflow-hidden rounded-lg">
        <img
          className="w-full h-60 object-cover group-hover:scale-110 duration-300 cursor-pointer"
          src={src}
          alt={title}
        />
      </div>
      <div className="w-full mt-5 flex flex-col gap-6">
        <div>
          <div className="flex items-center justify-center">
            <h3 className="text-base uppercase text-designColor font-normal text-center">
              {title}
            </h3>
          </div>
        </div>
      </div>
    </>
  );

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={`View playlist: ${title}`}
      >
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
};

export default ProjectsCard;
