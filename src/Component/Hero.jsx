import { useState, useEffect } from "react";
import BubbleTrail from "./BubbleTrail";

export default function Hero() {
  
  const [emoji, setEmoji] = useState("🙂"); // initial neutral emoji
  const [paused, setPaused] = useState(false); // controls pause on click
  const expressions = ["🙂", "😄", "😢", "😎", "😭"]; // emoji expressions

  // Automatic cycling
  useEffect(() => {
    if (paused) return; // do nothing if paused

    const interval = setInterval(() => {
      setEmoji((prevEmoji) => {
        const currentIndex = expressions.indexOf(prevEmoji);
        const nextIndex = (currentIndex + 1) % expressions.length;
        return expressions[nextIndex];
      });
    }, 1000); // change every 1 seconds

    return () => clearInterval(interval);
  }, [paused]);

  // Handle click to pause/resume
  const handleClick = () => setPaused(!paused);

  return (
    
    <BubbleTrail>
      <section className="hero">
      <div className="relative w-full min-h-[90vh] flex flex-col md:flex-row">

        {/* LEFT SIDE */}
        <div className="flex-1 bg-white px-6 sm:px-10 pt-10 sm:pt-20 z-10 relative">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="w-12 sm:w-20 h-1 bg-blue-700"></div>
            <p className="text-blue-700 font-semibold text-sm sm:text-base animate-pulse">
              Prashant Paudel
            </p>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-blue-900 leading-snug sm:leading-tight mt-4 sm:mt-6">
            Hello, my name’s <br />
            Prashant. <br />
            I’m a Front end <br />
            developer....
          </h1>

          {/* --- Emoji Expression --- */}
          <div className="mt-20">
            <span
              className="text-6xl sm:text-7xl cursor-pointer animate-bounce"
              onClick={handleClick}
              title={paused ? "" : "Click to pause"}
            >
              {emoji}
            </span>
          
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 bg-[#031b85] relative overflow-hidden z-0 mt-10 md:mt-0">
          <div className="absolute w-60 h-60 sm:w-[450px] sm:h-[450px] bg-blue-500 rounded-full blur-[100px] sm:blur-[130px] opacity-60 top-10 right-10 sm:right-20"></div>
          <div className="absolute bottom-0 right-0 w-full h-36 sm:h-[180px] bg-yellow-400 -skew-y-6 origin-bottom-right"></div>
        </div>

        {/* VR Guy — CENTERED */}
        <img
          src="/img/planet.png"
          className="
            absolute
            top-1/2
            left-1/2
            -translate-x-1/2
            -translate-y-1/2
            z-20
            w-40 sm:w-200
            animate-bobble
          "
        />
      </div></section>
    </BubbleTrail>
  );
}
