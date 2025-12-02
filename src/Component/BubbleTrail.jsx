import { useState } from "react";

export default function BubbleTrail({ children }) {
  const [bubbles, setBubbles] = useState([]);

  const createBubble = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const id = Date.now() + Math.random();

    setBubbles((prev) => [...prev, { id, x, y }]);

    setTimeout(() => {
      setBubbles((prev) => prev.filter((b) => b.id !== id));
    }, 700);



    
  };

  return (
    <div
      onMouseMove={createBubble}
      className="relative overflow-hidden"
    >
      {/* Render whatever inside this component */}
      {children}

      {/* Bubble particles */}
      {bubbles.map((b) => (
        <span
          key={b.id}
          className="pointer-events-none absolute w-4 h-4 bg-blue-300 rounded-full opacity-70 animate-bubble"
          style={{
            left: b.x,
            top: b.y,
          }}
        />
      ))}
    </div>
  );
}
