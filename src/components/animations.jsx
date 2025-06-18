import { motion } from "framer-motion";

export const AnimationWrapper = ({
  variant,
  children,
  delay = 0,
  duration = 0.5,
}) => {
  return (
    <motion.div
      initial={variant.initial}
      animate={variant.animate}
      exit={variant.exit}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

// Animation variants as JSX components
export const FadeInUp = ({ children, delay = 0, duration = 0.5 }) => (
  <AnimationWrapper
    variant={{
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 50 },
    }}
    delay={delay}
    duration={duration}
  >
    {children}
  </AnimationWrapper>
);

export const FadeInLeft = ({ children, delay = 0, duration = 0.5 }) => (
  <AnimationWrapper
    variant={{
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -50 },
    }}
    delay={delay}
    duration={duration}
  >
    {children}
  </AnimationWrapper>
);

export const FadeInRight = ({ children, delay = 0, duration = 0.5 }) => (
  <AnimationWrapper
    variant={{
      initial: { opacity: 0, x: 50 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 50 },
    }}
    delay={delay}
    duration={duration}
  >
    {children}
  </AnimationWrapper>
);

export const ScaleUp = ({ children, delay = 0, duration = 0.5 }) => (
  <AnimationWrapper
    variant={{
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.8 },
    }}
    delay={delay}
    duration={duration}
  >
    {children}
  </AnimationWrapper>
);
