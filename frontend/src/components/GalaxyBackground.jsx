import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const STAR_COUNT = 120;

function randomBetween(a, b) {
  return Math.random() * (b - a) + a;
}

const GalaxyBackground = () => {
  const starRefs = useRef([]);

  useEffect(() => {
    starRefs.current.forEach((el, i) => {
      if (!el) return;
      const duration = randomBetween(8, 18);
      const x = randomBetween(-40, 40);
      const y = randomBetween(-30, 30);
      const scale = randomBetween(0.7, 1.3);
      const opacity = randomBetween(0.5, 1);
      gsap.to(el, {
        x,
        y,
        scale,
        opacity,
        duration,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: randomBetween(0, 6),
      });
    });
  }, []);

  return (
    <div className="absolute inset-0 -z-10 bg-black overflow-hidden pointer-events-none" aria-hidden="true">
      {Array.from({ length: STAR_COUNT }).map((_, i) => {
        const size = randomBetween(1.5, 4.5); // px
        const top = randomBetween(0, 99); // vh
        const left = randomBetween(0, 99); // vw
        const opacity = randomBetween(0.5, 1);
        const blur = randomBetween(0.5, 2.5);
        const glow = `0 0 ${randomBetween(4, 16)}px ${randomBetween(2, 8)}px #fff`;
        return (
          <div
            key={i}
            ref={el => (starRefs.current[i] = el)}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              top: `${top}vh`,
              left: `${left}vw`,
              background: 'white',
              opacity,
              filter: `blur(${blur}px)`,
              boxShadow: glow,
            }}
          />
        );
      })}
    </div>
  );
};

export default GalaxyBackground; 