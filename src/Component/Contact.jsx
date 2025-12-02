import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense } from "react";

import Model from "./Model";

export default function Contact() {
  return (
    <section className="w-full min-h-screen flex flex-col md:flex-row overflow-hidden">

      {/* LEFT SIDE */}
      <div className="flex-1 bg-white px-6 sm:px-10 pt-10 sm:pt-24">
        
        {/* Heading */}
        <div className="flex items-center gap-3 mb-10">
          <span className="h-1 w-20 bg-blue-600 rounded-full"></span>
          <h2 className="text-xl font-semibold text-blue-700 animate-pulse">
            Contact me
          </h2>
        </div>

        {/* FORM */}
        <form className="max-w-xl space-y-8">
          
          {/* Full Name */}
          <div>
            <label className="block mb-2 font-semibold text-blue-900">Full Name:</label>
            <input
              className="w-full border border-blue-600 rounded-full h-12 px-6 outline-none"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-semibold text-blue-900">Email:</label>
            <input
              type="email"
              className="w-full border border-blue-600 rounded-full h-12 px-6 outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block mb-2 font-semibold text-blue-900">Message:</label>
            <textarea
              className="w-full border border-blue-600 rounded-3xl h-48 px-6 py-4 resize-none outline-none"
              placeholder="Write your message..."
            ></textarea>
          </div>

          {/* Button */}
          <button
            className="bg-blue-600 text-white px-10 py-3 rounded-xl font-semibold hover:bg-blue-700 transition -mt-4"
          >
            Submit
          </button>

        </form>
      </div>

      {/* RIGHT SIDE — 3D */}
      <div className="flex-1 bg-[#031b85] relative overflow-hidden">
        <Canvas camera={{ position: [0, 0, 6] }} className="w-full h-full">
          <ambientLight intensity={0.9} />
          <directionalLight intensity={1.4} position={[4, 4, 4]} />

          <Suspense fallback={null}>
            <Model url="/earth_hologram.glb" />
          </Suspense>

          <Environment preset="city" />
        </Canvas>
      </div>

    </section>
  );
}
