import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import RobotModel from "./RobotModel";

export default function About() {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col md:flex-row overflow-hidden">

      {/* LEFT SIDE */}
      <div className="flex-1 bg-white px-6 sm:px-10 pt-10 sm:pt-20 z-10">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <span className="h-1 w-12 sm:w-20 bg-blue-700 rounded-full"></span>
          <h2 className="text-blue-700 font-semibold text-lg sm:text-xl animate-pulse">
            About me
          </h2>
        </div>

        <p className="text-blue-900 text-lg sm:text-2xl md:text-3xl font-semibold leading-relaxed">
          I’m a seasoned web developer and designer with a flair for creativity and a
          keen eye for detail. I specialize in crafting elegant and functional websites
          that engage users and deliver results. Whether it’s responsive layouts,
          intuitive navigation, or eye-catching visuals!!!
        </p>

        <button className="mt-6 sm:mt-10 bg-[#0040FF] transition-all px-6 sm:px-8 py-2 sm:py-3 text-white font-medium rounded-xl flex items-center gap-2 shadow-lg active:scale-95">
          <a href="/img/cv.pdf">Learn more 🚀</a>
        </button>
      </div>

     <div className="flex-1 bg-[#031b85] relative overflow-hidden mt-10 md:mt-0 flex items-center justify-center">
  <Canvas
    camera={{ position: [0, 0.8, 3], fov: 45 }}
    className="w-full h-full"
  >
    <ambientLight intensity={0.8} />
    <directionalLight position={[4, 4, 2]} intensity={1.2} />

    <RobotModel />

    <Environment preset="sunset" />
  </Canvas>
</div>

    </section>
  );
}
