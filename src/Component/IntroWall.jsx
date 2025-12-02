import { useState, useEffect } from "react";
import "../index.css";

export default function IntroWall({ onFinish }) {
  const [hits, setHits] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleWallClick = () => {
    if (hits < 2) {
      setHits(hits + 1);
    } else {
      setHits(3);
      setTimeout(onFinish, 700);
    }
  };

  // Different wall images
  const wallImages = [
    "/wall1.png",      // initial wall
    "/wall2.png",      // after 1 click
    "/cracks.png",     // after 2 clicks
    "/cracks.png"      // final broken wall
  ];

  return (
    <div className="fixed inset-0 bg-black flex justify-center items-center z-50">
      {/* Wall */}
      <div
        onClick={handleWallClick}
        className={`
          wall relative w-full h-full select-none
          ${hits > 0 && hits < 3 ? "wall-glow animate-hit cracks wall-hit" : ""}
          ${hits === 3 ? "animate-break" : ""}
        `}
        style={{
          backgroundImage: `url(${wallImages[hits]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          cursor: "none", // hide default cursor
        }}
      ></div>

      {/* Hammer Emoji Cursor */}
      <div
        style={{
          position: "fixed",
          top: mousePos.y,
          left: mousePos.x,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none", // so it doesn't block clicks
          fontSize: "48px",
          zIndex: 10000,
        }}
      >
        🔨
      </div>
    </div>
  );
}
