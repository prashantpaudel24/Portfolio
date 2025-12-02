import { useEffect, useState } from "react";

export default function RocketScroll() {
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);

  const [rocketHit, setRocketHit] = useState(false);
  const [blastDone, setBlastDone] = useState(false);
  const [beam, setBeam] = useState(null);
  const [thankPos, setThankPos] = useState(null);
  const [hasFired, setHasFired] = useState(false);

  // random drifting seeds
  const [driftSeedX] = useState(Math.random() * 1000);
  const [driftSeedY] = useState(Math.random() * 1000);

  // ========== SCROLL + DRIFT + FINAL ALIGNMENT ==========
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const pageHeight = document.body.scrollHeight - window.innerHeight;

      const t = scrollY / pageHeight; // 0 → 1

      // Downward scroll movement
      const baseY = scrollY * 0.3;

      // Smooth drifting (until final snap)
      const driftX = Math.sin(scrollY * 0.01 + driftSeedX) * 80;
      const driftY = Math.sin(scrollY * 0.014 + driftSeedY) * 40;

      // rocket final target (Goku blast lane)
      const targetX = -40; // aligns with Kamehameha
      const targetY = window.innerHeight - 180 - 50; // blast height

      let finalX = driftX;
      let finalY = baseY + driftY;

      // ⭐ FINAL 10% OF THE PAGE → STOP drifting and ALIGN ROCKET
      if (t > 0.90) {
        const alignFactor = (t - 0.90) * 10; // 0 → 1
        finalX = driftX * (1 - alignFactor) + targetX * alignFactor;
        finalY = finalY * (1 - alignFactor) + targetY * alignFactor;
      }

      setPosX(finalX);
      setPosY(finalY);

      // ⭐ START BLAST SEQUENCE (only once)
      if (!hasFired && t >= 0.97) {
        setHasFired(true);
        shootFire(finalY);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasFired, driftSeedX, driftSeedY]);

  // ========== KAMEHAMEHA FIRE ==========
  const shootFire = (rocketY) => {
    if (rocketHit) return;

    const startX = window.innerWidth < 640 ? 80 : 220;
    const rocketX = window.innerWidth - 230;

    setBeam({ x: startX, width: 0 });

    let width = 0;

    const animateBeam = () => {
      width += 45;

      if (width < rocketX - startX) {
        setBeam({ x: startX, width });
        requestAnimationFrame(animateBeam);
      } else {
        setBeam({ x: startX, width: rocketX - startX });

        setRocketHit(true);
        setThankPos({ x: rocketX, y: rocketY + window.scrollY });

        // ⭐ Blast done & reset sequence
        setTimeout(() => {
          setBlastDone(true);
          setBeam(null);

          // reset rocket to start
          setTimeout(() => {
            setRocketHit(false);
            setBlastDone(false);
            setHasFired(false);
            setPosX(0);
            setPosY(0);
            setThankPos(null);
          }, 1000); // 1 second after blast
        }, 800);
      }
    };

    requestAnimationFrame(animateBeam);
  };

  // =================== UI ===================
  return (
    <section className="relative w-full min-h-screen bg-[#030a28] overflow-hidden select-none">
      <div className="flex px-6 pt-10 items-center gap-3 mb-6">
        <span className="h-1 w-20 bg-white rounded-full"></span>
        <h2 className="text-white text-lg">Thanks for visiting</h2>
      </div>

      <h1 className="text-3xl px-6 pt-6 text-white">Watch KAKAROT !!</h1>

      {/* GOKU */}
      <img
        src="/img/goku.png"
        className="goku-glow absolute bottom-0 left-5 w-100 z-[999]"
        alt="goku"
      />

      {/* BEAM */}
      {beam && (
        <div
          className="absolute h-[35px] bg-cyan-400 rounded-r-full shadow-[0_0_25px_#3af]"
          style={{
            left: `${beam.x}px`,
            bottom: "120px",
            width: `${beam.width}px`,
          }}
        />
      )}

      {/* ROCKET */}
      {!blastDone && (
        <div
          className="fixed top-10 right-[50px] w-[160px] z-[999]"
          style={{
            transform: `translate(${posX}px, ${posY}px)`,
            transition: "transform 0.055s linear",
          }}
        >
          {!rocketHit ? (
            <img src="/img/small-rocket.png" className="rotate-180" alt="rocket" />
          ) : (
            <img src="/img/thankyou.png" className="animate-big-pop" alt="blast" />
          )}
        </div>
      )}

      {/* THANK YOU POP */}
      {blastDone && thankPos && (
        <img
          src="/img/thankyou.png"
          className="absolute w-[350px] animate-big-pop"
          style={{
            left: `${thankPos.x - 300}px`,
            top: `${thankPos.y}px`,
          }}
          alt="thankyou"
        />
      )}
    </section>
  );
}
