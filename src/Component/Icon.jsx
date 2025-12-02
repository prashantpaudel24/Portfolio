// Icon.jsx
import React from "react";

export default function Icon({ icon: IconComponent, size = 3, bgColor = "bg-blue-700", color = "text-white" }) {
  return (
    <div
      className={`
        ${bgColor} ${color} 
        w-10 h-10 flex items-center justify-center 
        rounded-full cursor-pointer 
        hover:bg-blue-200 hover:text-blue-900
      `}
    >
      <IconComponent className={`w-${size} h-${size}`} />
    </div>
  );
}

