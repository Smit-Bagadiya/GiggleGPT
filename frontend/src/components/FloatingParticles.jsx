import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const COLORS = [
  'bg-pink-300',
  'bg-purple-300',
  'bg-yellow-200',
  'bg-sky-300',
  'bg-blue-200',
  'bg-fuchsia-200',
  'bg-rose-200',
  'bg-indigo-200',
  'bg-green-200',
  'bg-orange-200',
];

const PARTICLE_COUNT = 15;

function randomBetween(a, b) {
  return Math.random() * (b - a) + a;
}

const FloatingParticles = () => {
  const containerRef = useRef(null);
  const particleRefs = useRef([]);

  useEffect(() => {
    particleRefs.current.forEach((el, i) => {
      if (!el) return;
      const duration = randomBetween(6, 14);
      const x = randomBetween(-60, 60);
      const y = randomBetween(-40, 40);
      const scale = randomBetween(0.7, 1.4);
      const opacity = randomBetween(0.4, 0.8);
      gsap.to(el, {
        x,
        y,
        scale,
        opacity,
        duration,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: randomBetween(0, 4),
      });
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
        const size = randomBetween(48, 120); // px
        const top = randomBetween(0, 90); // vh
        const left = randomBetween(0, 90); // vw
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        return (
          <div
            key={i}
            ref={el => (particleRefs.current[i] = el)}
            className={`rounded-full ${color} absolute mix-blend-lighten shadow-xl`}
            style={{
              width: size,
              height: size,
              top: `${top}vh`,
              left: `${left}vw`,
              opacity: 0.6,
              filter: 'blur(2px)',
            }}
          />
        );
      })}
    </div>
  );
};

export default FloatingParticles; 