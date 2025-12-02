import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Hero from './Component/Hero.jsx';
import About from './Component/About.jsx';
import Contact from './Component/Contact.jsx';
import Navbar from './Component/Navbar.jsx';
import RocketScroll from './Component/RocketScroll.jsx';
import IntroWall from "./Component/IntroWall.jsx"; // add this
import './App.css';
import BubbleTrail from "./Component/BubbleTrail.jsx";

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <BrowserRouter>
      {/* Show intro only once before anything */}
      {!introDone && <IntroWall onFinish={() => setIntroDone(true)} />}

      {/* Show site only after intro completed */}
      {introDone && (
        <>
          <Navbar />
          <Routes>
            <Route 
              path="/" 
              element={
                <BubbleTrail>
                  <Hero />
                  <About />
                  <Contact />
                  <RocketScroll>
                    <img src="/img/small-rocket.png" className="w-80 rotate-180" />
                  </RocketScroll>
                </BubbleTrail>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/hero" element={<Hero />} />
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
}
