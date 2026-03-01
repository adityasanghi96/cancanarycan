import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { logo } from "../../assets/index";
import { navLinksdata } from "../../constants";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="w-full h-24 sticky top-0 z-50 bg-bodyColor mx-auto flex justify-between items-center font-titleFont border-b-[1px] border-b-gray-600">
      <div>
        <Link to="/" className="block">
          <img
            src={logo}
            alt="Can Canary Can home"
            className="cursor-pointer"
          />
        </Link>
      </div>
      <div>
        <ul className="hidden mdl:inline-flex items-center gap-6 lg:gap-10">
          {navLinksdata.map(({ title, link }) => (
            <li
              key={link}
              className="text-base font-normal text-gray-400 tracking-wide hover:text-designColor duration-300"
            >
              <Link to={link} className="block">
                {title}
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setShowMenu(!showMenu)}
          className="text-xl mdl:hidden bg-black w-10 h-10 inline-flex items-center justify-center rounded-full text-designColor cursor-pointer border-0"
          aria-label="Open menu"
          aria-expanded={showMenu}
        >
          <FiMenu />
        </button>
        {showMenu && (
          <div className="w-[80%] h-screen overflow-scroll absolute top-0 left-0 bg-gray-900 p-4 scrollbar-hide">
            <div className="flex flex-col gap-8 py-2 relative">
              <div>
                <img className="w-32" src={logo} alt="Can Canary Can" />
              </div>
              <ul className="flex flex-col gap-4">
                {navLinksdata.map((item) => (
                  <li
                    key={item.link}
                    className="text-base font-normal text-gray-400 tracking-wide hover:text-designColor duration-300"
                  >
                    <Link
                      to={item.link}
                      onClick={() => setShowMenu(false)}
                      className="block"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setShowMenu(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-designColor duration-300 text-2xl cursor-pointer bg-transparent border-0"
                aria-label="Close menu"
              >
                <MdClose />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
