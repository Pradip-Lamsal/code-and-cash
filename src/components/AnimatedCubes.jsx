import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

const generateRandom = (min, max) => Math.random() * (max - min) + min;

const Cube = ({ delay }) => {
  const controls = useAnimation();
  const cubeRef = useRef(null);
  const size = generateRandom(50, 90); // px

  useEffect(() => {
    const animateCube = async () => {
      while (true) {
        const x = generateRandom(-200, 200);
        const y = generateRandom(-800, -100);
        const rotate = generateRandom(0, 360);
        const duration = generateRandom(6, 12);

        await controls.start({
          x,
          y,
          rotate,
          opacity: [0.2, 0.6, 0.2],
          transition: {
            duration,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
            delay,
          },
        });
      }
    };

    animateCube();
  }, [controls, delay]);

  return (
    <motion.div
      ref={cubeRef}
      style={{
        width: size,
        height: size,
        left: generateRandom(0, window.innerWidth), // full-screen width
        top: generateRandom(0, window.innerHeight),
      }}
      className="absolute bg-purple-300 opacity-30 rounded-md"
      animate={controls}
    />
  );
};

const AnimatedCubes = ({ count = 25 }) => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <Cube key={i} delay={i * 0.3} />
      ))}
    </div>
  );
};

export default AnimatedCubes;
