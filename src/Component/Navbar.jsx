import { useState, useEffect, useRef } from "react";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import Icon from "./Icon";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  const menuRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
        setClicked(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Smooth scroll helper
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setClicked(false); // close dropdown
      setOpen(false);
    }
  };

  return (
    <nav className="w-full flex justify-center sticky top-0 py-3 z-50">
      <div
        className="
          flex items-center justify-between 
          w-[92%] sm:w-[85%] max-w-[900px]
          bg-white border border-blue-700 rounded-full 
          px-4 sm:px-6 py-2 sm:py-3 shadow-md
        "
      >
        {/* LEFT SECTION */}
        <div className="flex items-center gap-5 sm:gap-13">
          {/* Logo */}
          <span
            className="text-lg sm:text-xl font-bold text-blue-900 cursor-pointer"
            onClick={() => scrollToSection("hero")}
          >
            PR_AS
          </span>

          {/* Social Icons */}
          <div className="hidden sm:flex items-center md:flex lg:flex gap-4">
            <a href="https://www.facebook.com/prashant.xettri.142" target="_blank"><Icon icon={FaFacebookF} /></a>
            <a href="https://www.linkedin.com/in/prashantpaudel/" target="_blank"><Icon icon={FaLinkedinIn} /></a>
            <a href="https://www.whatsapp.com/" target="_blank"><Icon icon={FaWhatsapp} /></a>
            <a href="https://www.instagram.com/" target="_blank"><Icon icon={FaInstagram} /></a>
          </div>
        </div>

        {/* MENU */}
        <div
          className="relative"
          ref={menuRef}
          onMouseEnter={() => { if (!clicked) setOpen(true); }}
          onMouseLeave={() => { if (!clicked) setOpen(false); }}
        >
          <button
            onClick={() => {
              const nextClicked = !clicked;
              setClicked(nextClicked);
              setOpen(nextClicked);
            }}
            className="text-blue-700 hover:text-blue-500"
          >
            <HiMenu className="w-10 h-10 sm:w-8 sm:h-8" />
          </button>

          {/* Dropdown */}
          <div
            className={`
              absolute right-0 mt-3 
              bg-white border border-blue-700 
              rounded-xl shadow-xl py-3
              w-36 sm:w-40 
              transition-all duration-300
              ${open
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-2 pointer-events-none"
              }
              sm:right-0
              right-1/2 translate-x-1/2 sm:translate-x-0
            `}
          >
            <button
              className="block w-full text-left px-5 py-2 hover:bg-blue-50"
              onClick={() => scrollToSection("hero")}
            >
              Home
            </button>
            <button
              className="block w-full text-left px-5 py-2 hover:bg-blue-50"
              onClick={() => scrollToSection("about")}
            >
              About me
            </button>
            <button
              className="block w-full text-left px-5 py-2 hover:bg-blue-50"
              onClick={() => scrollToSection("contact")}
            >
              Contact me
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
