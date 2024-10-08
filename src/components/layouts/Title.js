import React from "react";

const Title = ({ title, des, title2 }) => {
  return (
    <div className="flex flex-col gap-4 font-titleFont mb-14">
      <h3 className="text-sm uppercase font-light text-designColor tracking-wide">
        {title}
      </h3>
      <h1 className="text-4xl md:text-5xl text-gray-300 font-bold capitalize">
        {des}
      </h1>
      {title2 && (
        <h3 className="text-sm font-light text-gray-300 tracking-wide">
          {title2}
        </h3>
      )}
    </div>
  );
};

export default Title;
