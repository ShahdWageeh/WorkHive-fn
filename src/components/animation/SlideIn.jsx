import { motion } from "framer-motion";

export default function SlideIn({ children, direction = "right", delay = 0 }) {
  const variants = {
    hidden: {
      x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0,
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        delay,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={variants}
        className="overflow-hidden"
      >
        {children}
      </motion.div>
    </>
  );
}
